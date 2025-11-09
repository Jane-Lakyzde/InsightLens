import { NextResponse } from "next/server";
import { searchStocks } from "@/lib/actions/finnhub.actions";

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') ?? '';
    const data = await searchStocks(q);
    return new NextResponse(JSON.stringify({ items: data }), {
      headers: {
        'Content-Type': 'application/json',
        // Edge cache with stale-while-revalidate
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    });
  } catch (e) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}


