"use client";

import { projects } from "@/app/(site)/data/services";
import Image from "next/image";
import Link from "next/link";

export default function LatestWork() {
  const marqueeProjects = [...projects, ...projects];

  return (
    <section className="bg-[#0b1220] py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <p className="text-sm text-white/70 tracking-widest uppercase">
            Latest Project
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mt-2">
            Our Latest Work
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee will-change-transform">
            {marqueeProjects.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 shrink-0"
              >
                <Link href={`/projects/${item.slug}`}>
                  <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer transition-all duration-300">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={450}
                      quality={95}
                      className="w-full h-[420px] object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm global-color font-semibold">
                          {item.city}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-700 font-semibold">
                          {item.area}
                        </p>
                      </div>

                      <div className="w-10 h-10 flex items-center justify-center rounded-full global-bg text-white text-lg">
                        →
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
