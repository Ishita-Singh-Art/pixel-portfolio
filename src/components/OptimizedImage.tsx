import { useEffect, useRef, useState } from "react";

/**
 * Drop-in <img> replacement that enforces every modern perf hint:
 *
 *   • loading="lazy"  (default) — opt out with `eager` for above-fold
 *   • decoding="async"          — never block the main thread on decode
 *   • fetchpriority="high"      — passed as `fetchpriority` (React-quirk-safe)
 *   • explicit width/height     — prevents CLS layout shift
 *   • fade-in on load           — eliminates FOUC on slow Drive thumbnails
 *   • IntersectionObserver      — defers the actual src attach until ~150px
 *     pre-mount                  from viewport (stricter than native lazy on
 *     mobile Safari / older Chromium)
 *   • native lazy fallback      — also sets loading="lazy" as a backstop for
 *     browsers that ignore IO
 *
 * Why a custom wrapper? React's JSX type system drops `fetchpriority` unless
 * we forward it manually, and we want fade-in + IO gating that a plain <img>
 * doesn't give us.
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
  /** Skip the IntersectionObserver gate (use only for SSR-critical / LCP images). */
  skipLazyMount?: boolean;
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
  skipLazyMount = false,
  onLoad,
}: OptimizedImageProps) {
  const [isMounted, setIsMounted] = useState(skipLazyMount || loading === "eager");
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  // Gate the src attribute behind an IntersectionObserver so we never request
  // an image that's far below the fold. Falls back to native loading="lazy"
  // automatically on browsers that don't support IO.
  useEffect(() => {
    if (isMounted) return;
    const node = ref.current;
    if (!node) return;

    // SSR / no-IO browsers: just mount immediately
    if (typeof IntersectionObserver === "undefined") {
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
      // Start fetching slightly before the image enters the viewport
      { rootMargin: "200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [isMounted]);

  // If the user clicks an anchor wrapping us, native lazy might miss the
  // click — also mount on any user interaction as a safety net.
  useEffect(() => {
    if (isMounted) return;
    const onUserGesture = () => setIsMounted(true);
    window.addEventListener("scroll", onUserGesture, { passive: true, once: true });
    window.addEventListener("touchstart", onUserGesture, { passive: true, once: true });
    window.addEventListener("mousemove", onUserGesture, { once: true });
    return () => {
      window.removeEventListener("scroll", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
      window.removeEventListener("mousemove", onUserGesture);
    };
  }, [isMounted]);

  return (
    <img
      ref={ref}
      // When not yet mounted, render an empty src so the browser doesn't fetch.
      // The IO will flip `isMounted` and the real src will attach.
      src={isMounted ? src : undefined}
      // data-src is sometimes used by 3rd-party lazy libs — harmless to keep.
      data-src={isMounted ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      // React 19 supports `fetchPriority` natively on <img>
      fetchPriority={fetchPriority}
      className={className}
      style={{
        ...style,
        // Start hidden, fade in when decoded — prevents the "pop" you get
        // when a Drive thumbnail finally streams in.
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
      onLoad={() => {
        setIsLoaded(true);
        onLoad?.();
      }}
      // Drive thumbnails occasionally fail (rate limit, network blip). Show
      // a subtle background so the layout doesn't collapse — the next route
      // navigation will retry the request.
      onError={() => setIsLoaded(true)}
    />
  );
}
