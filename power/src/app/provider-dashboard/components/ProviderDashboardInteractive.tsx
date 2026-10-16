// src/app/provider-dashboard/components/ProviderDashboardInteractive.tsx

"use client";

import React, { useState, useEffect } from "react";
import DashboardStats from "./DashboardStats";
import LeadManagement from "./LeadManagement";
import EarningsOverview from "./EarningsOverview";
import AvailabilityCalendar from "./AvailabilityCalendar";
import ProfileProgress from "./ProfileProgress";
import NotificationCenter from "./NotificationCenter";
import ProviderProfile from "./ProviderProfile";
import ProviderAddCategory from "./provideraddcategory";
import ProviderAddCard from "./ProviderAddCard";   // ⭐ NEW IMPORT
import Icon from "@/components/ui/AppIcon";

interface ProviderDashboardInteractiveProps {
  className?: string;
}

const ProviderDashboardInteractive = ({ className = "" }: ProviderDashboardInteractiveProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background p-10 animate-pulse">
        <div className="h-8 w-1/3 bg-gray-300 rounded"></div>
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // ⭐ TABS LIST
  const tabs = [
    { id: "overview", name: "Overview", icon: "ChartBarIcon" },
    { id: "leads", name: "Leads", icon: "BriefcaseIcon" },
    { id: "earnings", name: "Earnings", icon: "CurrencyDollarIcon" },
    { id: "calendar", name: "Calendar", icon: "CalendarIcon" },
    { id: "profileprogress", name: "Profile Progress", icon: "UserIcon" },
    { id: "profiledetails", name: "Profile Details", icon: "UserCircleIcon" },
    { id: "addcategory", name: "Add Category", icon: "SquaresPlusIcon" },
    
    // ⭐ NEW TAB: Provider Card
    { id: "providercard", name: "Provider Card", icon: "IdentificationIcon" },

    { id: "notifications", name: "Notifications", icon: "BellIcon" },
  ];

  // ⭐ TAB CONTENT
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LeadManagement />
              <div className="space-y-8">
                <ProfileProgress />
                <NotificationCenter />
              </div>
            </div>
          </div>
        );

      case "leads":
        return <LeadManagement />;

      case "earnings":
        return <EarningsOverview />;

      case "calendar":
        return <AvailabilityCalendar />;

      case "profileprogress":
        return <ProfileProgress />;

      case "profiledetails":
        return <ProviderProfile />;

      case "addcategory":
        return <ProviderAddCategory />;

      // ⭐ New TAB RENDER
      case "providercard":
        return <ProviderAddCard />;

      case "notifications":
        return <NotificationCenter />;

      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Provider Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your business, customers, services & earnings
          </p>
        </div>

        {/* ⭐ TABS */}
        <div className="mb-8 border-b">
          <nav className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-black"
                  }
                `}
              >
                <Icon name={tab.icon as any} size={16} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* CONTENT */}
        <div className="animate-fade-in">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProviderDashboardInteractive;