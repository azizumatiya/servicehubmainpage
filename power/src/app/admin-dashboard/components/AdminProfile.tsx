"use client";

import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

export default function AdminProfile() {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (adminUser) {
      setAdmin(JSON.parse(adminUser));
    }
  }, []);

  if (!admin) {
    return (
      <div className="p-6 bg-card rounded-lg border border-border shadow">
        Loading admin profile...
      </div>
    );
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-card">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon name="UserIcon" size={20} /> Admin Profile
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-secondary">Full Name</p>
          <p className="text-lg font-medium">{admin.fullName}</p>
        </div>

        <div>
          <p className="text-sm text-text-secondary">Email</p>
          <p className="text-lg font-medium">{admin.email}</p>
        </div>

        <div>
          <p className="text-sm text-text-secondary">Role</p>
          <p className="text-lg font-medium capitalize">{admin.role}</p>
        </div>

        <div className="pt-4">
          <button
            onClick={() => {
              localStorage.removeItem("adminUser");
              window.location.href = "/login";
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
