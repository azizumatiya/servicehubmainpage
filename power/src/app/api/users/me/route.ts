// src/app/api/users/me/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });

  return NextResponse.json({ user });
}
