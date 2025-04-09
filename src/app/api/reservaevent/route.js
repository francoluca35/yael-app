import { saveToReserved } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const saved = await saveToReserved(body);
    return NextResponse.json({ success: true, id: saved.insertedId });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
