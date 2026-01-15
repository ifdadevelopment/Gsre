"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BRANDS } from "../data/services";

export default function OurBrands() {
  const [mounted, setMounted] = useState(false);
  const brands = [...BRANDS, ...BRANDS];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold">
            Our Brands
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-600 font-medium">
            Sales &amp; Services
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee w-max">
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="w-[180px] h-[100px] flex items-center justify-center mx-6 bg-white shadow-md"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={180}
                  height={100}
                  quality={100}
                  sizes="180px"
                  priority={index < 6}
                  className="object-contain select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
