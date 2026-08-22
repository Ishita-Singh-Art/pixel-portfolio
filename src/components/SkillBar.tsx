import { useEffect, useRef, useState } from "react";
import { SkillIcon } from "@/components/SkillIcon";
import { DEFAULT_SKILL_LEVEL, skillMeta } from "@/data/portfolio";

type Props = {
  name: string;
};

/**
 * A single skill row: icon + name + tag + an animated proficiency bar.
 * The bar fills from 0% → level% the first time it scrolls into view
 * (IntersectionObserver). Level comes from the optional `skillMeta` sidecar
 * map, falling back to DEFAULT_SKILL_LEVEL for unlisted skills.
 */
export function SkillBar({ name }: Props) {
  const meta = skillMeta[name];
  const level = meta?.level ?? DEFAULT_SKILL_LEVEL;
  const tag = meta?.tag;

  const ref = useRef<HTMLDivElement | null>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilled(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setFilled(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <SkillIcon name={name} className="h-4 w-4 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <span className="text-sm text-foreground truncate">{name}</span>
          {tag && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
              {tag}
            </span>
          )}
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full skill-bar-fill"
            style={{ width: filled ? `${level}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
