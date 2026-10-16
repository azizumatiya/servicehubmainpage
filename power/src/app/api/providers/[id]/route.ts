// File: src/app/api/providers/[id]/route.ts - Fixed API for single provider (with reviews)
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Provider from "@/models/Provider";
import Review from "@/models/Review";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    // ⬇⬇ THE IMPORTANT FIX
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Provider ID missing" },
        { status: 400 }
      );
    }

    // Safety check for models
    if (typeof Provider === 'undefined' || typeof Review === 'undefined') {
      throw new Error('Provider or Review model is not defined. Check model files and restart server.');
    }

    const provider = await Provider.findById(id).select('-__v -password').lean();
    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider not found" },
        { status: 404 }
      );
    }

    // Fetch reviews for this provider
    const reviews = await Review.find({ providerId: id }).select('-__v').lean().limit(10); // Limit to recent 10

    return NextResponse.json({
      success: true,
      provider: provider,
      reviews: reviews,
    });
  } catch (err: any) {
    console.error("GET /api/providers/[id] ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}