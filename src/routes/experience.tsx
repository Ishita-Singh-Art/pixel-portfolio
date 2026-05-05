import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { experiences, education } from "@/data/portfolio";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Ishita Singh" },
      { name: "description", content: "Work experience and education of Ishita Singh, 3D/2D game artist." },
    ],
  }),
  component: Experience,
});

function Experience() {
  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8">
      <PageHeader
        eyebrow="Career"
        title="Work Experience"
        description="Freelance work, teaching, and collaborations in 3D and 2D art."
      />

      <ol className="relative border-l border-border ml-3 space-y-10">
        {experiences.map((e) => (
          <li key={e.role + e.company} className="pl-6">
            <span className="absolute -left-[7px] mt-2 size-3 rounded-full bg-primary shadow-glow" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold">{e.role}</h3>
              <span className="text-xs text-muted-foreground">{e.period}</span>
            </div>
            <p className="text-sm text-primary mt-1">{e.company} · {e.location}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc list-outside ml-4">
              {e.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
          </li>
        ))}
      </ol>

      <h2 className="mt-20 mb-6 text-2xl font-bold tracking-tight">Education</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {education.map((ed) => (
          <div key={ed.school} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs uppercase tracking-widest text-secondary">{ed.period}</p>
            <h3 className="mt-2 font-semibold">{ed.school}</h3>
            <p className="text-sm text-muted-foreground">{ed.degree}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
