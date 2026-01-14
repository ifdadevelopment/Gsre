"use client";

import { useEffect, useState } from "react";
import { services } from "@/app/(site)/data/services";
import Image from "next/image";
import Link from "next/link";

export default function OurServicesSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const marqueeServices = [...services, ...services];

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

        <div className="relative overflow-hidden py-4">
          <div className="flex animate-marquee">
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
                      sizes="(max-width: 640px) 100vw,
                             (max-width: 1024px) 50vw,
                             33vw"
                      quality={90}
                      className="object-cover transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="bg-white/95 p-4 w-full backdrop-blur-sm">
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
        </div>

      </div>
    </section>
  );
}
