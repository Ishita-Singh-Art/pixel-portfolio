import { useEffect, useRef, useState } from "react";

/**
 * Lazy-mounting iframe. Google Drive's /preview iframe pulls down a chunky
 * player + control bar (~300KB JS) — mounting even a few of these eagerly
 * starves the image bandwidth budget. We hold a placeholder div until the
 * element scrolls within 200px of the viewport, then attach the real src.
 */
export type LazyIframeProps = {
  src: string;
  title: string;
  className?: string;
  /** Optional aspect-ratio override. Drive video defaults to 4:3 (player + controls). */
  aspectRatio?: string;
  /** Set true for the LCP iframe — skip the IO gate. */
  eager?: boolean;
};

export function LazyIframe({
  src,
  title,
  className = "",
  aspectRatio = "4/3",
  eager = false,
}: LazyIframeProps) {
  const [isMounted, setIsMounted] = useState(eager);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMounted) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsMounted(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [isMounted]);

  return (
    <div ref={ref} className={`relative w-full ${className}`} style={{ aspectRatio }}>
      {isMounted ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          // Lazy iframe — only download once mounted
          loading="lazy"
          // Drive /preview supports autoplay attributes
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : (
        // Skeleton placeholder so the layout doesn't jump when the iframe mounts
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-xs text-muted-foreground">
          Loading video…
        </div>
      )}
    </div>
  );
}
