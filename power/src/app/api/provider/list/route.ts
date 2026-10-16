import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Provider from "@/models/Provider";

export async function GET() {
  try {
    await connectDB();
    const providers = await Provider.find({}).lean();

    return NextResponse.json({
      success: true,
      providers,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
}
