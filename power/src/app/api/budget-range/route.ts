import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import BudgetRange from "@/models/BudgetRange";

export async function GET() {
  await connectDB();
  const data = await BudgetRange.find({});
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { value, label } = body;

    // Check duplicate before saving
    const exists = await BudgetRange.findOne({ value });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "This budget value already exists." },
        { status: 409 }
      );
    }

    const newBudget = await BudgetRange.create({ value, label });

    return NextResponse.json({ success: true, data: newBudget });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    const updated = await BudgetRange.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await BudgetRange.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
