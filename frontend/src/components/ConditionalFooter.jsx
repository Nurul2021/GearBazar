"use client";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isPublicRoute =
    !pathname?.startsWith("/admin") && !pathname?.startsWith("/dashboard");

  if (!isPublicRoute) return null;
  return <Footer />;
}
