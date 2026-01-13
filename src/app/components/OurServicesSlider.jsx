"use client";

import { services } from "@/data/services";
import Image from "next/image";
import Link from "next/link";

export default function OurServicesSlider() {
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
          <div className="flex animate-marquee ">
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
  shadow-sm hover:shadow-lg ">
                    <div className="relative w-full h-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={95}
                        priority={index < 4}
                        className="object-cover transition-transform duration-500 "
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="bg-white/95 p-4 w-full backdrop-blur-sm">
                        <p className="text-xs md:text-sm global-color font-bold">
                          {service.subtitle}
                        </p>
                        <h3 className="text-xs md:text-[14px] font-bold text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-sm md:text-md font-semibold text-gray-600 mt-1">
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
