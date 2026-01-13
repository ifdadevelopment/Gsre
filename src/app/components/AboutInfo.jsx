"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TABS } from "@/data/services";



const AboutInfo = () => {
  const [activeTab, setActiveTab] = useState("about");
  const currentTab = TABS.find((tab) => tab.key === activeTab);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          About <span className="global-color">GSRE</span>
        </h1>
        <p className="text-sm sm:text-base font-semibold text-gray-600 max-w-2xl mx-auto">
          Engineering excellence in HVACR solutions with a strong focus on
          quality, efficiency, and customer satisfaction.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div className="relative w-full h-[260px] md:h-[380px] rounded-lg overflow-hidden">
          <Image
            src="/about/about-image.jpg"
            alt="GS Refrigeration Enterprises"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <div className="flex gap-6 mb-6 ">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-2 text-sm sm:text-base md:text-2xl font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-current global-color"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">
              {currentTab.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {currentTab.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
