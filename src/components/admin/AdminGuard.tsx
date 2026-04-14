"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/lib/services/authApi";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetMeQuery(undefined);

  useEffect(() => {
    if (!isLoading && (isError || !data?.success)) {
      router.push("/login");
    }
  }, [isLoading, isError, data, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.success) {
    return null;
  }

  return <>{children}</>;
}
