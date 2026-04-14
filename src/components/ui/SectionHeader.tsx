"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span className="text-accent text-sm font-semibold tracking-[3px] uppercase">
        {label}
      </span>
      <h2 className="font-syne font-extrabold text-3xl md:text-5xl font-800 mt-4 mb-4 text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}
