"use client";

import { projects } from "@/app/(site)/data/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LatestWork() {
  const slides = [
    projects[projects.length - 1],
    ...projects,
    projects[0],
  ];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;

    const updateView = () => {
      setCardsPerView(window.innerWidth >= 1024 ? 3 : 1);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [mounted]);

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);
  useEffect(() => {
    if (!mounted) return;

    if (index === slides.length - cardsPerView) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 700);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(slides.length - cardsPerView - 1);
      }, 700);
    }
  }, [index, cardsPerView, slides.length, mounted]);
  useEffect(() => {
    if (!mounted) return;

    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition, mounted]);

  if (!mounted) return null;

  return (
    <section className="bg-[#0b1220] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-sm text-white/70 tracking-widest uppercase">
            Latest Project
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2">
            Our Latest Work
          </h2>
        </div>
        <div
          className="relative overflow-hidden group"
          onMouseEnter={() => clearInterval(intervalRef.current)}
          onMouseLeave={() => {
            intervalRef.current = setInterval(() => {
              setIndex((prev) => prev + 1);
            }, 3500);
          }}
        >
          <div
            className={`flex ${transition ? "transition-transform duration-700 ease-in-out" : ""
              }`}
            style={{
              transform: `translateX(-${(index * 100) / cardsPerView}%)`,
            }}
          >
            {slides.map((item, i) => (
              <div
                key={i}
                className={`px-3 ${cardsPerView === 3 ? "min-w-[33.333%]" : "min-w-full"
                  }`}
              >
                <Link href={`/projects/${item.slug}`}>
                  <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={450}
                      sizes="100vh"
                      quality={100}
                      priority
                      className="w-full h-[320px] md:h-[420px] object-cover contrast-105"
                    />
                    {/* <Image
  src={item.image}
  alt={item.name}
  width={600}
  height={420}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={85}
  loading="lazy"
  className="w-full h-auto object-cover contrast-105"
/> */}

                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="md:text-md text-sm global-color font-semibold">
                          {item.city}
                        </p>
                        <h3 className="md:text-lg text-md font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="md:text-sm text-xs text-gray-700 font-semibold">
                          {item.area}
                        </p>
                      </div>

                      <div className="md:w-10 md:h-10 h-8 w-8 flex items-center justify-center rounded-full global-bg text-white text-md md:text-lg">
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={prev}
            className="
    opacity-100 md:opacity-0
    md:group-hover:opacity-100
    transition-all duration-300
    absolute left-3 top-1/2 -translate-y-1/2
    z-20
    bg-white/90 hover:bg-white
    text-black text-xl md:text-3xl
    md:w-10 md:h-10 h-8 w-8 rounded-full
    flex items-center justify-center
    shadow-lg  font-semibold
  "
          >
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={next}
            className="
    opacity-100 md:opacity-0
    md:group-hover:opacity-100
    transition-all duration-300
    absolute right-3 top-1/2 -translate-y-1/2
    z-20
    bg-white/90 hover:bg-white
    text-black text-xl md:text-3xl
    md:w-10 md:h-10 h-8 w-8 rounded-full
    flex items-center justify-center
    shadow-lg  font-semibold
  "
          >
            ›
          </button>

        </div>
      </div>
    </section>
  );
}
