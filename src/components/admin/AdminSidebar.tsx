"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogoutMutation, useGetMeQuery } from "@/lib/services/authApi";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Projects", href: "/admin/projects", icon: "🗂️" },
  { label: "Skills", href: "/admin/skills", icon: "⚡" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data: meData } = useGetMeQuery(undefined);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin">
          <h1 className="text-xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted hover:text-text hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        {/* View Site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-text hover:bg-white/5 transition-all duration-200"
        >
          <span className="text-lg">🌐</span>
          View Site ↗
        </Link>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-border">
        <div className="px-4 py-2 mb-2">
          <p className="text-xs text-muted">Logged in as</p>
          <p className="text-sm text-text font-medium truncate">
            {meData?.admin?.email || "Admin"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
