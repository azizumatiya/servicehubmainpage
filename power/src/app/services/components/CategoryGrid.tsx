"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

// -----------------------------
// API base URL (with fallback)
// -----------------------------
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

// -----------------------------
// Types
// -----------------------------
interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  providerCount: number;
  averagePrice: string;
  href?: string;
}

// -----------------------------
// SLUG GENERATOR
// -----------------------------
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// -----------------------------
// MAIN COMPONENT
// -----------------------------
export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch categories
  // -----------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: Category[] = await response.json();

        const finalData = data.map((cat) => ({
          ...cat,
          href: `/services/${generateSlug(cat.name)}`,
        }));

        setCategories(finalData);
        setFiltered(finalData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // -----------------------------
  // Filter categories
  // -----------------------------
  useEffect(() => {
    const q = searchTerm.toLowerCase();

    const results = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q)
    );

    setFiltered(results);
  }, [searchTerm, categories]);

  // -----------------------------
  // Loading state
  // -----------------------------
  if (loading) {
    return <div className="text-center py-20">Loading categories...</div>;
  }

  // -----------------------------
  // Render UI
  // -----------------------------
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Popular Service Categories</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore our most requested services from verified professionals.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No categories found.
            </div>
          ) : (
            filtered.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href || "#"}
                className="group border border-border bg-card rounded-xl p-6 shadow-sm hover:shadow-lg"
              >

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={cat.icon as any} size={32} />
                </div>

                <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {cat.description}
                </p>

                {/* Stats */}
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Providers:</span>
                    <span className="font-medium">{cat.providerCount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Starting at:</span>
                    <span className="font-medium text-primary">
                      {cat.averagePrice}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-end mt-4">
                  <Icon name="ArrowRightIcon" size={20} />
                </div>
              </Link>
            ))
          )}

        </div>
      </div>
    </section>
  );
}
