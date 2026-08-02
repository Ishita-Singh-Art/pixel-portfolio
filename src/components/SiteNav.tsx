import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/resume", label: "Resume" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Ishita<span className="text-primary">.</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm text-primary font-medium rounded-md" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="p-2 -mr-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="px-5 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                  activeProps={{
                    className: "block px-3 py-2 rounded-md text-primary font-medium bg-muted",
                  }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
