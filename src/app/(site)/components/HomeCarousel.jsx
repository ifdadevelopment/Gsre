"use client";

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    video: "/videos/slide1.mp4",
    title: "HVACR Engineering Excellence",
    subtitle: "Precision-driven cooling & ventilation systems",
  },
  {
    video: "/videos/slide2.mp4",
    title: "Efficient Cooling Solutions",
    subtitle: "Energy-optimized HVACR for modern infrastructure",
  },
  {
    video: "/videos/slide3.mp4",
    title: "Industrial & Commercial Projects",
    subtitle: "Scalable HVACR systems for large facilities",
  },
];

const HomeCarousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  /* ✅ AUTO CHANGE EVERY 3 SECONDS */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
      
      {/* VIDEO */}
      <video
        key={slides[index].video}
        src={slides[index].video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {slides[index].title}
          </h2>
          <p className="text-sm md:text-lg text-gray-200 max-w-xl mx-auto">
            {slides[index].subtitle}
          </p>
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeCarousel;
