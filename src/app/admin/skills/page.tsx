/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  useGetAdminSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "@/lib/services/skillApi";
import SkillForm from "@/components/admin/SkillForm";
import { iconMap } from "@/lib/iconMap";
import { ApiSkill } from "@/types";

const categoryOrder = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
];
const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  Tools: "🛠️",
  Deployment: "🚀",
};

export default function AdminSkillsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ApiSkill | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: skills, isLoading } = useGetAdminSkillsQuery();
  const [createSkill, { isLoading: creating }] = useCreateSkillMutation();
  const [updateSkill, { isLoading: updating }] = useUpdateSkillMutation();
  const [deleteSkill, { isLoading: deleting }] = useDeleteSkillMutation();

  // Group skills by category
  const grouped = categoryOrder.reduce<Record<string, ApiSkill[]>>(
    (acc, cat) => {
      acc[cat] = skills?.filter((s) => s.category === cat) || [];
      return acc;
    },
    {},
  );

  const handleCreate = async (data: Record<string, any>) => {
    try {
      await createSkill(data).unwrap();
      setShowForm(false);
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleUpdate = async (data: Record<string, any>) => {
    if (!editing) return;
    try {
      await updateSkill({ id: editing._id, ...data }).unwrap();
      setEditing(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill(id).unwrap();
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Show form
  if (showForm) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-text tracking-[-1px] mb-8">
          Add New Skill
        </h1>
        <SkillForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isLoading={creating}
        />
      </div>
    );
  }

  // Show edit form
  if (editing) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-text tracking-[-1px] mb-8">
          Edit: {editing.name}
        </h1>
        <SkillForm
          skill={editing}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(null)}
          isLoading={updating}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text tracking-[-1px]">
            Skills
          </h1>
          <p className="text-sm text-muted mt-1">
            {skills?.length || 0} total skills across {categoryOrder.length}{" "}
            categories
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent to-accent2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          + New Skill
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Skills by Category */}
      {skills && (
        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const catSkills = grouped[cat];
            if (!catSkills || catSkills.length === 0) return null;

            return (
              <div key={cat}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg">{categoryIcons[cat]}</span>
                  <h2 className="text-base font-bold text-text">{cat}</h2>
                  <div className="flex-1 h-[1px] bg-border ml-2" />
                  <span className="text-xs text-muted">{catSkills.length}</span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catSkills.map((skill) => {
                    const Icon = iconMap[skill.icon_name];

                    return (
                      <div
                        key={skill._id}
                        className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between gap-3 hover:border-accent/20 transition-all"
                      >
                        {/* Skill Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="text-xl shrink-0"
                            style={{
                              filter: `drop-shadow(0 0 4px ${skill.color}40)`,
                            }}
                          >
                            {Icon ? (
                              <Icon style={{ color: skill.color }} />
                            ) : (
                              <span style={{ color: skill.color }}>⚡</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text truncate">
                              {skill.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
                                  style={{
                                    width: `${skill.percentage}%`,
                                  }}
                                />
                              </div>
                              <span className="text-[10px] text-muted">
                                {skill.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditing(skill)}
                            className="p-2 rounded-lg text-xs text-accent hover:bg-accent/10 transition"
                            title="Edit"
                          >
                            ✏️
                          </button>

                          {deleteConfirm === skill._id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(skill._id)}
                                disabled={deleting}
                                className="p-2 rounded-lg text-xs text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
                                title="Confirm delete"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-2 rounded-lg text-xs text-muted hover:text-text transition"
                                title="Cancel"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(skill._id)}
                              className="p-2 rounded-lg text-xs text-red-400 hover:bg-red-400/10 transition"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
