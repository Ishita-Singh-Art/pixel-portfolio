import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { projects, type Project } from "@/data/portfolio";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Ishita Singh" },
      {
        name: "description",
        content:
          "Selected 3D and 2D game art projects with process notes, challenges, and solutions.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | "3D" | "2D">("All");
  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <PageHeader
        eyebrow="Selected Work"
        title="Projects"
        description="A look into the process — challenges, solutions, and the final result. Use the carousel on each project to browse images and videos."
      />

      <div className="mb-8 flex gap-2">
        {(["All", "3D", "2D"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-4 py-2 text-sm border transition ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary shadow-glow"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);
  const total = project.media.length;
  const current = project.media[idx];

  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
      <div className="grid lg:grid-cols-[1.2fr_1fr]">
        {/* Carousel */}
        <div className="relative bg-background">
          <div className="aspect-video w-full bg-muted relative overflow-hidden">
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={current.alt ?? project.title}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            ) : (
              <iframe
                src={current.src}
                title={current.title ?? project.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>

          {total > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={() => setIdx((i) => (i - 1 + total) % total)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background border border-border"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => setIdx((i) => (i + 1) % total)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background border border-border"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.media.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to ${i + 1}`}
                    onClick={() => setIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx ? "w-6 bg-primary" : "w-1.5 bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-secondary/20 text-secondary px-2.5 py-0.5 text-xs font-medium">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground">{project.tools.join(" · ")}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Challenge</p>
              <p className="mt-1 text-sm text-foreground/90">{project.challenges}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Solution</p>
              <p className="mt-1 text-sm text-foreground/90">{project.solution}</p>
            </div>
          </div>

          {project.driveFolder && (
            <a
              href={project.driveFolder}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 self-start rounded-md border border-border bg-background px-4 py-2 text-sm hover:border-primary/60 transition"
            >
              View on Drive <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
