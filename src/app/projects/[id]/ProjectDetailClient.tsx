"use client";

import Link from "next/link";
import { Project } from "@/types";

const TAG_COLORS = [
  { bg: "rgba(108,252,204,0.1)", color: "#6cfccc" }, // Green/Teal
  { bg: "rgba(124,108,252,0.1)", color: "#7c6cfc" }, // Purple
  { bg: "rgba(252,108,156,0.1)", color: "#fc6c9c" }, // Pink
  
  
];

const tagColor = (
  tag: string,
  index: number,
): { bg: string; color: string } => {
  return TAG_COLORS[index % TAG_COLORS.length];
};

const gradients = [
  "linear-gradient(135deg, #1a103a, #2d1445)",
  "linear-gradient(135deg, #0a2420, #0f3832)",
  "linear-gradient(135deg, #2a1020, #3a1535)",
  "linear-gradient(135deg, #0f1a2a, #1a2a3a)",
];
const emojis = ["🛒", "✅", "🤖", "📊", "📝", "💬", "🚀"];

interface ProjectDetailClientProps {
  project: Project;
  related: Project[];
}

export default function ProjectDetailClient({
  project,
  related,
}: ProjectDetailClientProps) {
  const gradient = project.gradient ?? gradients[0];
  const emoji = project.emoji ?? emojis[0];

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "50px 60px 80px" }}
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: "rgba(124,108,252,0.12)",
            filter: "blur(100px)",
            top: -100,
            right: -100,
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            ← Back to Projects
          </Link>

          {/* <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                style={tagColor(tag, index)}
              >
                {tag}
              </span>
            ))}
          </div> */}

          <h1
            className="font-head font-extrabold leading-none tracking-[-3px] mb-6"
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              color: "var(--text)",
            }}
          >
            {project.title}
          </h1>

          <p
            className="text-lg font-light leading-relaxed max-w-2xl mb-10"
            style={{ color: "var(--muted)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border hover:text-[#FC6C9C] border-accent/50 items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium text-base transition-all duration-150 hover:opacity-90 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent2))",
                }}
              >
                <span className=" "> Live Demo ↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex  items-center gap-2 px-8 py-3.5 rounded-full text-base font-normal transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span className=" hover:text-accent">View on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Thumbnail / Image Slider */}
      <section style={{ padding: "0 60px 80px" }}>
        <div className="max-w-4xl mx-auto">
          {project.images && project.images.length > 0 ? (
            <ImageSlider images={project.images} title={project.title} />
          ) : (
            <div
              className="w-full rounded-2xl flex items-center 
              justify-center relative overflow-hidden"
              style={{
                height: 400,
                background: gradient,
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: 100, position: "relative", zIndex: 1 }}>
                {emoji}
              </span>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Details */}
      <section style={{ padding: "0 60px 80px" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div>
              <h2
                className="font-head font-bold text-2xl tracking-[-1px] mb-4"
                style={{ color: "var(--text)" }}
              >
                Project Overview
              </h2>

              {/* Dynamic overview from API */}
              {project.overviewBody ? (
                project.overviewBody.split("\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-light leading-relaxed mb-4"
                    style={{ color: "var(--muted)" }}
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p
                  className="font-light leading-relaxed mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  {project.description}
                </p>
              )}
            </div>
            <div>
              {/* Key Features — Dynamic from API */}
              {project.features && project.features.length > 0 && (
                <section style={{ padding: "0 " }}>
                  <div className="max-w-4xl  mx-auto">
                    <h2
                      className="font-head font-bold text-2xl tracking-[-1px] my-2"
                      style={{ color: "var(--text)" }}
                    >
                      Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.map((f) => (
                        <div
                          key={f.title}
                          className="rounded-2xl py-6 pl-3 hover:shadow shadow-white/7 transition-all duration-200"
                          style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(124,108,252,0.3)";
                            e.currentTarget.style.transform =
                              "translateY(-3px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <div className="text-2xl mb-3">{f.icon}</div>
                          <h3
                            className="font-head font-bold text-base mb-2"
                            style={{ color: "var(--text)" }}
                          >
                            {f.title}
                          </h3>
                          <p
                            className="text-sm font-light leading-relaxed"
                            style={{ color: "var(--muted)" }}
                          >
                            {f.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-head font-bold text-base mb-4"
                style={{ color: "var(--text)" }}
              >
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 border-[1.5px] rounded-full text-xs font-medium"
                    style={tagColor(tag, index)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-head font-bold text-base mb-4"
                style={{ color: "var(--text)" }}
              >
                Links
              </h3>
              <div className="flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm transition-opacity hover:opacity-100"
                    style={{ color: "var(--accent)" }}
                  >
                    <span className="hover:text-[#FC6C9C]">🌐 Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
                {project.liveUrl && project.githubUrl && (
                  <div style={{ height: 1, background: "var(--border)" }} />
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm transition-opacity   hover:opacity-100"
                    style={{ color: "var(--accent)" }}
                  >
                    <span className="flex gap-2 items-center ">
                      <FaGithub />
                      <span className=" hover:text-accent"> GitHub Repo</span>
                    </span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-head font-bold text-base mb-4"
                style={{ color: "var(--text)" }}
              >
                Status
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "var(--accent3)",
                    animation: "pulse 2s ease infinite",
                  }}
                />
                <span className="text-sm" style={{ color: "var(--accent3)" }}>
                  Live &amp; Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: "40px", background: "var(--bg2)" }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-head font-bold text-2xl tracking-[-1px] mb-8"
              style={{ color: "var(--text)" }}
            >
              Other Projects
            </h2>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-5">
              {related.map((p, i) => {
                const relGradient =
                  p.gradient ?? gradients[i % gradients.length];
                const relEmoji = p.emoji ?? emojis[i % emojis.length];

                return (
                  <Link key={p.id} href={`/projects/${p.id}`}>
                    <div
                      className="rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.borderColor =
                          "rgba(124,108,252,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    >
                      <div
                        className="h-28 flex items-center justify-center text-4xl"
                        style={{ background: relGradient }}
                      >
                        {relEmoji}
                      </div>
                      <div className="p-4">
                        <h3
                          className="font-head font-bold text-base mb-1"
                          style={{ color: "var(--text)" }}
                        >
                          {p.title}
                        </h3>
                        <p
                          className="text-xs font-light leading-relaxed line-clamp-2"
                          style={{ color: "var(--muted)" }}
                        >
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

// ========================
// IMAGE SLIDER COMPONENT
// ========================
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Loader from "@/components/shared/Loader";

function ImageSlider({
  images,
  title,
}: {
  images: { url: string; alt: string; order: number }[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  // const sorted = [...images].sort((a, b) => a.order - b.order);
  const sorted = images;
  return (
    <div className="relative">
      {/* Main Image */}
      <div
        className="w-full rounded-2xl overflow-hidden relative bg-surface"
        style={{
          height: 400,
          border: "1px solid var(--border)",
        }}
      >
        {imgError[current] ? (
          // Fallback if image fails
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a103a] to-[#2d1445]">
            <Loader />
          </div>
        ) : (
          <img
            key={current}
            src={sorted[current].url}
            alt={sorted[current].alt || title}
            className="w-full h-full object-cover"
            onError={() =>
              setImgError((prev) => ({ ...prev, [current]: true }))
            }
          />
        )}
      </div>

      {/* Navigation — only show if multiple images */}
      {sorted.length > 1 && (
        <>
          {/* Arrows */}
          <button
            aria-label="Previous image"
            onClick={() =>
              setCurrent((prev) => (prev === 0 ? sorted.length - 1 : prev - 1))
            }
            className="absolute  left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            ←
          </button>

          <button
            aria-label="Next image"
            onClick={() =>
              setCurrent((prev) => (prev === sorted.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            →
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {sorted.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-gray-700 scale-125"
                    : "bg-white/30 scale-100"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
