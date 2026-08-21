import { ExternalLink, FolderOpen } from "lucide-react";
import type { ProjectMedia } from "@/data/portfolio";
import { OptimizedImage } from "@/components/OptimizedImage";
import { LazyIframe } from "@/components/LazyIframe";

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
  /** Use "high" only on the single LCP image per page. */
  fetchPriority?: "auto" | "high" | "low";
};

export function MediaRenderer({
  media,
  alt = "Artwork",
  index = 0,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
}: MediaRendererProps) {
  if (media.type === "image") {
    return (
      <OptimizedImage
        src={media.src}
        alt={media.alt ?? alt}
        className={className || "w-full object-contain"}
        loading={loading}
        fetchPriority={fetchPriority}
        // Aspect ratio hint: prevents CLS while Drive thumbnail streams in.
        style={{ backgroundColor: "var(--muted, #1f1f23)" }}
        // Eager-loading images are LCP candidates — skip the IO gate so the
        // browser can start the request immediately during initial paint.
        skipLazyMount={loading === "eager"}
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

  // Framable video — lazy-mount via IntersectionObserver.
  // Drive video player renders the 16:9 video plus a control bar, so we use a
  // 4:3 frame by default (matches Drive's native 640x480).
  return (
    <LazyIframe
      src={media.src}
      title={media.title ?? `Video ${index + 1}`}
      className={className}
      aspectRatio="4/3"
      eager={loading === "eager"}
    />
  );
}
