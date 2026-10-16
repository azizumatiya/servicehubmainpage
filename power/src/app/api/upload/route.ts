import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { filename, data } = await req.json();

    if (!filename || !data) {
      return NextResponse.json(
        { success: false, error: "Missing filename or data" },
        { status: 400 }
      );
    }

    // ------------------------------
    // Ensure /public/uploads exists
    // ------------------------------
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // folder already exists → safe ignore
    }

    // ------------------------------
    // Base64 → Buffer
    // ------------------------------
    const base64Data = data.replace(/^data:.*;base64,/, "");
    const fileBuffer = Buffer.from(base64Data, "base64");

    // ------------------------------
    // Unique filename
    // ------------------------------
    const ext = path.extname(filename) || ".file";
    const nameWithoutExt = path.basename(filename, ext);

    const finalName = `${nameWithoutExt}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, finalName);

    // ------------------------------
    // Write file to disk
    // ------------------------------
    await writeFile(filePath, fileBuffer);

    // ------------------------------
    // Return public URL
    // ------------------------------
    return NextResponse.json({
      success: true,
      url: `/uploads/${finalName}`,
    });
  } catch (err: any) {
    console.error("Upload API Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
