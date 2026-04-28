import { Project } from "@/types";

const TAG_COLORS = [
  { bg: "rgba(108,252,204,0.1)", color: "#6cfccc" }, // Green/Teal
  { bg: "rgba(124,108,252,0.1)", color: "#7c6cfc" }, // Purple
  { bg: "rgba(252,108,156,0.1)", color: "#fc6c9c" }, // Pink
  { bg: "rgba(252,196,108,0.1)", color: "#fcc46c" }, // Orange/Amber
  { bg: "rgba(108,180,252,0.1)", color: "#6cb4fc" }, // Blue
];

const tagColor = (
  tag: string,
  index: number,
): { bg: string; color: string } => {
  return TAG_COLORS[index % TAG_COLORS.length];
};
const gradients = [
  "bg-gradient-to-br from-[#1a103a] to-[#2d1445]",
  "bg-gradient-to-br from-[#0a2420] to-[#0f3832]",
  "bg-gradient-to-br from-[#2a1020] to-[#3a1535]",
  "bg-gradient-to-br from-[#0f1a2a] to-[#1a2a3a]",
];

const emojis = ["🛒", "✅", "🤖", "📊", "📝", "💬", "🚀"];

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const gradient = project.gradient ?? gradients[index % gradients.length];
  const emoji = project.emoji ?? emojis[index % emojis.length];

  // Check if gradient is a CSS value (from API) or a Tailwind class (fallback)
  const isCSS = gradient.startsWith("linear-gradient");

  return (
    <div
      className="
        group flex flex-col h-full rounded-xl overflow-hidden
        bg-surface border border-border
        transition-all duration-300
        hover:-translate-y-2 hover:border-accent/40
        hover:shadow-[0_28px_70px_rgba(0,0,0,0.55)]
      "
    >
      {/* Thumbnail */}
      <div
        className={`h-72 flex items-center justify-center relative overflow-hidden ${
          !isCSS ? gradient : ""
        }`}
        style={isCSS ? { background: gradient } : undefined}
      >
        {/* Show first image if available, otherwise show emoji */}
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0].url}
            alt={project.images[0].alt || project.title}
            className="w-full h-full object-cover   relative z-10"
          />
        ) : (
          <span className="relative z-10 text-5xl">{emoji}</span>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
      </div>

      {/* Body */}
      <div className="p-6 flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 5).map((tag, index) => (
            <span
              key={tag}
              className="pr-3 py-1 rounded-full text-[11px] font-medium tracking-wide"
              style={tagColor(tag, index)}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-head font-bold text-xl tracking-[-0.5px] mb-2 text-text">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed font-light text-muted">
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-border">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:opacity-80 transition"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo ↗
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent hover:opacity-80 transition"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}
