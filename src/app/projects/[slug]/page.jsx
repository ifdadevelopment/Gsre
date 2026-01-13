import { projects } from "@/data/services";
import { notFound } from "next/navigation";
import ProjectGallery from "./ProjectGallery";


export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}


export async function generateMetadata({ params }) {
  const { slug } = await params; 

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | GS Refrigeration Enterprises",
      description: "The requested project could not be found.",
      robots: "noindex",
    };
  }

  return {
    metadataBase: new URL("https://www.gsrefrigeration.com"),
    title: `${project.name} Project | GS Refrigeration Enterprises`,
    description: project.description,

    alternates: {
      canonical: `/projects/${project.slug}`,
    },

    openGraph: {
      title: `${project.name} | GS Refrigeration Enterprises`,
      description: project.description,
      type: "website",
      images: project.images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: project.name,
      })),
    },

    twitter: {
      card: "summary_large_image",
      title: `${project.name} | GS Refrigeration Enterprises`,
      description: project.description,
      images: [project.images[0]],
    },
  };
}


export default async function ProjectDetail({ params }) {
  const { slug } = await params; 

  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <ProjectGallery
          images={project.images}
          title={project.name}
        />

        <h1 className="text-4xl font-bold mt-12 mb-2">
          {project.name}
        </h1>

        <p className="text-blue-600 font-medium mb-4">
          {project.city}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 text-gray-700 mb-6">
          <p><strong>Area:</strong> {project.area}</p>
          <p><strong>System:</strong> {project.systemType}</p>
          <p><strong>Year:</strong> {project.year}</p>
          <p><strong>Status:</strong> {project.status}</p>
        </div>

        <p className="text-gray-700 leading-relaxed max-w-4xl">
          {project.description}
        </p>

      </div>
    </section>
  );
}
