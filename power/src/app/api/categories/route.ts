import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import ServiceCategory from "@/models/ServiceCategory"; // Now properly imported

export async function GET() {
  try {
    await connectDB();

    if (!ServiceCategory) {
      throw new Error('ServiceCategory model not found. Check model file.');
    }

    const categories = await ServiceCategory.find({}).lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (err: any) {
    console.error("GET /api/categories ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}