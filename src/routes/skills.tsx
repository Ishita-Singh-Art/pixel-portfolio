import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { skillGroups } from "@/data/portfolio";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Ishita Singh" },
      { name: "description", content: "Tools and specializations of Ishita Singh, 3D/2D game artist." },
    ],
  }),
  component: Skills,
});

function Skills() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <PageHeader
        eyebrow="Toolkit"
        title="Skills & Tools"
        description="A snapshot of the software, pipelines, and disciplines I work with daily."
      />
      <div className="grid sm:grid-cols-2 gap-5">
        {skillGroups.map((g) => (
          <div key={g.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-sm uppercase tracking-widest text-primary mb-4">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-background/60 px-3 py-1.5 text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
