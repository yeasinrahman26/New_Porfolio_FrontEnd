/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useGetAdminProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "@/lib/services/projectApi";
import ProjectForm from "@/components/admin/ProjectForm";
import { ApiProject } from "@/types";

export default function AdminProjectsPage() {
  const searchParams = useSearchParams();
  // Initialize directly from searchParams — no useEffect needed
  const [showForm, setShowForm] = useState(
    () => searchParams.get("new") === "true",
  );
  const [editing, setEditing] = useState<ApiProject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: projects, isLoading } = useGetAdminProjectsQuery();
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation();

  const handleCreate = async (data: Record<string, any>) => {
    try {
      await createProject(data).unwrap();
      setShowForm(false);
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleUpdate = async (data: Record<string, any>) => {
    if (!editing) return;
    try {
      await updateProject({ id: editing._id, ...data }).unwrap();
      setEditing(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id).unwrap();
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
          Create New Project
        </h1>
        <ProjectForm
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
          Edit: {editing.title}
        </h1>
        <ProjectForm
          project={editing}
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
            Projects
          </h1>
          <p className="text-sm text-muted mt-1">
            {projects?.length || 0} total projects
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent to-accent2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          + New Project
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Projects List */}
      {projects && (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-accent/20 transition-all"
            >
              {/* Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <span className="text-2xl">{project.emoji || "📁"}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-text truncate">
                      {project.title}
                    </h3>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                        project.status === "published"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-yellow-400/10 text-yellow-400"
                      }`}
                    >
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent">
                        featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted truncate mt-0.5">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-1.5">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-muted bg-white/5 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags?.length > 3 && (
                      <span className="text-[10px] text-muted">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditing(project)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-accent bg-accent/10 hover:bg-accent/20 transition"
                >
                  Edit
                </button>

                {deleteConfirm === project._id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deleting}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {deleting ? "..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-muted hover:text-text transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(project._id)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-20 bg-surface border border-border rounded-2xl">
              <div className="text-4xl mb-3">📁</div>
              <p className="text-muted text-sm mb-4">No projects yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-sm text-accent hover:opacity-80 transition"
              >
                Create your first project →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
