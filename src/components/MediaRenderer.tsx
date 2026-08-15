import { ExternalLink, FolderOpen } from "lucide-react";
import type { ProjectMedia } from "@/data/portfolio";

/** Google Drive URLs that can't be framed on external sites */
function isUnframeable(src: string): boolean {
  return src.includes("embeddedfolderview") || src.includes("accounts.google.com");
}

type MediaRendererProps = {
  media: ProjectMedia;
  alt?: string;
  index?: number;
  className?: string;
  /** Use "eager" for above-fold / hero images */
  loading?: "lazy" | "eager";
};

export function MediaRenderer({
  media,
  alt = "Artwork",
  index = 0,
  className = "",
  loading = "lazy",
}: MediaRendererProps) {
  if (media.type === "image") {
    return (
      <img
        src={media.src}
        alt={media.alt ?? alt}
        className={className || "w-full object-contain"}
        loading={loading}
      />
    );
  }

  // Video — check if it can actually be framed
  if (isUnframeable(media.src)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 text-center bg-muted/50 rounded-xl">
        <FolderOpen className="size-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground max-w-xs">
          {media.title ?? "Google Drive folder"} can't be embedded here.
        </p>
        <a
          href={media.src
            .replace("embeddedfolderview?id=", "drive/folders/")
            .replace(/#.*$/, "")
            .concat("?usp=sharing")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Open in Drive <ExternalLink className="size-3.5" />
        </a>
      </div>
    );
  }

  // Framable video — fills a 4:3 frame by default (Google Drive's player renders the
  // 16:9 video plus a control bar below it, so 16:9 clips the controls). className
  // (e.g. max-h) can further constrain it.
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: "4/3" }}>
      <iframe
        src={media.src}
        title={media.title ?? `Video ${index + 1}`}
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
