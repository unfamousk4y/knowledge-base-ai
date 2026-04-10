"use client";
import { useState } from "react";

export default function FileUploader({ onUpload }: { onUpload: () => void }) {
const [uploading, setUploading] = useState(false);
const [message, setMessage] = useState("");

const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (!file) return;

setUploading(true);
setMessage("");

const formData = new FormData();
formData.append("file", file);

const res = await fetch("/api/upload", {
method: "POST",
body: formData,
});
const data = await res.json();

setUploading(false);
setMessage(`Uploaded! ${data.chunks} chunks indexed.`);
onUpload();
};

return (
<div className="border-2 border-dashed border-purple-500 rounded-xl p-6 text-center">
<p className="text-gray-400 mb-3">Upload a PDF or TXT file</p>
<input
type="file"
accept=".pdf,.txt"
onChange={handleFile}
disabled={uploading}
className="text-white"
/>
{uploading && <p className="text-purple-400 mt-2">Uploading...</p>}
{message && <p className="text-green-400 mt-2">{message}</p>}
</div>
);
}