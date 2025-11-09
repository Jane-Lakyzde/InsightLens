import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const runtime = 'edge';

export async function POST() {
  try {
    revalidateTag('news');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}


