"use client";
import FileUploader from "@/components/FileUploader";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
return (
<div className="min-h-screen w-full bg-gray-950">
<main className="text-white p-6 max-w-3xl mx-auto">
<h1 className="text-3xl font-bold text-purple-400 mb-2">
🧠 Knowledge Base AI
</h1>
<p className="text-gray-500 mb-6">
Upload documents and ask questions instantly.
</p>

<div className="mb-6">
<FileUploader onUpload={() => {}} />
</div>

<div className="bg-gray-900 rounded-2xl border border-gray-800">
<ChatWindow />
</div>
</main>
</div>
);
}