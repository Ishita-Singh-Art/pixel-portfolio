import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex gap-5">
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={profile.drivePortfolio} target="_blank" rel="noreferrer" className="hover:text-foreground">Drive</a>
        </div>
      </div>
    </footer>
  );
}
