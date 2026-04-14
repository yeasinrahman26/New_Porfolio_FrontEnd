"use client";

import { useGetMeQuery } from "@/lib/services/authApi";
import { useGetAdminProjectsQuery } from "@/lib/services/projectApi";
import { useGetAdminSkillsQuery } from "@/lib/services/skillApi";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: meData } = useGetMeQuery(undefined);
  const { data: projects } = useGetAdminProjectsQuery();
  const { data: skills } = useGetAdminSkillsQuery();

  const publishedCount =
    projects?.filter((p) => p.status === "published").length || 0;
  const draftCount = projects?.filter((p) => p.status === "draft").length || 0;

  const stats = [
    {
      label: "Total Projects",
      value: projects?.length || 0,
      icon: "🗂️",
      color: "from-accent/20 to-accent2/20",
      borderColor: "border-accent/20",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: "✅",
      color: "from-green-400/20 to-emerald-400/20",
      borderColor: "border-green-400/20",
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: "📝",
      color: "from-yellow-400/20 to-orange-400/20",
      borderColor: "border-yellow-400/20",
    },
    {
      label: "Total Skills",
      value: skills?.length || 0,
      icon: "⚡",
      color: "from-pink-400/20 to-purple-400/20",
      borderColor: "border-pink-400/20",
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text tracking-[-1px] mb-2">
          Welcome back 👋
        </h1>
        <p className="text-muted text-sm">
          Logged in as{" "}
          <span className="text-accent">{meData?.admin?.email}</span>
          {meData?.admin?.last_login && (
            <>
              {" "}
              · Last login:{" "}
              {new Date(meData.admin.last_login).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          )}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1`}
          >
            <div className="text-2xl mb-3">{stat.icon}</div>
            <p className="text-3xl font-bold text-text mb-1">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-text tracking-[-0.5px] mb-5">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/projects?new=true"
            className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-200"
          >
            <span className="text-2xl">➕</span>
            <div>
              <p className="text-sm font-medium text-text">New Project</p>
              <p className="text-xs text-muted">Add a new project</p>
            </div>
          </Link>

          <Link
            href="/admin/skills"
            className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-200"
          >
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-medium text-text">Manage Skills</p>
              <p className="text-xs text-muted">Add or edit skills</p>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-200"
          >
            <span className="text-2xl">🌐</span>
            <div>
              <p className="text-sm font-medium text-text">View Site</p>
              <p className="text-xs text-muted">Open portfolio in new tab</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-text tracking-[-0.5px]">
            Recent Projects
          </h2>
          <Link
            href="/admin/projects"
            className="text-sm text-accent hover:opacity-80 transition"
          >
            View all →
          </Link>
        </div>

        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          {projects && projects.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                    Project
                  </th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((project) => (
                  <tr
                    key={project._id}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{project.emoji || "📁"}</span>
                        <div>
                          <p className="text-sm font-medium text-text">
                            {project.title}
                          </p>
                          <p className="text-xs text-muted truncate max-w-[300px]">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === "published"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted text-sm">No projects yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
