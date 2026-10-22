// Usage (from the repo root, Node 18+):  node tools/download-images.mjs
// Downloads each product image listed in tools/image-sources.tsv into
// public/images/<slug>.<ext>. Run it on your own computer: manufacturer sites
// refuse requests from servers/hotlinks but serve normal downloads.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const rows = readFileSync("tools/image-sources.tsv", "utf8")
  .split("\n").map((l) => l.trim()).filter(Boolean)
  .map((l) => { const [slug, url] = l.split("\t"); return { slug, url }; });

const outDir = join("public", "images");
mkdirSync(outDir, { recursive: true });

const EXT = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };
const cache = new Map(); // url -> { buf, ext }  (many slugs share one series image)
const failed = [];
let saved = 0, skipped = 0;

for (const { slug, url } of rows) {
  if (["webp", "jpg", "png"].some((e) => existsSync(join(outDir, `${slug}.${e}`)))) { skipped++; continue; }
  try {
    if (!cache.has(url)) {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; EnergyLankaImageFetch/1.0)", Referer: new URL(url).origin + "/" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = (res.headers.get("content-type") || "").split(";")[0].trim();
      const ext = EXT[type] || url.split("?")[0].split(".").pop().toLowerCase();
      if (!["png", "jpg", "jpeg", "webp"].includes(ext)) throw new Error(`not an image (${type})`);
      cache.set(url, { buf: Buffer.from(await res.arrayBuffer()), ext: ext === "jpeg" ? "jpg" : ext });
    }
    const { buf, ext } = cache.get(url);
    writeFileSync(join(outDir, `${slug}.${ext}`), buf);
    saved++;
  } catch (e) {
    failed.push(`${slug}  ${url}  -> ${e.message}`);
  }
}

console.log(`Saved ${saved}, already present ${skipped}, failed ${failed.length}`);
if (failed.length) console.log("Failed:\n" + failed.join("\n"));
console.log("Slugs with no source yet are listed in tools/image-unresolved.txt (they show the placeholder).");
