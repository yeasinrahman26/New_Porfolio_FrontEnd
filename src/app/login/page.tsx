"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useGetMeQuery } from "@/lib/services/authApi";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const { data: meData, isLoading: checkingAuth } = useGetMeQuery(undefined);

  // If already logged in, redirect to admin
  useEffect(() => {
    if (!checkingAuth && meData?.success) {
      router.push("/admin");
    }
  }, [checkingAuth, meData, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login({ email, password }).unwrap();
      if (result.success) {
        router.push("/admin");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.message || "Login failed. Please try again.");
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      {/* Background glow */}
      <div className="absolute w-[400px] h-[400px] bg-accent/8 blur-[100px] rounded-full top-1/4 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent mb-3">
            Admin Login
          </h1>
          <p className="text-muted text-sm">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-2xl p-8 space-y-6"
        >
          {/* Error */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@portfolio.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl text-white font-medium text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 bg-gradient-to-r from-accent to-accent2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Back to site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
