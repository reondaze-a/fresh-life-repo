"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroCard({
  title,
  subtitle,
  buttonPrimary,
  buttonPrimaryFunction,
  buttonSecondary,
  buttonSecondaryFunction,
  images,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800">
      {/* Background image area */}
      <div className="relative h-[42svh] w-full md:h-[60svh]">
        {/* CHANGED: render ALL slides stacked and fade via opacity (cross-fade) */}
        {/* - We keep them mounted so CSS transitions can run when index changes */}
        {/* - Only the active image has opacity-100; others are opacity-0 */}
        {images.map((src, i) => (
          <Image
            key={`${i}-${src}`} // CHANGED: stable key per slide
            src={src}
            alt="" // CHANGED: decorative background
            fill
            priority={i === 0} // CHANGED: prioritize first image only
            sizes="(max-width: 768px) 100vw, 1200px"
            className={[
              "object-cover", // same visual fit
              "transition-opacity duration-700 ease-in-out", // CHANGED: fade animation
              "absolute inset-0", // ensure overlap
              i === index ? "opacity-100" : "opacity-0",
              "motion-reduce:transition-none", // CHANGED: respect reduced motion
            ].join(" ")}
          />
        ))}

        {/* Gradient overlay kept on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
      </div>

      {/* Text + buttons */}
      <div className="pointer-events-none absolute inset-0 flex items-end">
        <div className="pointer-events-auto mx-auto w-full max-w-6xl px-6 pb-8">
          <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-zinc-200">{subtitle}</p>
          )}

          <div className="mt-4 flex gap-3">
            {buttonPrimary && (
              <button
                onClick={() => buttonPrimaryFunction}
                className="rounded-3xl bg-white px-4 py-2 font-semibold text-black transition duration-300 active:scale-95 hover:bg-zinc-400 hover:cursor-pointer"
              >
                {buttonPrimary}
              </button>
            )}
            {buttonSecondary && (
              <button
                onClick={buttonSecondaryFunction}
                className="rounded-3xl border border-zinc-700 px-4 py-2 font-semibold text-white duration-300 transition active:scale-95 hover:text-orange-500 hover:cursor-pointer"
              >
                {buttonSecondary}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
