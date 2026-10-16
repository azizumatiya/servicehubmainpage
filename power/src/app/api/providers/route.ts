import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Provider from "@/models/Provider";

export async function GET() {
  try {
    await connectDB();

    const providers = await Provider.find({}).lean();

    return NextResponse.json({
      success: true,
      data: providers,
    });
  } catch (err: any) {
    console.error("GET /api/providers ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
