import { ApiProject, ApiSkill, Project, Skill } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ========================
// MAPPERS — API → Frontend
// ========================

function mapProject(p: ApiProject): Project {
  return {
    id: p._id,
    title: p.title,
    description: p.description,
    overviewBody: p.overview_body,
    tags: p.tags,
    gradient: p.gradient,
    emoji: p.emoji,
    images: p.images.sort((a, b) => a.order - b.order),
    liveUrl: p.live_url,
    githubUrl: p.github_url,
    featured: p.featured,
    status: p.status,
    orderIndex: p.order_index,
    features: p.features,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

function mapSkill(s: ApiSkill): Skill {
  return {
    id: s._id,
    name: s.name,
    iconName: s.icon_name,
    color: s.color,
    percentage: s.percentage,
    category: s.category,
    orderIndex: s.order_index,
  };
}

// ========================
// FETCH FUNCTIONS
// ========================

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API}/projects`, {
      next: { revalidate: 60 }, // cache for 60 seconds
    });

    if (!res.ok) throw new Error("Failed to fetch projects");

    const json = await res.json();
    return json.data.map(mapProject);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API}/projects/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return mapProject(json.data);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API}/skills`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch skills");

    const json = await res.json();
    return json.data.map(mapSkill);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}
