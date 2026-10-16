"use client";

import React, { useEffect, useState } from "react";
import AppImage from "@/components/ui/AppImage";

interface CustomerType {
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

const WelcomeSection = () => {
  const [user, setUser] = useState<CustomerType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load customer from localStorage
  useEffect(() => {
    const loadUser = () => {
      try {
        const data = localStorage.getItem("customerUser");
        if (!data) {
          setUser(null);
          return;
        }

        const parsed = JSON.parse(data);
        setUser(parsed);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Listen for updates (Profile update)
    const handler = () => loadUser();
    window.addEventListener("storage", handler);

    return () => window.removeEventListener("storage", handler);
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white rounded-xl mb-8">
      <div className="flex flex-col lg:flex-row justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border">
            <AppImage
              src={
                user.profileImage?.length
                  ? user.profileImage
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.fullName
                    )}`
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user.fullName}
            </h1>

            <p>📩 {user.email}</p>
            {user.phone && <p>📞 {user.phone}</p>}
          </div>
        </div>

        {/* RIGHT — Stats */}
        <div className="flex gap-6 mt-6 lg:mt-0">
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div>Total Bookings</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">3</div>
            <div>Active Services</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">5</div>
            <div>Favorite Providers</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeSection;
