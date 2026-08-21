import { useEffect, useRef, useState } from "react";

/**
 * Thin <img> wrapper that applies modern performance hints without breaking
 * loading:
 *
 *   • loading="lazy" (default) / "eager" for above-fold
 *   • decoding="async" — never block the main thread on decode
 *   • fetchPriority — forwarded (React 19 supports it natively)
 *   • explicit width/height — prevents CLS layout shift
 *   • safe fade-in on load — reveals on onLoad / onError / already-complete,
 *     so a cached or failed image can never stay invisible
 *
 * NOTE: we deliberately do NOT gate the src behind an IntersectionObserver.
 * Stacking IO gating + loading="lazy" + a dynamically-attached src caused
 * images to never load — the browser's lazy loader had already laid out the
 * element without a src and never re-evaluated once the src was attached.
 * Native loading="lazy" is reliable on all modern browsers and is the single
 * source of truth here.
 */

export type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Default "lazy". Use "eager" for hero / LCP images. */
  loading?: "lazy" | "eager";
  /** Default "auto". Use "high" only on the single LCP image per page. */
  fetchPriority?: "auto" | "high" | "low";
  className?: string;
  /** Pass through extra inline style (e.g. objectFit). */
  style?: React.CSSProperties;
  /** Called once the image has decoded and faded in. */
  onLoad?: () => void;
};

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority = "auto",
  className = "",
  style,
  onLoad,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Cached images fire their load event before React attaches onLoad, so
  // onLoad never runs and the image would stay at opacity 0. Reveal it
  // immediately if it's already complete by the time we mount.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      className={className}
      style={{
        ...style,
        // Start hidden, fade in when decoded — prevents the "pop" you get
        // when a Drive thumbnail finally streams in. onError also reveals it
        // so a broken image shows its icon instead of vanishing.
        opacity: loaded ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
      onLoad={() => {
        setLoaded(true);
        onLoad?.();
      }}
      onError={() => setLoaded(true)}
    />
  );
}
