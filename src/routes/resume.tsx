import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { profile } from "@/data/portfolio";
import { Download, Mail, Phone, Linkedin, FolderOpen, MapPin } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume & Contact — Ishita Singh" },
      { name: "description", content: "Download Ishita Singh's resume and get in touch for freelance 3D/2D art work." },
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
        <div className="rounded-xl border border-border bg-card p-6 shadow-card h-fit">
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-sm text-primary">{profile.title}</p>

          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-muted-foreground" />
              <a href={`mailto:${profile.email}`} className="hover:text-primary break-all">
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 text-muted-foreground" />
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Linkedin className="size-4 text-muted-foreground" />
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FolderOpen className="size-4 text-muted-foreground" />
              <a href={profile.drivePortfolio} target="_blank" rel="noreferrer" className="hover:text-primary">
                Drive Portfolio
              </a>
            </li>
          </ul>

          <a
            href={profile.resumeFile}
            download
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
          >
            <Download className="size-4" /> Download Resume (PDF)
          </a>
        </div>

        {/* PDF Preview */}
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
      </div>
    </div>
  );
}
