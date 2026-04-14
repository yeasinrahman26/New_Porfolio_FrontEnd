"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { Project } from "@/types";

const allTags = [
  "All",
  "Next.js",
  "React",
  "Node.js",
  "MongoDB",
  "TypeScript",
  "Stripe",
  "OpenAI",
];

interface ProjectsPageClientProps {
  projects: Project[];
}

export default function ProjectsPageClient({
  projects,
}: ProjectsPageClientProps) {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <main className="bg-bg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 pt-40 pb-24">
        <div className="absolute w-[500px] h-[500px] bg-accent/10 blur-[90px] rounded-full -top-[150px] left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] bg-pink-400/10 blur-[80px] rounded-full -bottom-[80px] right-[10%] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs font-medium tracking-[0.14em] uppercase mb-5 text-accent">
            My Work
          </p>

          <h1 className="font-head font-extrabold leading-none tracking-[-3px] mb-6 text-text text-[clamp(48px,6vw,80px)]">
            All{" "}
            <span className="bg-gradient-to-br from-accent to-accent2 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-lg font-light max-w-xl mx-auto leading-relaxed text-muted">
            Every project is built from scratch — real problems, real solutions,
            deployed and production-ready.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  active === tag
                    ? "bg-gradient-to-br from-accent to-accent2 text-white scale-105"
                    : "bg-surface border border-border text-muted hover:text-text"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-sm mb-8 text-muted">
            Showing{" "}
            <span className="text-accent font-medium">{filtered.length}</span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && ` tagged with "${active}"`}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`block ${project.featured ? "md:col-span-2" : ""}`}
                >
                  <ProjectCard project={project} index={i} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-light text-muted">
                No projects found for &quot;{active}&quot;
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 pt-16 pb-32">
        <p className="text-base font-light mb-6 text-muted">
          Have a project in mind?
        </p>

        <Link
          href="/#contact"
          className="inline-block px-10 py-4 rounded-full text-white font-medium text-base transition-all duration-150 hover:opacity-90 hover:scale-[1.03] bg-gradient-to-br from-accent to-accent2"
        >
          Let&apos;s Work Together ↗
        </Link>
      </section>
    </main>
  );
}
