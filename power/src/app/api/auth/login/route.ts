import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import Customer from "@/models/Customer";
import Provider from "@/models/Provider";

// Hardcoded admin credentials
const ADMIN_EMAIL = "azizumatiya@servicehub.com";
const ADMIN_PASSWORD = "azizumatiya@9512801591"; // In production, use a stronger password
const ADMIN_FULL_NAME = "System Administrator";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if it's the hardcoded admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create admin user object
      const adminUser = {
        _id: "admin_id",
        fullName: ADMIN_FULL_NAME,
        email: ADMIN_EMAIL,
        role: "admin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return NextResponse.json({
        success: true,
        role: "admin",
        user: adminUser,
      });
    }

    let user = null;
    let role = null;

    /** ---------------- CHECK PROVIDER ---------------- **/
    const provider = await Provider.findOne({ email }).lean();

    if (provider) {
      if (!provider.password) {
        return NextResponse.json(
          { success: false, error: "Provider password not set. Contact support." },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(password, provider.password || "");

      if (!isMatch) {
        return NextResponse.json(
          { success: false, error: "Incorrect password" },
          { status: 401 }
        );
      }

      const { password: pass, ...safeUser } = provider;

      return NextResponse.json({
        success: true,
        role: "provider",
        user: safeUser,
      });
    }

    /** ---------------- CHECK CUSTOMER ---------------- **/
    const customer = await Customer.findOne({ email }).lean();

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (!customer.password) {
      return NextResponse.json(
        { success: false, error: "Customer password not set." },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, customer.password || "");

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 401 }
      );
    }

    const { password: hidePass, ...safeCustomer } = customer;

    return NextResponse.json({
      success: true,
      role: "customer",
      user: safeCustomer,
    });

  } catch (error: any) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}