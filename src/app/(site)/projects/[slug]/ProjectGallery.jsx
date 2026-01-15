"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProjectGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const startX = useRef(0);
  const total = images.length;
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const gridLimit = isMobile ? 2 : 5;
  const gridImages = images.slice(0, gridLimit);
  const extraCount = total - gridLimit;
  const openPreview = (index) => {
    if (!total) return;
    setActiveIndex(index);
  };

  const closePreview = () => setActiveIndex(null);
  const prevSlide = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + total) % total;
    });
  };

  const nextSlide = () => {
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % total;
    });
  };
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closePreview();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, total]);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;
    diff > 0 ? nextSlide() : prevSlide();
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {gridImages.map((img, i) => {
          const isMain = !isMobile && i === 0;
          const isLast = i === gridImages.length - 1 && extraCount > 0;

          return (
            <div
              key={i}
              onClick={() => openPreview(i)}
              className={`
                relative rounded-2xl overflow-hidden border cursor-pointer
                ${isMain ? "md:col-span-2 md:row-span-2" : ""}
                h-[200px] sm:h-[220px] md:h-[250px]
                ${isMain ? "md:h-[520px]" : ""}
              `}
            >
              <Image
                src={img}
                alt={`${title} ${i}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition"
              />

              {isLast && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-2xl md:text-3xl font-bold">
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
            className="absolute top-4 right-4 text-white text-4xl"
          >
            ×
          </button>

          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-6 text-white text-4xl md:text-5xl"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 md:right-6 text-white text-4xl md:text-5xl"
          >
            ›
          </button>

          <div
            className="relative w-[95vw] md:w-[90vw] h-[55vh] md:h-[70vh] mb-4"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={images[activeIndex]}
              alt="Preview"
              fill
              sizes="90vw"
              className="object-contain contrast-105"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory px-4 pb-4 w-full">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  snap-start shrink-0
                  w-[70px] h-[55px]
                  sm:w-[80px] sm:h-[60px]
                  md:w-[120px] md:h-[80px]
                  relative rounded-lg overflow-hidden border cursor-pointer
                  ${i === activeIndex ? "ring-2 ring-blue-500" : ""}
                `}
              >
                <Image
                  src={img}
                  alt={`thumb-${i}`}
                  fill
                  sizes="120px"
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
