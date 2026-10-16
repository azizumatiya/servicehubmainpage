import { NextRequest, NextResponse } from "next/server";
import Customer from "@/models/Customer";
import Provider from "@/models/Provider";
import Admin from "@/models/Admin";

export async function getUserFromRequest(request: NextRequest) {
  try {
    // Get user from localStorage (client-side)
    // This is a simplified approach - in production, consider using HTTP-only cookies
    const customerUser = request.cookies.get("customerUser")?.value;
    const providerUser = request.cookies.get("providerUser")?.value;
    const adminUser = request.cookies.get("adminUser")?.value;

    if (adminUser) {
      return { user: JSON.parse(adminUser), role: "admin" };
    }

    if (providerUser) {
      return { user: JSON.parse(providerUser), role: "provider" };
    }

    if (customerUser) {
      return { user: JSON.parse(customerUser), role: "customer" };
    }

    return null;
  } catch (error) {
    console.error("Error getting user from request:", error);
    return null;
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await getUserFromRequest(request);
  
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await getUserFromRequest(request);
  
  if (!user || user.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return user;
}