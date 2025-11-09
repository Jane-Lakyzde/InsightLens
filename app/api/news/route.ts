import { NextResponse } from "next/server";
import { getNews } from "@/lib/actions/finnhub.actions";

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbolsParam = searchParams.get('symbols') ?? '';
    const symbols = symbolsParam
      ? symbolsParam.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;
    const data = await getNews(symbols);
    return new NextResponse(JSON.stringify({ items: data }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    });
  } catch (e) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}


