"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";

export default function RoleGuard({
  allowed,
  children
}: {
  allowed: Array<"admin" | "user">;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isHydrated, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isHydrated) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user && !allowed.includes(user.role)) {
        router.replace("/movies");
      }
    }
  }, [user, allowed, router, isHydrated, isAuthenticated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowed.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
