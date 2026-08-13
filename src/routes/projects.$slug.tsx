import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { projects, type Project } from "@/data/portfolio";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { MediaRenderer } from "@/components/MediaRenderer";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return { meta: [{ title: "Project Not Found" }] };
    return {
      meta: [
        { title: `${project.title} — Ishita Singh` },
        { name: "description", content: project.description.slice(0, 160) },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) throw notFound();

  const idx = projects.indexOf(project);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      {/* Back link */}
      <div className="pt-6 pb-2">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="size-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero media — full-width */}
      <HeroSection project={project} />

      {/* Title + metadata bar */}
      <div className="mt-8 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="rounded-full bg-secondary/20 text-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider">
            {project.category}
          </span>
          {project.tools.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>
      </div>

      {/* Two-column layout: gallery + sidebar */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 pb-8">
        {/* Main content */}
        <div>
          {/* Description */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold uppercase tracking-widest text-primary mb-4">
              About
            </h2>
            <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </section>

          {/* Full gallery — all media */}
          {project.media.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold uppercase tracking-widest text-primary mb-4">
                Gallery
              </h2>
              <div className="space-y-6">
                {project.media.map((m, i) => (
                  <MediaBlock key={i} media={m} title={project.title} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Process */}
          <section className="mb-10 space-y-6">
            <h2 className="text-lg font-semibold uppercase tracking-widest text-primary mb-4">
              Process
            </h2>
            <ProcessBlock label="Challenge" text={project.challenges} />
            <ProcessBlock label="Solution" text={project.solution} />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <SidebarCard title="Category">
              <span className="text-sm text-muted-foreground">{project.category}</span>
            </SidebarCard>

            <SidebarCard title="Tools">
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SidebarCard>

            {project.driveFolder && (
              <SidebarCard title="Resources">
                <a
                  href={project.driveFolder}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  View on Google Drive <ExternalLink className="size-3.5" />
                </a>
              </SidebarCard>
            )}

            {/* Prev / Next */}
            <div className="pt-4 border-t border-border space-y-3">
              {prev && (
                <Link
                  to="/projects/$slug"
                  params={{ slug: prev.slug }}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  <ChevronLeft className="size-4 shrink-0" />
                  <span className="truncate">{prev.title}</span>
                </Link>
              )}
              {next && (
                <Link
                  to="/projects/$slug"
                  params={{ slug: next.slug }}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  <span className="truncate">{next.title}</span>
                  <ChevronRight className="size-4 shrink-0" />
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom nav (mobile-friendly prev/next) */}
      <div className="lg:hidden pb-12 space-y-3">
        <div className="border-t border-border pt-6 flex justify-between gap-4">
          {prev ? (
            <Link
              to="/projects/$slug"
              params={{ slug: prev.slug }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              <ChevronLeft className="size-4" /> Prev
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
            >
              Next <ChevronRight className="size-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function HeroSection({ project }: { project: Project }) {
  const hero = project.media[0];
  if (!hero) return null;

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-muted shadow-card">
      <MediaRenderer
        media={hero}
        alt={project.title}
        className="w-full object-contain max-h-[70vh]"
        loading="eager"
      />
    </div>
  );
}

function MediaBlock({
  media,
  title,
  index,
}: {
  media: Project["media"][number];
  title: string;
  index: number;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-muted">
      <MediaRenderer
        media={media}
        alt={`${title} — image ${index + 1}`}
        className="w-full object-contain"
        loading={index === 0 ? "eager" : "lazy"}
      />
    </div>
  );
}

function ProcessBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">{label}</h3>
      <p className="text-sm text-foreground/85 leading-relaxed">{text}</p>
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{title}</h4>
      {children}
    </div>
  );
}
