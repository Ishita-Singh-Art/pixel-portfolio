import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { projects, type Project } from "@/data/portfolio";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { LazyIframe } from "@/components/LazyIframe";

export const Route = createFileRoute("/projects/")({
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
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
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
        description="A look into the process — challenges, solutions, and the final result."
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
        {list.map((p, listIdx) => (
          <ProjectCard key={p.slug} project={p} isFirst={listIdx === 0} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, isFirst }: { project: Project; isFirst: boolean }) {
  const [idx, setIdx] = useState(0);
  const total = project.media.length;
  const current = project.media[idx];

  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
      {/* Grid with items-stretch so both columns match height */}
      <div className="grid lg:grid-cols-[1.2fr_1fr] items-stretch">
        {/* Carousel — stretches to full height of the grid row */}
        <div className="relative overflow-hidden min-h-[240px] bg-muted">
          {current.type === "image" ? (
            <OptimizedImage
              src={current.src}
              alt={current.alt ?? project.title}
              // object-contain so the full image is visible — the row's height is
              // driven by the right info column, so object-cover would crop top/
              // bottom of paintings. The bg-muted above provides the letterbox bars.
              className="absolute inset-0 w-full h-full object-contain"
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "auto"}
              width={1920}
              height={1920}
            />
          ) : (
            <LazyIframe
              src={current.src}
              title={current.title ?? project.title}
              className="absolute inset-0 w-full h-full"
              eager={isFirst}
            />
          )}

          {total > 1 && (
            <>
              <button
                aria-label="Previous"
                onClick={() => setIdx((i) => (i - 1 + total) % total)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background border border-border z-10"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => setIdx((i) => (i + 1) % total)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 hover:bg-background border border-border z-10"
              >
                <ChevronRight className="size-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
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
          <h2 className="text-2xl font-bold tracking-tight">
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="hover:text-primary transition"
            >
              {project.title}
            </Link>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {project.description}
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Challenge</p>
              <p className="mt-1 text-sm text-foreground/90 line-clamp-3">{project.challenges}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Solution</p>
              <p className="mt-1 text-sm text-foreground/90 line-clamp-3">{project.solution}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              View Details <ArrowRight className="size-3.5" />
            </Link>
            {project.driveFolder && (
              <a
                href={project.driveFolder}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm hover:border-primary/60 transition"
              >
                Drive <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
