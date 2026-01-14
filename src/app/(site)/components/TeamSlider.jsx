"use client";

import { teamMembers } from "@/app/(site)/data/services";
import Image from "next/image";


const TeamCard = ({ member }) => (
  <div className="w-[260px] sm:w-[300px]  bg-white rounded-2xl shadow-sm p-6 mx-4 flex flex-col items-center text-center">
    <Image
      src={member.image}
      alt={member.name}
      width={60}
      height={60}
      className="rounded-full object-cover"
    />

    <h3 className="text-lg font-semibold text-gray-900 mt-4">
      {member.name}
    </h3>

    <p className="text-sm global-color font-semibold mt-1">
      {member.role}
    </p>

    <p className="text-gray-600 text-sm mt-3">
      {member.description}
    </p>
  </div>
);

const TeamSlider = () => {
  return (
    <section className="py-16 max-w-6xl mx-auto px-4  overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl font-semibold mx-auto">
            Our experienced professionals deliver reliable and efficient HVACR
            solutions with engineering precision.
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        <div className="flex py-4 w-max animate-team-marquee">
          {[...teamMembers, ...teamMembers].map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;
