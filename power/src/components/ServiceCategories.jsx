"use client";
import { useEffect, useState } from "react";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
        );

        if (!res.ok) {
          throw new Error("Bad response: " + res.status);
        }

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("FETCH FAILED:", err);
        setError(err.message);
      }
    }

    fetchCategories();
  }, []);

  if (error) {
    return <p className="text-red-500">ERROR: {error}</p>;
  }

  return (
    <div>
      {categories.map((c) => (
        <div key={c.id}>
          <p>{c.name}</p>
        </div>
      ))}
    </div>
  );
}
