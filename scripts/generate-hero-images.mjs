// Uses Sharp installed with the project's pinned Next.js dependency.
// Run from the repository root after replacing the source gameplay image.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

await mkdir("public/images/hero", { recursive: true });
for (const width of [640, 750, 960, 1440, 1920]) {
  for (const format of ["avif", "webp"]) {
    await sharp("public/images/official/gameplay-03.jpg")
      .resize({ width, withoutEnlargement: true })
      .toFormat(format, { quality: format === "avif" ? 50 : 75 })
      .toFile(`public/images/hero/home-${width}.${format}`);
  }
}
