"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/app/(site)/data/services";
import Image from "next/image";
import Link from "next/link";

export default function OurServicesSlider() {
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const marqueeServices = [...services, ...services];
  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[0];
    const cardWidth = card.offsetWidth;

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${dir * cardWidth}px)`;

    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
    }, 500);
  };
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm global-color font-semibold uppercase">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Services
          </h2>
        </div>
        <div
          className="relative overflow-hidden py-4 group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className={`flex ${paused ? "" : "animate-marquee"}`}
          >
            {marqueeServices.map((service, index) => (
              <div
                key={`${service.slug}-${index}`}
                className="w-full sm:w-1/2 md:w-1/4 px-3 shrink-0"
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="group relative h-[400px] rounded-xl overflow-hidden
                    bg-gray-100 cursor-pointer
                    border border-global-color
                    border-b-6 border-b-global-color
                    shadow-sm hover:shadow-lg">

                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="100vh"
                      quality={100}
                      priority
                      className="w-full h-[320px] md:h-[420px] object-cover contrast-105"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="bg-white/95 p-4 w-full ">
                        <p className="text-xs global-color font-bold">
                          {service.subtitle}
                        </p>
                        <h3 className="text-sm font-bold text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-sm font-semibold text-gray-600 mt-1">
                          View Details →
                        </p>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button
            onClick={() => slide(1)}
            className="
    absolute left-3 top-1/2 -translate-y-1/2 z-20
    bg-white text-black
    w-10 h-10 rounded-full
    flex items-center justify-center
    shadow-lg

    opacity-80
    md:opacity-0
    md:group-hover:opacity-100

    transition-opacity duration-300
  "
          >
            ‹
          </button>
          <button
            onClick={() => slide(-1)}
            className="
    absolute right-3 top-1/2 -translate-y-1/2 z-20
    bg-white text-black
    w-10 h-10 rounded-full
    flex items-center justify-center
    shadow-lg

    opacity-80
    md:opacity-0
    md:group-hover:opacity-100

    transition-opacity duration-300
  "
          >
            ›
          </button>

        </div>
      </div>
    </section>
  );
}
