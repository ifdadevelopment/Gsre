"use client";

import { useState, useEffect, useRef } from "react";
import { services } from "@/app/(site)/data/services";
import Image from "next/image";
import Link from "next/link";

export default function OurServicesSlider() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalServices = services.length;
  const [cardsPerView, setCardsPerView] = useState(1);
  const intervalRef = useRef(null);
  const trackRef = useRef(null);

  // Update cards per view based on screen size
  useEffect(() => {
    setMounted(true);
    const updateView = () => {
      setCardsPerView(window.innerWidth >= 1024 ? 3 : 1); // 3 cards on large screens, 1 on small screens
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Auto-sliding every 3.5 seconds
  useEffect(() => {
    if (!mounted) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalServices); // Infinite loop logic
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [mounted]);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalServices); 
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalServices) % totalServices);
  };
  const setSlideIndex = (index) => setCurrentIndex(index);
  useEffect(() => {
    if (!mounted) return;

    if (currentIndex === totalServices - 1) {
      setTimeout(() => {
        setCurrentIndex(0); 
      }, 700);
    }
  }, [currentIndex, mounted]);

  if (!mounted) return null;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm global-color font-semibold uppercase">Our Process</p>
          <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
        </div>

        <div
          className="relative overflow-hidden group"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={() => {
            intervalRef.current = setInterval(() => {
              setCurrentIndex((prev) => prev + 1);
            }, 3500);
          }}
        >
          <div
            ref={trackRef}
            className={`flex transition-transform duration-700  ease-in-out`}
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className={`px-3  ${cardsPerView === 3 ? "min-w-[33.3333%]" : "min-w-full"}`}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={450}
                      sizes="100vh"
                      quality={100}
                      priority
                      className="w-full h-[320px] md:h-[420px] object-cover contrast-105"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="md:text-md text-sm global-color font-semibold">
                          {service.subtitle}
                        </p>
                        <h3 className="md:text-lg text-md font-semibold text-gray-900">
                          {service.title}
                        </h3>
                        <p className="md:text-sm text-xs text-gray-700 font-semibold">
                          View Details →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black text-xl md:text-3xl md:w-10 md:h-10 h-8 w-8 rounded-full flex items-center justify-center shadow-lg font-semibold"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black text-xl md:text-3xl md:w-10 md:h-10 h-8 w-8 rounded-full flex items-center justify-center shadow-lg font-semibold"
          >
            ›
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {services.map((_, index) => (
            <div
              key={index}
              onClick={() => setSlideIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
