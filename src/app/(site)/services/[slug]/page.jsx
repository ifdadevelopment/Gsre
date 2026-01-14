import { services } from "@/app/(site)/data/services";
import { notFound } from "next/navigation";
import ServicesGallery from "./ServicesGallery";


export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params; 

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | GS Refrigeration Enterprises",
      description: "The requested service could not be found.",
      robots: "noindex",
    };
  }

  return {
    metadataBase: new URL("https://www.gsrefrigeration.com"),
    title: `${service.title} | GS Refrigeration Enterprises`,
    description: service.description,

    alternates: {
      canonical: `/services/${service.slug}`,
    },

    openGraph: {
      title: `${service.title} | GS Refrigeration Enterprises`,
      description: service.description,
      type: "website",
      images: service.images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: service.title,
      })),
    },

    twitter: {
      card: "summary_large_image",
      title: `${service.title} | GS Refrigeration Enterprises`,
      description: service.description,
      images: [service.images[0]],
    },
  };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params; 

  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {service.images?.length > 0 && (
          <ServicesGallery
            images={service.images}
            title={service.title}
          />
        )}

        <h1 className="text-3xl md:text-4xl font-bold mt-14 mb-3">
          {service.title}
        </h1>

        <p className="text-blue-600 font-medium mb-6">
          {service.subtitle}
        </p>

        <p className="text-gray-700 leading-relaxed text-lg max-w-4xl">
          {service.description}
        </p>

      </div>
    </section>
  );
}
