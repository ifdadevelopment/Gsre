import { projects } from "@/data/services";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-10">
          Our Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.name}                
              slug={project.slug}
              image={project.image}
              alt={`${project.name} project in ${project.city}`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
