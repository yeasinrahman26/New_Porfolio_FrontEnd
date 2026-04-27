"use client";

import { Skill } from "@/types";
import { iconMap } from "@/lib/iconMap";
import { motion } from "framer-motion";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = iconMap[skill.iconName];

  return (
    <div
      className="bg-surface border
     border-border rounded-2xl 
     p-6 hover:-translate-y-1 hover:border-accent/20 transition-all 
     duration-400"
    >
      <div className="flex  gap-3  justify-start items-center">
        {/* Icon render */}
        <div
          className="text-3xl mb-4"
          style={{
            filter: `drop-shadow(0 0 6px ${skill.color}40)`,
          }}
        >
          {Icon ? (
            <Icon style={{ color: skill.color }} />
          ) : (
            <span style={{ color: skill.color }}>⚡</span>
          )}
        </div>

        <h3 className="font-syne text-base font-700 text-text mb-4">
          {skill.name}
        </h3>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
        />
      </div>

      {/* <span className="text-xs text-muted">{skill.percentage}%</span> */}
    </div>
  );
}
