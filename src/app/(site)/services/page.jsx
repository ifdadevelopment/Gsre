import { services } from "@/app/(site)/data/services";
import OurServiceCard from "../components/OurServiceCard";

export default function ServicesPage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-10">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <OurServiceCard
              key={service.slug}
              title={service.title}
              slug={service.slug}
              image={service.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
