import { NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find(m => m.role === "user")?.content ?? "";

    // 占位实现：根据用户问题返回一个可替换的模板答案
    const suggestion =
      lastUser.length > 0
        ? `你问的是：“${lastUser.slice(0, 140)}”。这是一个占位回答：当前为本地简化接口，可接入你指定的大模型服务（如 OpenAI、Gemini、DashScope、DeepSeek 等）。请提供 API Key 与模型名称后，我会在此处转发请求并做流式返回。`
        : "这是占位回答：请提出你的市场相关问题，比如“总结本周 NVDA 新闻要点并给交易建议”。";

    return NextResponse.json({
      reply: suggestion,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}


