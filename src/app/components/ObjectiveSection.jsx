"use client";

import React from "react";

const OBJECTIVES = [
  {
    title: "Environmental Sustainability",
    desc: "Promoting eco-friendly practices and reducing environmental impact.",
    gradient: "from-pink-600 to-indigo-900",
  },
  {
    title: "Education Support",
    desc: "Supporting education and skill development initiatives.",
    gradient: "from-purple-600 to-green-400",
  },
  {
    title: "E-Waste Management",
    desc: "Encouraging responsible disposal and recycling of electronic waste.",
    gradient: "from-lime-400 to-fuchsia-600",
  },
  {
    title: "Community Development",
    desc: "Improving quality of life through community-focused programs.",
    gradient: "from-blue-600 to-cyan-400",
  },
  {
    title: "Ethical Practices",
    desc: "Ensuring transparency and ethical business operations.",
    gradient: "from-rose-500 to-orange-400",
  },
  {
    title: "National Growth",
    desc: "Contributing to sustainable national development goals.",
    gradient: "from-emerald-500 to-teal-700",
  },
];

const ObjectiveCards = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADING */}
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
          CSR Objectives
        </h3>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {OBJECTIVES.map((item, index) => (
            <div
              key={index}
              className="relative group h-[200px] rounded-xl overflow-hidden shadow-lg"
            >
              {/* CARD BACKGROUND */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${item.gradient}`}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-6
                              transform -translate-x-full group-hover:translate-x-0
                              transition-transform duration-500">
                <h4 className="text-lg font-semibold text-[#edb899]">
                  {item.title}
                </h4>

                <button className="self-start px-4 py-1 text-sm rounded-full bg-[#edb899] text-black font-semibold">
                  Read More
                </button>
              </div>
              <div className="relative z-10 h-full flex items-end p-6">
                <p className="text-white font-semibold">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectiveCards;
