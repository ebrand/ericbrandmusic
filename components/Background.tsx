"use client";

import { useState, useEffect } from "react";

export default function Background({ images }: { images: string[] }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (images.length > 0) {
      setSrc(images[Math.floor(Math.random() * images.length)]);
    }
  }, [images]);

  if (!src) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-5"
      style={{ backgroundImage: `url('${src}')` }}
      aria-hidden="true"
    />
  );
}
