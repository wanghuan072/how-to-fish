const widths = [640, 750, 960, 1440, 1920];
const srcSet = (format: string) => widths.map((width) => `/images/hero/home-${width}.${format} ${width}w`).join(", ");

export function HomeHeroImage({ className }: { className: string }) {
  return (
    <>
      <link rel="preload" as="image" type="image/avif" imageSrcSet={srcSet("avif")} imageSizes="100vw" fetchPriority="high" />
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
        {/* Pre-encoded responsive files avoid image transformation on the LCP request. */}
        <img className={className} src="/images/hero/home-1920.webp" srcSet={srcSet("webp")} sizes="100vw" width={1920} height={1080} fetchPriority="high" loading="eager" alt="Official How to Fish gameplay screenshot showing players fishing and exploring a tropical shore" />
      </picture>
    </>
  );
}
