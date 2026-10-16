"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(form) 
      });
      const data = await res.json();
      
      if (!data.success) {
        setError(data.error || "Login failed");
        return;
      }

      // Clear all previous user data
      localStorage.removeItem("customerUser");
      localStorage.removeItem("providerUser");
      localStorage.removeItem("adminUser");
      
      // Save user data based on role
      if (data.role === "admin") {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        console.log("Admin login successful, redirecting to admin dashboard");
        // Force a hard redirect to ensure the page reloads with new authentication state
        window.location.href = "/admin-dashboard";
      } else if (data.role === "provider") {
        localStorage.setItem("providerUser", JSON.stringify(data.user));
        console.log("Provider login successful, redirecting to provider dashboard");
        window.location.href = "/provider-dashboard";
      } else {
        localStorage.setItem("customerUser", JSON.stringify(data.user));
        console.log("Customer login successful, redirecting to customer dashboard");
        window.location.href = "/customer-dashboard";
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={submit}>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Admin Login Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800">Admin Login</h3>
        <p className="mt-1 text-xs text-blue-700">
          Email: admin@servicehub.com<br />
          Password: admin123
        </p>
      </div>

      {/* Forgot Password & Register Link */}
      <div className="text-center space-y-4 mt-6">
        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
          Forgot your password?
        </a>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
          </div>
        </div>
        <a
          href="/register"
          className="block w-full bg-white border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          Create a new account
        </a>
      </div>
    </AuthLayout>
  );
}