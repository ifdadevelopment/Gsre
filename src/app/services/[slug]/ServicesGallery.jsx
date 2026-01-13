"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ServicesGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const gridImages = images.slice(0, 5);
  const extraCount = images.length - 5;

  const openPreview = (index) => setActiveIndex(index);
  const closePreview = () => setActiveIndex(null);

  const prevSlide = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const nextSlide = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  useEffect(() => {
    const handleKey = (e) => {
      if (activeIndex === null) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closePreview();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="relative md:col-span-2 md:row-span-2 h-[260px] md:h-[520px] rounded-2xl overflow-hidden border cursor-pointer"
          onClick={() => openPreview(0)}
        >
          <Image
            src={gridImages[0]}
            alt={title}
            fill
            priority
            className="object-cover hover:scale-105 transition"
          />
        </div>
        {gridImages.slice(1).map((img, i) => {
          const realIndex = i + 1;
          const isLast = i === 3 && extraCount > 0;

          return (
            <div
              key={i}
              className="relative h-[240px] md:h-[250px] rounded-2xl overflow-hidden border cursor-pointer"
              onClick={() => openPreview(realIndex)}
            >
              <Image
                src={img}
                alt={`${title} ${realIndex}`}
                fill
                className="object-cover hover:scale-105 transition"
              />

              {isLast && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    +{extraCount}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <button
            onClick={closePreview}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            ×
          </button>
          <button
            onClick={prevSlide}
            className="absolute left-6 text-white text-5xl select-none"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 text-white text-5xl select-none"
          >
            ›
          </button>
          <div className="relative w-[90vw] h-[70vh] mb-6">
            <Image
              src={images[activeIndex]}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto px-6 pb-4">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative min-w-[120px] h-[80px] rounded-lg overflow-hidden border cursor-pointer ${
                  i === activeIndex ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
