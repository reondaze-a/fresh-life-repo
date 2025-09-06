"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { images: string[] };

export default function ImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  if (images.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
      <div className="relative h-72 w-full md:h-96">
        <Image
          src={images[index]}
          alt={`Slide ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      {/* controls (hidden on small if you want) */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-1 text-sm ring-1 ring-zinc-700 backdrop-blur hover:bg-black/70 active:scale-95"
        onClick={prev}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-1 text-sm ring-1 ring-zinc-700 backdrop-blur hover:bg-black/70 active:scale-95"
        onClick={next}
        aria-label="Next"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
