/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ApiSkill } from "@/types";
import { iconMap } from "@/lib/iconMap";

interface SkillFormProps {
  skill?: ApiSkill | null;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const categories = ["Frontend", "Backend", "Database", "Tools", "Deployment"];
const iconNames = Object.keys(iconMap);

function buildInitialForm(skill?: ApiSkill | null) {
  return {
    name: skill?.name || "",
    icon_name: skill?.icon_name || "",
    color: skill?.color || "#FFFFFF",
    percentage: skill?.percentage || 50,
    category: skill?.category || "Frontend",
    order_index: skill?.order_index || 0,
  };
}

export default function SkillForm({
  skill,
  onSubmit,
  onCancel,
  isLoading,
}: SkillFormProps) {
  const [form, setForm] = useState(() => buildInitialForm(skill));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      percentage: Number(form.percentage),
      order_index: Number(form.order_index),
    });
  };

  const SelectedIcon = iconMap[form.icon_name];

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-bg border border-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-text mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        {/* Preview */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-bg border border-border">
          <div
            className="text-3xl"
            style={{ filter: `drop-shadow(0 0 6px ${form.color}40)` }}
          >
            {SelectedIcon ? (
              <SelectedIcon style={{ color: form.color }} />
            ) : (
              <span style={{ color: form.color }}>⚡</span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-text">
              {form.name || "Skill Name"}
            </p>
            <p className="text-xs text-muted">
              {form.category} · {form.percentage}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Skill Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. React"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Icon Name *</label>
          <select
            name="icon_name"
            value={form.icon_name}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select an icon...</option>
            {iconNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted mt-1">
            Can&apos;t find your icon? Add it to{" "}
            <code className="text-accent">lib/iconMap.ts</code> first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
              />
              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="#3178C6"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Percentage ({form.percentage}%)
            </label>
            <input
              type="range"
              name="percentage"
              min="1"
              max="100"
              value={form.percentage}
              onChange={handleChange}
              className="w-full mt-3 accent-accent"
            />
          </div>

          <div>
            <label className={labelClass}>Order Index</label>
            <input
              type="number"
              name="order_index"
              value={form.order_index}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl text-sm font-medium text-muted border border-border hover:text-text hover:border-white/20 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent to-accent2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all"
        >
          {isLoading ? "Saving..." : skill ? "Update Skill" : "Create Skill"}
        </button>
      </div>
    </form>
  );
}
