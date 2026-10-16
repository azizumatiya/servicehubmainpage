"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import AdminDashboardInteractive from "./components/AdminDashboardInteractive";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/login");
      return;
    }

    try {
      JSON.parse(adminUser);
      setIsAuthenticated(true);
    } catch (e) {
      localStorage.removeItem("adminUser");
      router.push("/login");
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminDashboardInteractive />
    </div>
  );
}
