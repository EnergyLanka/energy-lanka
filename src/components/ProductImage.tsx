"use client";

import { useState } from "react";

// Loads /images/<slug>.<ext> from the site's own public folder.
// Tries webp, jpg, then png; if none exist, shows a neutral placeholder
// so a missing photo never appears as a broken image.
const EXTENSIONS = ["webp", "jpg", "png"];

export default function ProductImage({ slug, alt }: { slug: string; alt: string }) {
  const [attempt, setAttempt] = useState(0);
  const src =
    attempt < EXTENSIONS.length
      ? `/images/${slug}.${EXTENSIONS[attempt]}`
      : "/images/placeholder.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
      onError={() => {
        if (attempt < EXTENSIONS.length) setAttempt(attempt + 1);
      }}
    />
  );
}
