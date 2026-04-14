"use client";

import { useState } from "react";
import { ApiProject } from "@/types";

interface ProjectFormProps {
  project?: ApiProject | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const emptyFeature = { icon: "", title: "", description: "" };
const emptyImage = { url: "", alt: "", order: 0 };

function buildInitialForm(project?: ApiProject | null) {
  return {
    title: project?.title || "",
    description: project?.description || "",
    overview_body: project?.overview_body || "",
    tags: project?.tags?.join(", ") || "",
    gradient: project?.gradient || "",
    emoji: project?.emoji || "",
    live_url: project?.live_url || "",
    github_url: project?.github_url || "",
    featured: project?.featured || false,
    status: (project?.status || "draft") as "draft" | "published",
    order_index: project?.order_index || 0,
    features:
      project?.features && project.features.length > 0
        ? project.features
        : [{ ...emptyFeature }],
    images:
      project?.images && project.images.length > 0
        ? project.images
        : [{ ...emptyImage }],
  };
}

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [form, setForm] = useState(() => buildInitialForm(project));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Feature handlers
  const updateFeature = (index: number, field: string, value: string) => {
    const updated = [...form.features];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, { ...emptyFeature }],
    }));
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Image handlers
  const updateImage = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updated = [...form.images];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, images: updated }));
  };

  const addImage = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { ...emptyImage, order: prev.images.length }],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      order_index: Number(form.order_index),
      features: form.features.filter((f) => f.title && f.description),
      images: form.images.filter((img) => img.url),
      gradient: form.gradient || null,
      emoji: form.emoji || null,
      live_url: form.live_url || null,
      github_url: form.github_url || null,
      overview_body: form.overview_body || null,
    };

    onSubmit(data);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-bg border border-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-text mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <h3 className="text-lg font-bold text-text">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Next.js, React, MongoDB"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description for cards and hero section"
            required
            rows={2}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Overview Body</label>
          <textarea
            name="overview_body"
            value={form.overview_body}
            onChange={handleChange}
            placeholder="Detailed project overview for the detail page. Use new lines for paragraphs."
            rows={5}
            className={inputClass}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <h3 className="text-lg font-bold text-text">Appearance</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Emoji</label>
            <input
              name="emoji"
              value={form.emoji}
              onChange={handleChange}
              placeholder="🛒"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Gradient</label>
            <input
              name="gradient"
              value={form.gradient}
              onChange={handleChange}
              placeholder="linear-gradient(135deg, #1a103a, #2d1445)"
              className={inputClass}
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

      {/* Links & Status */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <h3 className="text-lg font-bold text-text">Links & Status</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Live URL</label>
            <input
              name="live_url"
              value={form.live_url}
              onChange={handleChange}
              placeholder="https://example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              placeholder="https://github.com/user/repo"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-8">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              id="featured"
              className="w-4 h-4 rounded accent-accent"
            />
            <label htmlFor="featured" className="text-sm text-text">
              Featured project (gets extra width on homepage)
            </label>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text">Images (Slider)</h3>
          <button
            type="button"
            onClick={addImage}
            className="text-sm text-accent hover:opacity-80 transition"
          >
            + Add Image
          </button>
        </div>

        {form.images.map((img, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_80px_40px] gap-3 items-end"
          >
            <div>
              <label className="block text-xs text-muted mb-1">Image URL</label>
              <input
                value={img.url}
                onChange={(e) => updateImage(index, "url", e.target.value)}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Alt Text</label>
              <input
                value={img.alt}
                onChange={(e) => updateImage(index, "alt", e.target.value)}
                placeholder="Screenshot description"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Order</label>
              <input
                type="number"
                value={img.order}
                onChange={(e) =>
                  updateImage(index, "order", Number(e.target.value))
                }
                className={inputClass}
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="pb-1 text-red-400 hover:text-red-300 transition text-lg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text">Key Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="text-sm text-accent hover:opacity-80 transition"
          >
            + Add Feature
          </button>
        </div>

        {form.features.map((feature, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[60px_1fr_2fr_40px] gap-3 items-end"
          >
            <div>
              <label className="block text-xs text-muted mb-1">Icon</label>
              <input
                value={feature.icon}
                onChange={(e) => updateFeature(index, "icon", e.target.value)}
                placeholder="⚡"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Title</label>
              <input
                value={feature.title}
                onChange={(e) => updateFeature(index, "title", e.target.value)}
                placeholder="Feature title"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">
                Description
              </label>
              <input
                value={feature.description}
                onChange={(e) =>
                  updateFeature(index, "description", e.target.value)
                }
                placeholder="Feature description"
                className={inputClass}
              />
            </div>
            <button
              type="button"
              onClick={() => removeFeature(index)}
              className="pb-1 text-red-400 hover:text-red-300 transition text-lg"
            >
              ✕
            </button>
          </div>
        ))}
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
          {isLoading
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}
