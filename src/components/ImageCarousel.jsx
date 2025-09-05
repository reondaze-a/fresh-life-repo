import { useEffect, useState } from "react";

export default function ImageCarousel({
  images,
}) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % images.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="max-w-3xl h-full md:h-full overflow-hidden relative items-center justify-center rounded">
      <div
        className="flex transition-transform sm:h-[419px] duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex items-center flex-shrink-0">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover md:object-fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
