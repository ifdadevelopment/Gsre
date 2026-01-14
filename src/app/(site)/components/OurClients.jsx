import { clients } from "@/app/(site)/data/services";
import Image from "next/image";

export default function OurClients() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="flex items-center gap-4 mb-10">
          <span className="flex-1 h-px bg-gray-300" />
          <h1 className="text-2xl md:text-4xl font-bold whitespace-nowrap">
            Our Clients
          </h1>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            {clients.concat(clients).map((client, index) => (
              <div
                key={`client-${index}`}
                className="mx-6 flex items-center justify-center
                           min-w-[180px] h-[100px]
                           bg-white border border-gray-200
                           rounded-md p-4"
              >
                {/* Logo Container */}
                <div className="relative w-full h-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="180px"
                    quality={100}
                    priority={index < 6}
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
