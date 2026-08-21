import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { profile, skillGroups, projects } from "@/data/portfolio";
import { ArrowRight, Download, Mail } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <OptimizedImage
          src={heroImg}
          alt="3D artist studio"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          loading="eager"
          fetchPriority="high"
          skipLazyMount
        />
        <div className="absolute inset-0 bg-gradient-fade" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-32 sm:pt-36 sm:pb-44">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            {profile.location} · Freelance & Collaborations
          </p>
          <p className="text-sm sm:text-base font-medium text-muted-foreground mb-3">Hi, I'm</p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight max-w-3xl leading-[1.05]">
            <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-4 text-2xl sm:text-3xl font-display font-semibold text-foreground/90">
            {profile.title} <span className="text-primary">·</span> crafted with care.
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
            >
              View Projects <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground hover:bg-card transition"
            >
              <Mail className="size-4" /> Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Quick stats / disciplines */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 grid sm:grid-cols-3 gap-4">
        {skillGroups.slice(0, 3).map((g) => (
          <div key={g.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="text-xs uppercase tracking-widest text-primary">{g.title}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {g.items.join(" · ")}
            </p>
          </div>
        ))}
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Featured Work</h2>
          <Link
            to="/projects"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            See all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((p, idx) => {
            const thumb =
              p.media.find((m) => m.type === "image") ??
              p.media.find(
                (m) =>
                  m.type === "video" &&
                  !m.src.includes("embeddedfolderview") &&
                  !m.src.includes("accounts.google.com"),
              );
            return (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/60 transition shadow-card"
              >
                {thumb && (
                  <div
                    className={`relative overflow-hidden bg-muted ${
                      thumb.type === "image" ? "aspect-video" : "aspect-[4/3]"
                    }`}
                  >
                    {thumb.type === "image" ? (
                      <OptimizedImage
                        src={thumb.src}
                        alt={thumb.alt ?? p.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        skipLazyMount={idx === 0}
                        width={1280}
                        height={720}
                      />
                    ) : (
                      <iframe
                        src={thumb.src}
                        title={thumb.title ?? p.title}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        loading="lazy"
                      />
                    )}
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-secondary">{p.category}</p>
                  <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-8">
        <div className="rounded-2xl border border-border bg-gradient-hero p-8 sm:p-12 text-center shadow-glow">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Have a project in mind?
          </h2>
          <p className="mt-2 text-primary-foreground/80">
            I'm available for freelance 3D & 2D work — characters, props, environments, and
            animation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-medium text-foreground hover:opacity-90 transition"
            >
              <Mail className="size-4" /> {profile.email}
            </a>
            <a
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-md border border-background/30 px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-background/10 transition"
            >
              <Download className="size-4" /> Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
