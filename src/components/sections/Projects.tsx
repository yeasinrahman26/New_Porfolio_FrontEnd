"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { Project } from "@/types";
import Link from "next/link";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Projects"
          title="Selected Work"
          subtitle="Here are some of my recent projects that showcase my skills and passion for building great web experiences."
        />

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {projects.slice(0, 5).map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`block ${project.featured ? "md:col-span-2" : ""}`}
            >
              <ProjectCard project={project} index={index} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-br from-accent to-accent2 text-white"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
