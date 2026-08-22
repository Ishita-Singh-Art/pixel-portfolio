import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { SkillBar } from "@/components/SkillBar";
import { SkillMarquee } from "@/components/SkillMarquee";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/data/portfolio";
import { Boxes, Palette, Sparkles, Wrench, type LucideIcon } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Ishita Singh" },
      {
        name: "description",
        content: "Tools and specializations of Ishita Singh, 3D/2D game artist.",
      },
    ],
  }),
  component: Skills,
});

// Per-group accent: a ghost watermark icon + a hover border color, mapped to
// the existing palette (pink = primary, blue = secondary, mint = accent).
const groupAccent: Record<string, { icon: LucideIcon; border: string }> = {
  "3D Tools": { icon: Boxes, border: "hover:border-primary/60" },
  "2D Tools": { icon: Palette, border: "hover:border-secondary/60" },
  Specializations: { icon: Sparkles, border: "hover:border-accent/60" },
  Other: { icon: Wrench, border: "hover:border-primary/60" },
};

function Skills() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <PageHeader
        eyebrow="Toolkit"
        title="Skills & Tools"
        description="A snapshot of the software, pipelines, and disciplines I work with daily."
      />

      {/* Hero marquee band */}
      <SkillMarquee />

      {/* Specimen cards */}
      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        {skillGroups.map((g, gi) => {
          const accent = groupAccent[g.title] ?? groupAccent["Other"];
          const Ghost = accent.icon;
          return (
            <Reveal key={g.title} delay={gi * 80}>
              <div
                className={`skill-card-hover relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card ${accent.border}`}
              >
                {/* Ghost watermark icon */}
                <Ghost
                  className="ghost-icon absolute -right-4 -bottom-4 size-32 text-foreground"
                  aria-hidden
                />
                <h3 className="relative text-sm uppercase tracking-widest text-primary mb-5">
                  {g.title}
                </h3>
                <div className="relative space-y-4">
                  {g.items.map((item) => (
                    <SkillBar key={item} name={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
