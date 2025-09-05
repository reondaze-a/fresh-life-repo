import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HeroCard({
  title,
  subtitle,
  buttonPrimary,
  buttonSecondary,
  images,
}) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(
          (prev) => (prev + 1) % images.length,
        );
        setFade(true);
      }, 500); // fade out duration
    }, 5000); // auto cycle every 5s

    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) =>
        prev === 0 ? images.length - 1 : prev - 1,
      );
      setFade(true);
    }, 500); // fade out duration
  }

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent(
        (prev) => (prev + 1) % images.length,
      );
      setFade(true);
    }, 500); // fade out duration
  }

  return (
    <div className="bg-[#0a0a0a] relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[current]})`,
          opacity: fade ? 1 : 0,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-white px-4">
        <h2 className="mb-4 text-4xl font-bold">
          {title}
        </h2>
        <p className="text-lg">{subtitle}</p>
        <div className="mt-6 space-x-4">
          {buttonPrimary && (
            <button className="rounded-3xl bg-white px-4 py-2 text-black font-semibold border border-white transition-all duration-300 ease-in-out hover:bg-gray-400/40 hover:text-white active:scale-95 active:bg-gray-400/40 active:text-white cursor-pointer">
              {buttonPrimary}
            </button>
          )}
          {buttonSecondary && (
            <button className="rounded-3xl bg-transparent px-4 py-2 text-white font-semibold border border-white transition-all duration-300 ease-in-out hover:bg-white/10 active:scale-95 active:bg-white/10 cursor-pointer">
              {buttonSecondary}
            </button>
          )}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/40 rounded-full hover:bg-black/70"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/40 rounded-full hover:bg-black/70"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
