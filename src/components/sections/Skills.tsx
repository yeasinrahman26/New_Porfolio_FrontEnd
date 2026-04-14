"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillCard from "@/components/ui/SkillCard";
import { Skill } from "@/types";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
] as const;

type Category = (typeof categories)[number];

const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  Tools: "🛠️",
  Deployment: "🚀",
};

// Order categories should appear in "All" view
const categoryOrder = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
];

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [active, setActive] = useState<Category>("All");

  // Group skills by category
  const grouped = categoryOrder.reduce<Record<string, Skill[]>>((acc, cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length > 0) {
      acc[cat] = catSkills;
    }
    return acc;
  }, {});

  // Filtered skills for single category view
  const filtered =
    active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="py-32 bg-bg2">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Skills"
          title="Tools & Technologies"
          subtitle="The technologies and tools I use to bring ideas to life."
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-5 py-2.5 text-sm font-medium transition-colors duration-200"
            >
              {/* Label */}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  active === cat ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                {cat}
              </span>

              {/* Active underline */}
              {active === cat && (
                <motion.div
                  layoutId="skillTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Divider line under tabs */}
        <div className="w-full h-[1px] bg-border -mt-[1px] mb-12" />

        {/* Content */}
        <AnimatePresence mode="wait">
          {active === "All" ? (
            // ========================
            // ALL — Grouped by Category
            // ========================
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-14"
            >
              {categoryOrder.map((cat) => {
                const catSkills = grouped[cat];
                if (!catSkills || catSkills.length === 0) return null;

                return (
                  <div key={cat}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xl">{categoryIcons[cat]}</span>
                      <h3 className="font-head font-bold text-lg tracking-[-0.5px] text-text">
                        {cat}
                      </h3>
                      <div className="flex-1 h-[1px] bg-border ml-2" />
                      <span className="text-xs text-muted">
                        {catSkills.length} skill
                        {catSkills.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {catSkills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.06,
                          }}
                        >
                          <SkillCard skill={skill} index={index} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            // ========================
            // SINGLE CATEGORY
            // ========================
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filtered.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                    }}
                  >
                    <SkillCard skill={skill} index={index} />
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-muted text-sm">
                    No skills found in {active}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total count */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted">
            <span className="text-accent font-medium">{skills.length}</span>{" "}
            technologies and counting
          </p>
        </div>
      </div>
    </section>
  );
}
