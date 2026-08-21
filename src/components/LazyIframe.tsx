/**
 * Thin <iframe> wrapper for Google Drive /preview embeds. Uses native
 * loading="lazy" so the chunky Drive player (~300KB JS) is only fetched when
 * the iframe nears the viewport.
 *
 * NOTE: we deliberately do NOT gate the src behind an IntersectionObserver.
 * Stacking IO gating + loading="lazy" + a dynamically-attached src caused
 * embeds to never load. Native loading="lazy" is the single source of truth.
 */

export type LazyIframeProps = {
  src: string;
  title: string;
  className?: string;
  /** Optional aspect-ratio override. Drive video defaults to 4:3 (player + controls). */
  aspectRatio?: string;
  /** Set true for the LCP iframe — skip native lazy loading. */
  eager?: boolean;
};

export function LazyIframe({
  src,
  title,
  className = "",
  aspectRatio = "4/3",
  eager = false,
}: LazyIframeProps) {
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio }}>
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        loading={eager ? "eager" : "lazy"}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
