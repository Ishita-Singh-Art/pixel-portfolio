import { useEffect, useRef } from "react";

export const OPTIONS = [
  { id: "paint", label: "Paint" },
  { id: "dust", label: "Dust" },
  { id: "constellation", label: "Constellation" },
] as const;

export type BgId = (typeof OPTIONS)[number]["id"];

function readThemeColors() {
  const css = getComputedStyle(document.documentElement);
  return {
    primary: css.getPropertyValue("--primary").trim(),
    secondary: css.getPropertyValue("--secondary").trim(),
    accent: css.getPropertyValue("--accent").trim(),
    background: css.getPropertyValue("--background").trim(),
  };
}

function setupCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize);
  return { ctx, resize };
}

/* ── Paint — the cursor's trail persists on the page, slowly drying ── */
function PaintCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, resize } = setup;
    const { primary, secondary, accent, background } = readThemeColors();
    const palette = [primary, secondary, accent];

    let lastX = 0;
    let lastY = 0;
    let hasLast = false;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (!hasLast) {
        lastX = x;
        lastY = y;
        hasLast = true;
        return;
      }
      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 4) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.beginPath();
        ctx.arc(x, y, 5 + Math.random() * 8, 0, Math.PI * 2);
        ctx.fill();
      }
      lastX = x;
      lastY = y;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Slowly "dry" old paint by fading toward the background color.
    let raf = 0;
    const fade = () => {
      ctx.globalAlpha = 0.02;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(fade);
    };
    raf = requestAnimationFrame(fade);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="art-layer" />;
}

/* ── Dust — drifting pastel motes with mouse parallax ── */
function DustCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, resize } = setup;
    const { primary, accent } = readThemeColors();

    const N = 80;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.5 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      depth: 0.3 + Math.random() * 0.7,
    }));

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const px = (mx - window.innerWidth / 2) * 0.02;
      const py = (my - window.innerHeight / 2) * 0.02;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        ctx.globalAlpha = 0.45 * p.depth;
        ctx.fillStyle = p.depth > 0.6 ? accent : primary;
        ctx.beginPath();
        ctx.arc(p.x + px * p.depth, p.y + py * p.depth, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="art-layer" />;
}

/* ── Constellation — real constellations drifting across the sky ── */

// Real constellations: normalized star positions (0..1) + the edges that
// connect them. Coordinates are approximate but faithful to the actual
// star patterns.
interface Star {
  x: number;
  y: number;
  m: number; // magnitude-ish brightness (bigger = brighter/larger)
}
interface Constellation {
  name: string;
  stars: Star[];
  edges: [number, number][];
}

const CONSTELLATIONS: Constellation[] = [
  {
    name: "Ursa Major",
    stars: [
      { x: 0.0, y: 0.0, m: 1.8 },
      { x: 0.15, y: 0.25, m: 2.4 },
      { x: 0.35, y: 0.35, m: 2.4 },
      { x: 0.45, y: 0.15, m: 3.3 },
      { x: 0.65, y: 0.05, m: 1.8 },
      { x: 0.8, y: 0.15, m: 2.2 },
      { x: 1.0, y: 0.3, m: 1.9 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [3, 0],
    ],
  },
  {
    name: "Orion",
    stars: [
      { x: 0.2, y: 0.0, m: 0.5 },
      { x: 0.8, y: 0.0, m: 1.6 },
      { x: 0.4, y: 0.5, m: 1.7 },
      { x: 0.5, y: 0.5, m: 1.7 },
      { x: 0.6, y: 0.5, m: 2.2 },
      { x: 0.25, y: 1.0, m: 2.1 },
      { x: 0.75, y: 1.0, m: 0.2 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 4],
      [2, 3],
      [3, 4],
      [2, 5],
      [4, 6],
      [5, 6],
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 0.0, y: 0.8, m: 2.3 },
      { x: 0.25, y: 0.0, m: 2.2 },
      { x: 0.5, y: 0.6, m: 2.3 },
      { x: 0.75, y: 0.0, m: 2.7 },
      { x: 1.0, y: 0.8, m: 2.3 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: "Cygnus",
    stars: [
      { x: 0.5, y: 0.0, m: 1.3 },
      { x: 0.5, y: 0.45, m: 2.2 },
      { x: 0.5, y: 1.0, m: 3.0 },
      { x: 0.15, y: 0.5, m: 2.5 },
      { x: 0.85, y: 0.5, m: 2.9 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [3, 1],
      [1, 4],
    ],
  },
  {
    name: "Leo",
    stars: [
      { x: 0.0, y: 0.6, m: 1.4 },
      { x: 0.2, y: 0.4, m: 3.5 },
      { x: 0.4, y: 0.2, m: 2.0 },
      { x: 0.6, y: 0.1, m: 2.6 },
      { x: 0.9, y: 0.3, m: 2.1 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: "Scorpius",
    stars: [
      { x: 0.0, y: 0.3, m: 2.3 },
      { x: 0.2, y: 0.1, m: 2.6 },
      { x: 0.4, y: 0.0, m: 2.9 },
      { x: 0.6, y: 0.15, m: 1.1 },
      { x: 0.8, y: 0.4, m: 2.3 },
      { x: 0.9, y: 0.7, m: 1.6 },
      { x: 0.8, y: 1.0, m: 2.4 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  {
    name: "Taurus",
    stars: [
      { x: 0.5, y: 0.5, m: 0.9 },
      { x: 0.3, y: 0.4, m: 3.5 },
      { x: 0.4, y: 0.3, m: 3.6 },
      { x: 0.6, y: 0.3, m: 3.5 },
      { x: 0.7, y: 0.4, m: 3.6 },
      { x: 0.9, y: 0.1, m: 1.7 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
  },
  {
    name: "Lyra",
    stars: [
      { x: 0.5, y: 0.0, m: 0.0 },
      { x: 0.3, y: 0.4, m: 3.5 },
      { x: 0.5, y: 0.5, m: 3.5 },
      { x: 0.7, y: 0.4, m: 3.5 },
      { x: 0.5, y: 0.3, m: 4.3 },
    ],
    edges: [
      [0, 1],
      [0, 3],
      [1, 4],
      [4, 3],
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: "Canis Major",
    stars: [
      { x: 0.3, y: 0.3, m: -1.5 },
      { x: 0.0, y: 0.0, m: 2.0 },
      { x: 0.5, y: 0.0, m: 1.8 },
      { x: 0.6, y: 0.5, m: 1.5 },
      { x: 0.8, y: 0.6, m: 2.4 },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [0, 3],
      [3, 4],
    ],
  },
  {
    name: "Gemini",
    stars: [
      { x: 0.2, y: 0.0, m: 1.6 },
      { x: 0.4, y: 0.3, m: 1.2 },
      { x: 0.6, y: 0.6, m: 1.9 },
      { x: 0.1, y: 0.5, m: 3.1 },
      { x: 0.3, y: 0.7, m: 3.3 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [0, 3],
      [3, 4],
      [1, 4],
    ],
  },
];

function ConstellationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, resize } = setup;
    const { accent } = readThemeColors();

    // Place constellations in the blank side gutters (desktop) or top/bottom
    // bands (mobile), so they never sit under the centered content.
    const isMobile = window.innerWidth < 768;
    const W = window.innerWidth;
    const H = window.innerHeight;

    const placed = CONSTELLATIONS.map((c, i) => {
      const scale = isMobile ? 60 + Math.random() * 60 : 90 + Math.random() * 120;
      const angle = Math.random() * Math.PI * 2;

      let cx: number;
      let cy: number;
      if (isMobile) {
        // Tall/narrow: spread across the top and bottom bands.
        const band = i % 2 === 0 ? 0.12 : 0.88; // top vs bottom
        cx = W * (0.15 + Math.random() * 0.7);
        cy = H * (band + (Math.random() - 0.5) * 0.16);
      } else {
        // Wide: alternate left / right gutters.
        const side = i % 2 === 0 ? 0.12 : 0.88; // left vs right
        cx = W * (side + (Math.random() - 0.5) * 0.16);
        cy = H * (0.12 + Math.random() * 0.76);
      }

      const vx = (Math.random() - 0.5) * 0.15;
      const vy = (Math.random() - 0.5) * 0.15;
      return { c, scale, angle, cx, cy, vx, vy };
    });

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of placed) {
        // Drift slowly, wrap around edges.
        p.cx += p.vx;
        p.cy += p.vy;
        if (p.cx < -200) p.cx = window.innerWidth + 200;
        if (p.cx > window.innerWidth + 200) p.cx = -200;
        if (p.cy < -200) p.cy = window.innerHeight + 200;
        if (p.cy > window.innerHeight + 200) p.cy = -200;

        const cos = Math.cos(p.angle);
        const sin = Math.sin(p.angle);

        // Project each star to screen space.
        const pts = p.c.stars.map((s) => {
          const lx = (s.x - 0.5) * p.scale;
          const ly = (s.y - 0.5) * p.scale;
          return {
            x: p.cx + lx * cos - ly * sin,
            y: p.cy + lx * sin + ly * cos,
            m: s.m,
          };
        });

        // Connecting lines.
        ctx.strokeStyle = accent;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.22;
        for (const [a, b] of p.c.edges) {
          ctx.beginPath();
          ctx.moveTo(pts[a].x, pts[a].y);
          ctx.lineTo(pts[b].x, pts[b].y);
          ctx.stroke();
        }

        // Stars — bigger, with a soft glow. Brighter stars are larger.
        for (const s of pts) {
          const r = 1.6 + (2.5 - s.m) * 0.9; // magnitude → radius
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 3);
          glow.addColorStop(0, accent);
          glow.addColorStop(1, "transparent");
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 0.9;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="art-layer" />;
}

export function ArtBackground({ bg }: { bg: BgId }) {
  switch (bg) {
    case "paint":
      return <PaintCanvas />;
    case "dust":
      return <DustCanvas />;
    case "constellation":
      return <ConstellationCanvas />;
    default:
      return null;
  }
}
