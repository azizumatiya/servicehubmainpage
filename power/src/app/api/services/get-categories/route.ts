import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import ServiceCategory from "@/models/ServiceCategory";
import BudgetRange from "@/models/BudgetRange";

export async function GET() {
  try {
    await connectDB();

    const categories = await ServiceCategory.find({});
    const budgets = await BudgetRange.find({});

    return NextResponse.json({
      success: true,
      categories,
      budgets
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
