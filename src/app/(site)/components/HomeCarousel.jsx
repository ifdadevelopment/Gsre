"use client";

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { slides } from "../data/services";

const HomeCarousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
      <video
        key={slides[index].video}
        src={slides[index].video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex px-4 ">
        <div className="absolute md:bottom-50 bottom-20  md:left-20 left-4 text-left ">
          <h2 className="text-xl md:text-6xl  max-w-3xl font-bold text-white mb-2">
            {slides[index].title}
          </h2>
          <p className="text-sm md:text-lg text-gray-200 max-w-2xl">
            {slides[index].subtitle}
          </p>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
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
