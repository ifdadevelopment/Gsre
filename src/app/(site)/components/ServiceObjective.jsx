"use client";

import { useState, useEffect, useRef } from "react";

import { ServiceObjectives } from "../data/services";



const ServiceObjective = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const total = ServiceObjectives.length;
  const intervalRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % total); 
      }
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total); 
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total) % total); 
  };

  return (
    <section
      className="service-section bg-cover bg-center md:py-16 py-4 font-sans"
      style={{ backgroundImage: "url('/about/service-bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        <div className="text-start mb-12">
          <span className="md:text-2xl text-md font-semibold text-gray-600">
            Services We Offer
          </span>
          <h2 className="md:text-4xl text-3xl font-bold global-color mt-2">
            Objectives
          </h2>
          <p className="global-secondary-color text-[13px] md:text-lg mt-4 font-medium">
            At GS Refrigeration Enterprises, our core objectives guide our strategic direction and day-to-day operations. They reflect our commitment to excellence in the HVAC industry and our focus on long-term growth and customer satisfaction.
          </p>
        </div>

        <div
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex gap-4 transition-transform duration-700 py-4 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / 3}%)`, 
            }}
          >
            {ServiceObjectives.map((service, index) => (
              <div
                key={service.id} 
                className={`flex-shrink-0 transition-all duration-500 ease-in-out transform sm:w-80 lg:w-1/3`} 
              >
                <div
                  className={`bg-white rounded-lg shadow-lg p-6 text-center group hover:bg-gray-100 transition-all duration-300 ease-in-out transform h-[250px] ${
                    index === currentIndex +1  ? "scale-110 z-10" : "scale-90"
                  }`}
                >
                  <div className="icon mb-4 flex justify-center items-center">{service.icon}</div>
                  <h4 className="text-md font-bold mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-[12px] font-semibold">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black text-xl md:text-3xl md:w-10 md:h-10 h-8 w-8 rounded-full flex items-center justify-center shadow-lg font-semibold"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-black text-xl md:text-3xl md:w-10 md:h-10 h-8 w-8 rounded-full flex items-center justify-center shadow-lg font-semibold"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceObjective;
