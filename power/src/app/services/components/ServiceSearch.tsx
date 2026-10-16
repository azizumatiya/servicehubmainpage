"use client";
import { useState } from "react";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-lg mx-auto mb-12">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for services (e.g., plumber, electrician)..."
        className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
