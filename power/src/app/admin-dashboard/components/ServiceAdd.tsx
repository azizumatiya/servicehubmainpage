"use client";

import React, { useEffect, useMemo, useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface Category {
  _id: string;
  name: string;
  icon: string;
  description: string;
}

interface Budget {
  _id: string;
  value: string;
  label: string;
}

type Tab = "categories" | "budgets";

export default function ServiceAdd() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("categories");

  // Forms
  const [newCategory, setNewCategory] = useState({ name: "", icon: "", description: "" });
  const [newBudget, setNewBudget] = useState({ value: "", label: "" });

  // Editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editType, setEditType] = useState<"category" | "budget" | null>(null);

  // UI state
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  const showMessage = (type: "success" | "error" | "info", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [catRes, budRes] = await Promise.all([
        fetch("/api/service-category", { cache: "no-store" }),
        fetch("/api/budget-range", { cache: "no-store" }),
      ]);
      const [catJson, budJson] = await Promise.all([catRes.json(), budRes.json()]);
      setCategories(catJson.data || []);
      setBudgets(budJson.data || []);
    } catch (e) {
      showMessage("error", "Failed to load data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // CATEGORY CRUD
  const addCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.icon.trim()) {
      return showMessage("error", "Name and icon are required.");
    }
    setBusy(true);
    try {
      const res = await fetch("/api/service-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Create failed");
      setCategories((prev) => [...prev, data.data]);
      setNewCategory({ name: "", icon: "", description: "" });
      showMessage("success", "Category added.");
    } catch (e: any) {
      showMessage("error", e.message || "Unable to add category.");
    } finally {
      setBusy(false);
    }
  };

  const deleteCategory = async (id: string) => {
    const snapshot = categories;
    setCategories((prev) => prev.filter((c) => c._id !== id));
    try {
      const res = await fetch(`/api/service-category?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showMessage("success", "Category deleted.");
    } catch {
      setCategories(snapshot); // rollback
      showMessage("error", "Failed to delete category.");
    }
  };

  const startEditCategory = (category: Category) => {
    setEditingId(category._id);
    setEditType("category");
    setNewCategory({
      name: category.name,
      icon: category.icon,
      description: category.description,
    });
  };

  const updateCategory = async () => {
    if (!editingId) return;
    if (!newCategory.name.trim() || !newCategory.icon.trim()) {
      return showMessage("error", "Name and icon are required.");
    }
    setBusy(true);
    const snapshot = categories;
    setCategories((prev) =>
      prev.map((c) => (c._id === editingId ? { ...c, ...newCategory } as Category : c))
    );
    try {
      const res = await fetch(`/api/service-category?id=${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) throw new Error("Update failed");
      showMessage("success", "Category updated.");
      setEditingId(null);
      setEditType(null);
      setNewCategory({ name: "", icon: "", description: "" });
    } catch {
      setCategories(snapshot); // rollback
      showMessage("error", "Failed to update category.");
    } finally {
      setBusy(false);
    }
  };

  // BUDGET CRUD
  const addBudget = async () => {
    if (!newBudget.value.trim() || !newBudget.label.trim()) {
      return showMessage("error", "Value and label are required.");
    }

    setBusy(true);
    try {
      const res = await fetch("/api/budget-range", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      });

      const data = await res.json();

      if (res.status === 409) {
        return showMessage("error", "This budget value already exists.");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Create failed");
      }

      setBudgets((prev) => [...prev, data.data]);
      setNewBudget({ value: "", label: "" });
      showMessage("success", "Budget range added.");
    } catch (e: any) {
      showMessage("error", e.message || "Unable to add budget range.");
    } finally {
      setBusy(false);
    }
  };

  const deleteBudget = async (id: string) => {
    const snapshot = budgets;
    setBudgets((prev) => prev.filter((b) => b._id !== id));
    try {
      const res = await fetch(`/api/budget-range?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showMessage("success", "Budget range deleted.");
    } catch {
      setBudgets(snapshot); // rollback
      showMessage("error", "Failed to delete budget range.");
    }
  };

  const startEditBudget = (budget: Budget) => {
    setEditingId(budget._id);
    setEditType("budget");
    setNewBudget({ value: budget.value, label: budget.label });
  };

  const updateBudget = async () => {
    if (!editingId) return;
    if (!newBudget.value.trim() || !newBudget.label.trim()) {
      return showMessage("error", "Value and label are required.");
    }
    setBusy(true);
    const snapshot = budgets;
    setBudgets((prev) => prev.map((b) => (b._id === editingId ? { ...b, ...newBudget } as Budget : b)));
    try {
      const res = await fetch(`/api/budget-range?id=${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      });
      if (!res.ok) throw new Error("Update failed");
      showMessage("success", "Budget range updated.");
      setEditingId(null);
      setEditType(null);
      setNewBudget({ value: "", label: "" });
    } catch {
      setBudgets(snapshot); // rollback
      showMessage("error", "Failed to update budget range.");
    } finally {
      setBusy(false);
    }
  };

  // Format budget label to include ₹ symbol
  const formatBudgetLabel = (label: string) => {
    // If the label already starts with ₹, return as is
    if (label.startsWith("₹")) {
      return label;
    }
    
    // Extract numbers and hyphens from the label
    const cleanLabel = label.replace(/[^0-9\-]/g, '');
    
    // If it's a range (contains hyphen), format as ₹100 - ₹500
    if (cleanLabel.includes('-')) {
      const [min, max] = cleanLabel.split('-');
      return `₹${min} - ₹${max}`;
    }
    
    // If it's a single number, format as ₹100
    if (cleanLabel) {
      return `₹${cleanLabel}`;
    }
    
    // Fallback to original label if no numbers found
    return label;
  };

  // Helpers
  const isEditing = useMemo(() => Boolean(editingId && editType), [editingId, editType]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Services & Budgets</h2>
        <button
          onClick={loadData}
          className="px-3 py-2 text-sm rounded-lg border hover:bg-gray-50"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Global message */}
      {message && (
        <div
          className={`rounded-lg px-4 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
          role="status"
          aria-live="polite"
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b flex gap-6 px-1 py-2">
        <button
          className={`pb-2 -mb-px border-b-2 ${
            activeTab === "categories" ? "border-primary text-primary" : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Service Categories
        </button>
        <button
          className={`pb-2 -mb-px border-b-2 ${
            activeTab === "budgets" ? "border-primary text-primary" : "border-transparent text-gray-500"
          }`}
          onClick={() => setActiveTab("budgets")}
        >
          Budget Ranges
        </button>
      </div>

      {/* CATEGORY TAB */}
      {activeTab === "categories" && (
        <div className="space-y-6">
          {/* Add/Edit Category */}
          <div className="p-4 border rounded-xl shadow-sm bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{isEditing && editType === "category" ? "Edit Category" : "Add Category"}</h3>
              {isEditing && editType === "category" && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditType(null);
                    setNewCategory({ name: "", icon: "", description: "" });
                  }}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                <input
                  className="border p-2 rounded w-full"
                  placeholder="e.g. Plumbing"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                <input
                  className="border p-2 rounded w-full"
                  placeholder="e.g. WrenchScrewdriverIcon"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                />
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <span>Preview:</span>
                  {newCategory.icon ? <Icon name={newCategory.icon as any} size={18} /> : <span>—</span>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <input
                  className="border p-2 rounded w-full"
                  placeholder="Short description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={editingId && editType === "category" ? updateCategory : addCategory}
              className="btn-primary mt-3 px-4 py-2 rounded-lg disabled:opacity-60"
              disabled={busy}
            >
              {busy
                ? "Please wait..."
                : editingId && editType === "category"
                ? "Save Changes"
                : "Add Category"}
            </button>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            {loading && (
              <div className="text-sm text-gray-500">Loading categories...</div>
            )}
            {!loading && categories.length === 0 && (
              <div className="p-6 border rounded-xl bg-gray-50 text-center text-gray-600">
                No categories yet. Add your first category above.
              </div>
            )}
            {categories.map((c) => (
              <div key={c._id} className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                    <Icon name={c.icon as any} size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.description}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="text-blue-600 hover:underline" onClick={() => startEditCategory(c)}>
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => deleteCategory(c._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BUDGET TAB */}
      {activeTab === "budgets" && (
        <div className="space-y-6">
          <div className="p-4 border rounded-xl shadow-sm bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{isEditing && editType === "budget" ? "Edit Budget Range" : "Add Budget Range"}</h3>
              {isEditing && editType === "budget" && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditType(null);
                    setNewBudget({ value: "", label: "" });
                  }}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
                <input
                  className="border p-2 rounded w-full"
                  placeholder="e.g. under-100"
                  value={newBudget.value}
                  onChange={(e) => setNewBudget({ ...newBudget, value: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                <input
                  className="border p-2 rounded w-full"
                  placeholder="e.g. Under $100"
                  value={newBudget.label}
                  onChange={(e) => setNewBudget({ ...newBudget, label: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={editingId && editType === "budget" ? updateBudget : addBudget}
              className="btn-primary mt-3 px-4 py-2 rounded-lg disabled:opacity-60"
              disabled={busy}
            >
              {busy
                ? "Please wait..."
                : editingId && editType === "budget"
                ? "Save Changes"
                : "Add Budget"}
            </button>
          </div>

          {/* Budget List */}
          <div className="space-y-3">
            {loading && (
              <div className="text-sm text-gray-500">Loading budgets...</div>
            )}
            {!loading && budgets.length === 0 && (
              <div className="p-6 border rounded-xl bg-gray-50 text-center text-gray-600">
                No budget ranges yet. Add one above.
              </div>
            )}
            {budgets.map((b) => (
              <div key={b._id} className="p-4 border rounded-xl bg-white shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-medium">{formatBudgetLabel(b.label)}</p>
                  <p className="text-sm text-gray-500">Value: {b.value}</p>
                </div>

                <div className="flex gap-3">
                  <button className="text-blue-600 hover:underline" onClick={() => startEditBudget(b)}>
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => deleteBudget(b._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Budget Range Display Component */}
          <div className="p-4 border rounded-xl shadow-sm bg-white">
            <label className="block text-sm font-semibold text-foreground mb-3">
              What's your budget range? *
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {budgets.map((range) => {
                const formattedLabel = formatBudgetLabel(range.label);

                return (
                  <button
                    key={range._id}
                    type="button"
                    onClick={() => console.log(`Selected budget: ${range.value}`)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                      false // This would be replaced with your selected budget state
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-foreground hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    {formattedLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}