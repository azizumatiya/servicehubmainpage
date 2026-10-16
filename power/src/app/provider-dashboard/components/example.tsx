"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

interface Provider {
  _id: string;
  fullName: string;
  profileImage: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  isVerified: boolean;
  isOnline: boolean;
  description: string;
  yearsOfExperience: number;
  badges: string[];
  specialties: string[];
  location: {
    city: string;
    state: string;
    district: string;
    taluka: string;
    area: string;
    latitude: number;
    longitude: number;
  };
}

export default function ExampleProviderSelect({ onNext, onBack }: any) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState("");

  const [locationSearch, setLocationSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [talukaFilter, setTalukaFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  // FETCH PROVIDERS FROM API
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/providers");
      const data = await res.json();
      if (data.success) {
        setProviders(data.providers);
        setFilteredProviders(data.providers);
      }
    }
    load();
  }, []);

  // FILTER HANDLER
  useEffect(() => {
    let result = [...providers];

    if (stateFilter)
      result = result.filter(
        (p) => p.location?.state?.toLowerCase() === stateFilter.toLowerCase()
      );

    if (districtFilter)
      result = result.filter(
        (p) =>
          p.location?.district?.toLowerCase() ===
          districtFilter.toLowerCase()
      );

    if (talukaFilter)
      result = result.filter(
        (p) =>
          p.location?.taluka?.toLowerCase() === talukaFilter.toLowerCase()
      );

    if (areaFilter)
      result = result.filter(
        (p) => p.location?.area?.toLowerCase() === areaFilter.toLowerCase()
      );

    // LOCATION SEARCH
    if (locationSearch.trim()) {
      const s = locationSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.location?.city?.toLowerCase().includes(s) ||
          p.location?.district?.toLowerCase().includes(s) ||
          p.location?.taluka?.toLowerCase().includes(s) ||
          p.location?.area?.toLowerCase().includes(s)
      );
    }

    setFilteredProviders(result);
  }, [stateFilter, districtFilter, talukaFilter, areaFilter, locationSearch, providers]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-3">Choose Provider</h2>

      {/* SEARCH LOCATION */}
      <input
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
        placeholder="Search location (city / district / taluka / area)"
        className="input w-full mb-4"
      />

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <select
          className="input"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        >
          <option value="">State</option>
          <option value="Gujarat">Gujarat</option>
        </select>

        <input
          className="input"
          placeholder="District"
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
        />

        <input
          className="input"
          placeholder="Taluka"
          value={talukaFilter}
          onChange={(e) => setTalukaFilter(e.target.value)}
        />

        <input
          className="input"
          placeholder="Area"
          value={areaFilter}
          onChange={(e) => setAreaFilter(e.target.value)}
        />
      </div>

      {/* PROVIDER LIST */}
      {filteredProviders.length === 0 && (
        <div className="text-center text-muted-foreground py-10">
          No providers found matching filters.
        </div>
      )}

      <div className="space-y-4">
        {filteredProviders.map((p) => (
          <div
            key={p._id}
            onClick={() => setSelectedProvider(p._id)}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedProvider === p._id
                ? "border-primary bg-primary/10"
                : "border-border"
            }`}
          >
            <div className="flex items-center space-x-4">
              <AppImage
                src={p.profileImage || "/noimg.png"}
                alt={p.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  {p.fullName}
                  {p.isVerified && (
                    <Icon name="CheckBadgeIcon" size={16} className="text-primary" />
                  )}
                </h3>

                <div className="text-sm text-muted-foreground flex space-x-3">
                  <span>{p.rating} ⭐</span>
                  <span>{p.reviewCount} reviews</span>
                  <span>{p.completedJobs} jobs</span>
                </div>

                <div className="text-sm">
                  {p.location.city}, {p.location.state}
                </div>
              </div>

              {/* SELECTED CHECK ICON */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedProvider === p._id
                    ? "bg-primary border-primary"
                    : "border-border"
                }`}
              >
                {selectedProvider === p._id && (
                  <Icon name="CheckIcon" size={14} className="text-white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="btn-secondary px-6 py-3">
          Back
        </button>

        <button
          disabled={!selectedProvider}
          onClick={() => onNext(selectedProvider)}
          className="btn-primary px-6 py-3 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
