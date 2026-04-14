import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/api";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [project, allProjects] = await Promise.all([
    getProject(id),
    getProjects(),
  ]);

  if (!project) notFound();

  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return <ProjectDetailClient project={project} related={related} />;
}
