import { profile } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.drivePortfolio}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Drive
          </a>
          <button
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <ArrowUp className="size-3.5" /> Top
          </button>
        </div>
      </div>
    </footer>
  );
}
