import { NextResponse } from "next/server";
import Customer from "@/models/Customer";
import Provider from "@/models/Provider";
import connectDB from "@/utils/db";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const exists =
    (await Customer.findOne({ email })) ||
    (await Provider.findOne({ email }));

  return NextResponse.json({
    available: !exists,
  });
}
