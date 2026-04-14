"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import profile from "../../../public/about2.png";

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "RTK Query",
  "Vercel",
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-bg2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid  lg:grid-cols-2 gap-16 items-center">
          {/* Image (LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-4/5 bg-surface rounded-3xl overflow-hidden relative border border-border">
              {/* Actual Image */}
              <Image
                src={profile}
                alt="About image"
                fill
                className="object-cover"
                priority
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-bg2 via-transparent to-transparent" />
              {/* <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-accent2/10 to-accent3/10" /> */}

              {/* Floating badge */}
              <div className="absolute bottom-6 right-5 bg-surface/90 backdrop-blur-md border border-border rounded-2xl px-5 py-3">
                <div className="font-syne text-3xl font-extrabold text-accent">
                  1+
                </div>
                <div className="text-muted text-xs">Years of Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Content (RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-sm font-semibold tracking-[3px] uppercase">
              About Me
            </span>

            <h2 className="font-syne text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-text leading-tight">
              Turning Ideas
              <br />
              <span className="gradient-text">into Interactive Reality</span>
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              I’m a passionate frontend-focused MERN stack developer with less
              than a year of experience building modern web applications. Coming
              from a Bachelor’s in Business Administration, my shift into tech
              started as a hobby but quickly became a real passion. I enjoy
              solving problems and have built strong skills in React, Tailwind
              CSS, responsive design, and smooth user interfaces.
            </p>

            <p className="text-muted leading-relaxed mb-8">
              Currently, I’m focusing on backend development with Node.js,
              Express, and MongoDB, while also learning deployment and Linux. My
              goal is to become a DevOps engineer in the next two years. I love
              the creative side of coding and, in my free time, enjoy online
              games, sci-fi books, and exploring space
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-4 py-2 bg-white/5 border border-border rounded-full text-muted hover:text-text hover:border-accent/30 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
