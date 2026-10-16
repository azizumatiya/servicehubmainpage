"use client";

import React, { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

const ICON_OPTIONS = [
  "HomeIcon",
  "WrenchScrewdriverIcon",
  "TrashIcon",
  "TruckIcon",
  "ComputerDesktopIcon",
  "PaintBrushIcon",
  "HeartIcon",
  "BriefcaseIcon",
  "CubeIcon",
  "SparklesIcon",
  "BoltIcon",
  "FireIcon",
  "SunIcon",
  "CogIcon",
  "BugAntIcon",
  // Add more as needed for consistency with hardcoded icons
];

interface AddCategoryForm {
  name: string;
  icon: string;
  description: string;
  providerCount: number;
  averagePrice: string;
}

const API_BASE_URL = "http://127.0.0.1:5000/api";

export default function AdminAddCategory() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddCategoryForm>({
    defaultValues: {
      providerCount: 0,
      icon: ICON_OPTIONS[0],
    },
  });

  const iconNameWatch = watch("icon", ICON_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getInputClasses = (fieldError: FieldError | undefined) =>
    `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-150 ${
      fieldError
        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
    }`;

  const onSubmit = async (data: AddCategoryForm) => {
    setLoading(true);
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      console.log(`📤 Posting to: ${API_BASE_URL}/categories`, data); // Debug
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseText = await response.text(); // Always get text first
      console.log('Server response:', response.status, responseText); // Debug

      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { error: responseText || "Unknown server error" };
        }
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = JSON.parse(responseText); // Parse success
      setSuccessMessage(`Category "${result.name}" added successfully!`);
      reset({ providerCount: 0, icon: ICON_OPTIONS[0] });
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "An unexpected error occurred.";
      console.error('POST error:', error); // Debug
      setSubmitError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ➕ Add New Category
          </h1>
          <p className="text-gray-600">
            Fill in the details to add a new service category.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-xl p-8 space-y-6"
        >
          {/* Success Message */}
          {successMessage && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
              <Icon name="CheckCircleIcon" size={20} className="mr-2" />
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start">
              <Icon
                name="ExclamationTriangleIcon"
                size={20}
                className="mr-2 flex-shrink-0 mt-0.5"
              />
              <p className="text-sm font-medium">Error: {submitError}</p>
            </div>
          )}

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              {...register("name", { required: "Category Name is required" })}
              type="text"
              className={getInputClasses(errors.name)}
              placeholder="e.g., Home Cleaning"
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Icon Selection */}
          <div>
            <label
              htmlFor="icon-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Icon
            </label>
            <select
              id="icon-select"
              {...register("icon", { required: "Icon selection is required" })}
              className={getInputClasses(errors.icon)}
              disabled={loading}
            >
              {ICON_OPTIONS.map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
            {errors.icon && (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {errors.icon.message}
              </p>
            )}

            {/* Icon Preview */}
            <div className="mt-4 flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Preview:</span>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow">
                <Icon name={iconNameWatch as any} size={20} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-800 font-medium">
                {iconNameWatch}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={3}
              className={getInputClasses(errors.description)}
              placeholder="e.g., Professional cleaning services"
              disabled={loading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Provider Count & Average Price */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Providers Count
              </label>
              <input
                {...register("providerCount", {
                  required: "Count is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be a positive number" },
                })}
                type="number"
                className={getInputClasses(errors.providerCount)}
                placeholder="e.g., 1250"
                disabled={loading}
              />
              {errors.providerCount && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  {errors.providerCount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting At (Price Range)
              </label>
              <input
                {...register("averagePrice", { required: "Price range is required" })}
                type="text"
                className={getInputClasses(errors.averagePrice)}
                placeholder="e.g., $80-150"
                disabled={loading}
              />
              {errors.averagePrice && (
                <p className="mt-1 text-sm text-red-600 font-medium">
                  {errors.averagePrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 flex items-center justify-center font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-700"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
              }`}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
            <Link
              href="/admin-dashboard"
              className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}