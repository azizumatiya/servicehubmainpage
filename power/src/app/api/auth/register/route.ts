import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import Customer from "@/models/Customer";
import Provider from "@/models/Provider";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, email, phone, password, role } = body;

    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Check email exists in ALL Models → Prevent duplicate email in system
    const emailExists =
      (await Customer.findOne({ email })) ||
      (await Provider.findOne({ email })) ||
      (await Admin.findOne({ email }));

    if (emailExists) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // If admin
    if (role === "admin") {
      const admin = await Admin.create({
        fullName,
        email,
        password: hashed,
      });

      return NextResponse.json({
        success: true,
        user: admin,
        role: "admin",
      });
    }

    // If provider
    if (role === "provider") {
      const provider = await Provider.create({
        fullName,
        email,
        phone,
        password: hashed,
      });

      return NextResponse.json({
        success: true,
        user: provider,
        role: "provider",
      });
    }

    // Default → customer
    const customer = await Customer.create({
      fullName,
      email,
      phone,
      password: hashed,
    });

    return NextResponse.json({
      success: true,
      user: customer,
      role: "customer",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}