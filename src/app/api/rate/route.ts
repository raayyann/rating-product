import { db } from "@/app/lib/db";
import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { star, message } = await req.json();

    if (star <= 0)
      return res.json(
        { success: false, message: "houmm kamu ngapain bang" },
        { status: 400 }
      );

    await db.rate.create({
      data: {
        star,
        message,
      },
    });

    return res.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return res.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
