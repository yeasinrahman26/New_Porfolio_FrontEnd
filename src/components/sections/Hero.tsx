"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Stat } from "@/types";

const stats: Stat[] = [
  { value: "1+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "5+", label: "Happy Clients" },
];

const codeLines = [
  { text: "const dev = new Developer();", highlight: false },
  { text: "dev.skills = ['React', 'Next.js'];", highlight: false },
  { text: "await dev.build(greatProducts);", highlight: false },
  { text: "return dev.passion; // ∞", highlight: true },
  { text: "// ✓ Compiled successfully", highlight: true },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-400, 400], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-start pt-16 px-6 bg-[#0a0a0a] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute w-125 h-125 bg-accent/10 blur-[140px] rounded-full -top-37.5 -left-37.5" />
      <div className="absolute w-100 h-100 bg-accent2/10 blur-[140px] rounded-full -bottom-30 -right-30" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start justify-between w-full">
        {/* LEFT SIDE - Content */}
        <div className="flex flex-col items-start justify-start text-left z-10 w-full">
          {/* Badge */}
          <motion.div className="flex items-center gap-2 bg-accent3/10 border border-accent3/30 rounded-full px-4 py-2 mb-6 max-w-full">
            <span className="w-2 h-2 bg-accent3 rounded-full animate-pulse" />
            <span className="text-accent3 text-xs sm:text-sm font-medium tracking-wide">
              AVAILABLE FOR FREELANCE & FULL-TIME
            </span>
          </motion.div>

          {/* Heading (FIXED RESPONSIVE) */}
          <motion.h1 className="font-syne text-4xl md:text-[82px] sm:text-6xl font-extrabold leading-[0.95] tracking-[-2px] sm:tracking-[-4px] mb-6 wrap-break-word">
            MERN-Stack
            <br />
            <span className="bg-linear-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
              Developer
            </span>
            <br />& Designer
          </motion.h1>

          {/* Subtitle (FIXED WIDTH) */}
          <motion.p className="text-muted text-base sm:text-lg md:text-xl max-w-full sm:max-w-md mb-8 leading-relaxed font-light">
            I build exceptional digital experiences with clean architecture,
            beautiful interfaces, and attention to detail.
          </motion.p>

          {/* Buttons (STACK ON MOBILE) */}
          <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#projects"
              className="text-center bg-linear-to-r from-accent to-accent2 text-white font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-2xl transition hover:scale-105"
            >
              Explore My Work
            </a>

            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Md Yeasin Rahman Safa Frontend Developer .pdf";
                link.download =
                  "Md Yeasin Rahman Safa - Frontend Developer.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="text-center border border-gray-600 hover:border-white/5 text-text font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-2xl hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
               Download CV
            </button>
          </motion.div>

          {/* Stats (FIXED WRAP) */}
          <div className="flex flex-wrap gap-6 sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-syne text-2xl sm:text-4xl font-bold bg-linear-to-r from-accent to-accent2 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - Code Editor with Orbital Animation */}
        <motion.div
          ref={containerRef}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          className="hidden lg:flex justify-center items-center h-130 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Orbital Background Container */}
          <div className="relative w-120 h-120">
            {/* Background glow orbs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-96 h-96 bg-linear-to-r from-accent/5 via-accent2/5 to-accent3/5 rounded-full blur-3xl" />
            </div>

            {/* Orbital Rings */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 480 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Large orbit ring */}
              <motion.circle
                cx="240"
                cy="240"
                r="180"
                stroke="url(#gradientOuter)"
                strokeWidth="1"
                opacity="0.4"
                animate={{ rotateZ: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: "240px 240px",
                }}
              />

              {/* Medium orbit ring */}
              <motion.circle
                cx="240"
                cy="240"
                r="120"
                stroke="url(#gradientMid)"
                strokeWidth="1"
                opacity="0.3"
                animate={{ rotateZ: -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: "240px 240px",
                }}
              />

              {/* Inner orbit ring */}
              <motion.circle
                cx="240"
                cy="240"
                r="60"
                stroke="url(#gradientInner)"
                strokeWidth="1"
                opacity="0.2"
                animate={{ rotateZ: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: "240px 240px",
                }}
              />

              <defs>
                <linearGradient
                  id="gradientOuter"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient
                  id="gradientMid"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6cfccc" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient
                  id="gradientInner"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6cfccc" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Orbital Nodes */}
            {[0, 90, 180, 270].map((angle, idx) => (
              <motion.div
                key={`orbit-${idx}`}
                className="absolute w-2.5 h-2.5 rounded-full bg-accent3 shadow-[0_0_12px_#6cfccc]"
                style={{
                  left: "50%",
                  top: "50%",
                  x: `-5px`,
                  y: `-5px`,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  style={{
                    x: Math.cos((angle * Math.PI) / 180) * 180,
                    y: Math.sin((angle * Math.PI) / 180) * 180,
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: idx * 0.15,
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-accent3 shadow-[0_0_12px_#6cfccc]"
                />
              </motion.div>
            ))}

            {/* Center Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full border border-accent/40 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full border border-accent2/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="w-4 h-4 bg-linear-to-br from-accent to-accent2 rounded-full shadow-[0_0_24px_#a78bfa]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Code Editor Window - Floating in center */}
            <motion.div
              className="absolute left-3/4 top-3/5 -translate-x-1/2 -translate-y-1/2 w-80 bg-linear-to-br from-slate-950 to-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-20"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-5 py-3 bg-linear-to-r from-slate-900/80 to-black/80 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  ~/Yeasin-Rahman-safa/index.ts
                </span>
              </div>

              {/* Code Content */}
              <div className="px-5 py-4  bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[24px_24px] overflow-hidden">
                <div className="font-mono text-sm leading-6 space-y-1">
                  {codeLines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.5, duration: 0.4 }}
                    >
                      <span className="text-slate-500 w-6 text-right select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          line.highlight
                            ? "text-emerald-400/90"
                            : "text-slate-200"
                        }
                      >
                        {line.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mouse-following glow ring */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-accent/15 pointer-events-none"
              style={{
                x: useTransform(mouseX, (x) => x * 0.1),
                y: useTransform(mouseY, (y) => y * 0.1),
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
