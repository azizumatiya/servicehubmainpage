// src/app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";
import Customer from "@/models/Customer";
import Provider from "@/models/Provider";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, newPassword } = body;

    if (!email || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Email and new password are required" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Try to update customer first
    let user = await Customer.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    // If not a customer, try provider
    if (!user) {
      user = await Provider.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successfully"
    });
  } catch (error: any) {
    console.error("RESET PASSWORD ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}