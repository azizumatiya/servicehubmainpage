import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import ServiceCategory from "@/models/ServiceCategory";

export async function GET() {
  await connectDB();
  const data = await ServiceCategory.find({});
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const saved = await ServiceCategory.create(body);
  return NextResponse.json({ success: true, data: saved });
}
