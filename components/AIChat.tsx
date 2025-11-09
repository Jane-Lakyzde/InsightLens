'use client';

import React, { useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const AIChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: '嗨，我是 LensInsight 的 AI 助手。告诉我你想分析的股票或市场问题吧！' }
    ]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);

    const onSend = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: 'user', content: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setSending(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data?.reply ?? '抱歉，未获取到回答。' }
            ]);
        } catch (e) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: '请求失败，请稍后重试或检查网络。' }
            ]);
        } finally {
            setSending(false);
        }
    };

    return (
        <aside className="bg-gray-900 border border-gray-800 rounded-lg h-[calc(100vh-160px)] flex flex-col">
            <div className="px-4 py-3 border-b border-gray-800">
                <h3 className="text-gray-100 font-semibold">AI 助手</h3>
                <p className="text-xs text-gray-500 mt-1">提出问题，获取市场洞察</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, idx) => (
                    <div
                        key={idx}
                        className={`px-3 py-2 rounded-md text-sm ${
                            m.role === 'user'
                                ? 'bg-teal-900/30 text-teal-100 self-end'
                                : 'bg-gray-800 text-gray-200'
                        }`}
                    >
                        {m.content}
                    </div>
                ))}
                {sending && (
                    <div className="px-3 py-2 rounded-md bg-gray-800 text-gray-400 text-sm">
                        正在思考…
                    </div>
                )}
            </div>
            <div className="p-3 border-t border-gray-800">
                <div className="flex items-center gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
                        placeholder="例如：帮我看看 NVDA 的技术面"
                        className="flex-1 bg-gray-800 text-gray-200 text-sm px-3 py-2 rounded-md outline-none border border-gray-700 focus:border-gray-600"
                    />
                    <button
                        onClick={onSend}
                        disabled={sending}
                        className="bg-teal-600 hover:bg-teal-500 disabled:opacity-60 text-white text-sm px-4 py-2 rounded-md"
                    >
                        发送
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AIChat;

