"use client";
import { useState } from "react";
import MessageBubble from "./MessageBubble";
import SourceCard from "./SourceCard";

type Message = {
role: "user" | "assistant";
content: string;
sources?: number[];
};

export default function ChatWindow() {
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);

const sendMessage = async () => {
if (!input.trim()) return;

const userMsg: Message = { role: "user", content: input };
setMessages((prev) => [...prev, userMsg]);
setInput("");
setLoading(true);

const res = await fetch(
`${process.env.NEXT_PUBLIC_API_URL}/api/query`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ question: input }),
}
);
const data = await res.json();

const assistantMsg: Message = {
role: "assistant",
content: data.answer,
sources: data.sources,
};
setMessages((prev) => [...prev, assistantMsg]);
setLoading(false);
};

return (
<div className="flex flex-col h-[600px]">
{/* Messages */}
<div className="flex-1 overflow-y-auto p-4">
{messages.length === 0 && (
<p className="text-gray-600 text-center mt-20">
Ask anything about your documents...
</p>
)}
{messages.map((msg, i) => (
<div key={i}>
<MessageBubble role={msg.role} content={msg.content} />
{msg.sources && (
<div className="ml-2 mb-2">
{msg.sources.map((id) => (
<SourceCard key={id} chunkId={id} />
))}
</div>
)}
</div>
))}
{loading && (
<div className="text-purple-400 text-sm ml-2">Thinking...</div>
)}
</div>

{/* Input */}
<div className="flex gap-2 p-4 border-t border-gray-800">
<input
className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 outline-none"
placeholder="Ask a question..."
value={input}
onChange={(e) => setInput(e.target.value)}
onKeyDown={(e) => e.key === "Enter" && sendMessage()}
/>
<button
onClick={sendMessage}
disabled={loading}
className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl disabled:opacity-50"
>
Send
</button>
</div>
</div>
);
}