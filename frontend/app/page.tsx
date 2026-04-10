"use client";
import FileUploader from "@/components/FileUploader";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
return (
<div className="min-h-screen w-full bg-gray-950 text-white flex flex-col">
{/* Header */}
<div className="px-8 py-5 border-b border-gray-800">
<h1 className="text-2xl font-bold text-purple-400">🧠 Knowledge Base AI</h1>
<p className="text-gray-500 text-sm">Upload documents and ask questions instantly.</p>
</div>

{/* Body */}
<div className="flex flex-1 overflow-hidden">
{/* Left sidebar - upload */}
<div className="w-72 border-r border-gray-800 p-5 flex flex-col gap-4">
<p className="text-xs text-gray-500 uppercase tracking-widest">Documents</p>
<FileUploader onUpload={() => {}} />
</div>

{/* Right - chat */}
<div className="flex-1 flex flex-col">
<ChatWindow />
</div>
</div>
</div>
);
}

