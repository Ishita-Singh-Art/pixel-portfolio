import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { profile } from "@/data/portfolio";
import { Download, Mail, Phone, Linkedin, FolderOpen, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume & Contact — Ishita Singh" },
      {
        name: "description",
        content: "Download Ishita Singh's resume and get in touch for freelance 3D/2D art work.",
      },
    ],
  }),
  component: Resume,
});

function Resume() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <PageHeader
        eyebrow="Resume & Contact"
        title="Let's work together"
        description="Download my resume or reach out directly — I'm open to freelance and full-time opportunities in 3D / 2D game art."
      />

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
        {/* Contact card */}
        <Reveal>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card h-fit">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-primary">{profile.title}</p>

            <ul className="mt-5 space-y-1 text-sm">
              <ContactRow icon={MapPin} label={profile.location} />
              <ContactRow icon={Mail} label={profile.email} href={`mailto:${profile.email}`} />
              <ContactRow
                icon={Phone}
                label={profile.phone}
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
              />
              <ContactRow icon={Linkedin} label="LinkedIn" href={profile.linkedin} external />
              <ContactRow
                icon={FolderOpen}
                label="Drive Portfolio"
                href={profile.drivePortfolio}
                external
              />
            </ul>

            <a
              href={profile.resumeFile}
              download
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition animate-pulse-glow"
            >
              <Download className="size-4" /> Download Resume (PDF)
            </a>
          </div>
        </Reveal>

        {/* PDF Preview */}
        <Reveal delay={100}>
          <div className="rounded-xl border border-border bg-card p-2 shadow-card overflow-hidden">
            <object
              data={profile.resumeFile}
              type="application/pdf"
              className="w-full h-[80vh] rounded-lg"
              aria-label="Resume preview"
            >
              <div className="p-8 text-center text-sm text-muted-foreground">
                Your browser doesn't support inline PDF preview.{" "}
                <a href={profile.resumeFile} className="text-primary underline">
                  Open the resume
                </a>{" "}
                in a new tab.
              </div>
            </object>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  external = false,
}: {
  icon: typeof MapPin;
  label: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <Icon className="size-4 text-muted-foreground shrink-0 transition-colors group-hover:text-primary" />
      <span className="group-hover:text-primary transition-colors">{label}</span>
    </>
  );

  const rowClass =
    "group flex items-center gap-3 rounded-md px-2 py-2 -mx-2 hover:bg-muted/60 transition-colors";

  if (href) {
    return (
      <li>
        <a
          href={href}
          className={`${rowClass} ${label.includes("@") ? "break-all" : ""}`}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {inner}
        </a>
      </li>
    );
  }

  return (
    <li>
      <span className={rowClass}>{inner}</span>
    </li>
  );
}
