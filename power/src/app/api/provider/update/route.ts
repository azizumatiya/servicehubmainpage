import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Provider from "@/models/Provider";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.id && !body.userId) {
      return NextResponse.json(
        { success: false, error: "Missing provider identifier (id or userId)" },
        { status: 400 }
      );
    }

    const updateData = { ...body };
    delete updateData._id;
    delete updateData.id;
    delete updateData.password;
    delete updateData.__v;

    let provider;

    if (body.id) {
      provider = await Provider.findByIdAndUpdate(body.id, updateData, {
        new: true,
      }).lean();

      if (!provider) {
        return NextResponse.json(
          { success: false, error: "Provider not found" },
          { status: 404 }
        );
      }
    }

    if (body.userId && !provider) {
      provider = await Provider.findOneAndUpdate(
        { userId: body.userId },
        updateData,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      ).lean();
    }

    const { password, __v, ...safe } = provider as any;

    return NextResponse.json({
      success: true,
      provider: safe,
    });
  } catch (err: any) {
    console.error("POST /api/provider/update error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
