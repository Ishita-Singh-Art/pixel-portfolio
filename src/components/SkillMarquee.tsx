import { SkillIcon } from "@/components/SkillIcon";
import { skillGroups } from "@/data/portfolio";

/**
 * Infinite-scrolling ribbon of skill chips. Two rows scroll in opposite
 * directions (CSS keyframes), pausing on hover. Each row duplicates its list
 * so the loop is seamless. Frozen under `prefers-reduced-motion` (CSS).
 */
export function SkillMarquee() {
  // Flatten all skills into one list, then split into two rows for variety.
  const all = skillGroups.flatMap((g) => g.items);
  const rowA = all;
  const rowB = [...all].reverse();

  return (
    <div className="marquee relative overflow-hidden py-4 -mx-5 sm:-mx-8 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="space-y-3">
        <MarqueeRow items={rowA} duration="36s" />
        <MarqueeRow items={rowB} duration="30s" reverse />
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: string[];
  duration: string;
  reverse?: boolean;
}) {
  // Duplicate the list so translateX(-50%) loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div
      className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
      aria-hidden
    >
      {doubled.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm text-foreground mx-1.5 whitespace-nowrap"
        >
          <SkillIcon name={item} className="h-4 w-4" />
          {item}
        </span>
      ))}
    </div>
  );
}
