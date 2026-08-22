import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Oklch {
  L: number;
  C: number;
  H: number;
}

/**
 * CustomCursor — a paintbrush cursor that leaves a pastel paint trail.
 *
 * The brush tip follows the pointer and tilts so the bristles point in the
 * direction of travel (handle trails behind). As it moves it "paints" soft
 * pastel blobs onto a full-screen canvas that fade out behind it. The trail
 * color follows a fixed pastel gradient (primary → secondary → accent) that
 * flows along the path of travel — not random per-blob. On hover the trail
 * shifts to the accent color and the brush "dips"; on click it leaves a
 * small paint splat.
 *
 * Colors are read live from the theme (--primary / --secondary / --accent)
 * so the trail re-themes automatically in light/dark mode. Only active on
 * fine-pointer devices and respects prefers-reduced-motion.
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brushRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    const brush = brushRef.current;
    if (!canvas || !brush) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    document.documentElement.classList.add("has-custom-cursor");

    // ── Theme colors (parsed from oklch so we can interpolate them) ──
    const parseOklch = (str: string): Oklch => {
      const m = str.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
      if (!m) return { L: 0.8, C: 0.1, H: 300 };
      return { L: parseFloat(m[1]), C: parseFloat(m[2]), H: parseFloat(m[3]) };
    };

    let stops: Oklch[] = [];
    let accentStr = "oklch(0.86 0.1 160)";

    const refreshColors = () => {
      const css = getComputedStyle(document.documentElement);
      const primary = css.getPropertyValue("--primary").trim();
      const secondary = css.getPropertyValue("--secondary").trim();
      const accent = css.getPropertyValue("--accent").trim();
      stops = [parseOklch(primary), parseOklch(secondary), parseOklch(accent)];
      accentStr = accent || accentStr;
    };
    refreshColors();

    // Re-read colors when the theme toggles (light/dark).
    const themeObserver = new MutationObserver(refreshColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Interpolate across the three stops: 0→primary, 0.5→secondary, 1→accent.
    const gradientColor = (t: number): string => {
      const seg = t * 2;
      const i = Math.min(Math.floor(seg), 1);
      const f = seg - i;
      const a = stops[i];
      const b = stops[i + 1];
      let dh = b.H - a.H;
      if (dh > 180) dh -= 360;
      if (dh < -180) dh += 360;
      const L = a.L + (b.L - a.L) * f;
      const C = a.C + (b.C - a.C) * f;
      const H = a.H + dh * f;
      return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
    };

    // Size the canvas to the viewport (capped DPR for perf).
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let brushX = mouseX;
    let brushY = mouseY;
    let prevX = brushX;
    let prevY = brushY;
    let angle = 0; // rest: natural icon orientation (bristles down-left)
    let hover = false;
    let pressed = false;
    let scale = 1;
    let visible = false;
    let phase = 0; // gradient position, advances with distance travelled
    let raf = 0;

    const particles: Particle[] = [];

    const spawn = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const color = hover ? accentStr : gradientColor(phase);
        particles.push({
          x: x + (Math.random() - 0.5) * 5,
          y: y + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.15,
          r: 1.5 + Math.random() * (hover ? 3.5 : 2.5),
          color,
          life: 0,
          maxLife: 450 + Math.random() * 400,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        brush.style.opacity = "1";
        canvas.style.opacity = "1";
        prevX = brushX = mouseX;
        prevY = brushY = mouseY;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      hover = !!target?.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-cursor]",
      );
      brush.dataset.state = hover ? "hover" : "default";
    };

    const onDown = () => {
      pressed = true;
      brush.dataset.state = "down";
      spawn(brushX, brushY, 14); // paint splat on click
    };
    const onUp = () => {
      pressed = false;
      brush.dataset.state = hover ? "hover" : "default";
    };

    const onLeave = () => {
      visible = false;
      brush.style.opacity = "0";
      canvas.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      brush.style.opacity = "1";
      canvas.style.opacity = "1";
    };

    const tick = () => {
      // Brush tip trails the pointer with a soft lerp.
      brushX += (mouseX - brushX) * 0.35;
      brushY += (mouseY - brushY) * 0.35;

      // Gentle, simple tilt: lean slightly in the direction of horizontal
      // travel, and ease back to upright when still. Symmetric for left/right.
      const vx = brushX - prevX;
      const vy = brushY - prevY;
      const speed = Math.hypot(vx, vy);
      const target = speed > 0.3 ? Math.max(-0.3, Math.min(0.3, vx * 0.03)) : 0;
      angle += (target - angle) * 0.08;

      // Paint a trail from the brush tip as it moves.
      if (speed > 0.5) {
        phase = (phase + speed / 300) % 1; // advance the gradient along the path
        const steps = Math.min(Math.floor(speed / 3), 5);
        for (let s = 0; s < steps; s++) {
          const t = s / Math.max(steps, 1);
          spawn(prevX + vx * t, prevY + vy * t, 1);
        }
      }
      prevX = brushX;
      prevY = brushY;

      // Smooth the dip/grow scale.
      const targetScale = pressed ? 0.85 : hover ? 1.15 : 1;
      scale += (targetScale - scale) * 0.2;

      // Pin the bristle tip to the cursor and rotate around it.
      brush.style.transform = `translate3d(${brushX - 6.6}px, ${brushY - 23.8}px, 0) rotate(${angle}rad) scale(${scale})`;

      // Draw + age particles.
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 16.7;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        const t = p.life / p.maxLife;
        ctx.globalAlpha = (1 - t) * 0.45;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 - t * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />
      <div ref={brushRef} className="cursor-brush" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
          <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
        </svg>
      </div>
    </>
  );
}
