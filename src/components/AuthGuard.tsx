"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/** Pages reachable without signing in. */
const PUBLIC_PATHS = ["/", "/Login"];

/**
 * Redirects signed-out users to /Login and signed-in Super Admins away from it.
 * Protected pages render nothing until the auth state is known, so no admin
 * content flashes for signed-out visitors.
 * (Data access is enforced separately by Firestore / Storage security rules.)
 */
export default function AuthGuard({ children }: { children: ReactNode }) {
  const { admin, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (loading) return;
    if (!admin && !isPublic) router.replace("/Login");
    if (admin && isPublic) router.replace("/Dashboard");
  }, [admin, loading, isPublic, router]);

  if (isPublic) return <>{children}</>;
  if (loading || !admin) return null;
  return <>{children}</>;
}
