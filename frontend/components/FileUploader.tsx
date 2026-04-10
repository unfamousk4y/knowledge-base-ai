"use client";
import { useState, useRef } from "react";

export default function FileUploader({ onUpload }: { onUpload: () => void }) {
const [uploading, setUploading] = useState(false);
const [message, setMessage] = useState("");
const [fileName, setFileName] = useState("");
const inputRef = useRef<HTMLInputElement>(null);

const handleFile = async (file: File) => {
if (!file) return;
setUploading(true);
setMessage("");
setFileName(file.name);

const formData = new FormData();
formData.append("file", file);

const res = await fetch("/api/upload", {
method: "POST",
body: formData,
});
const data = await res.json();

setUploading(false);
setMessage(`✅ ${data.chunks} chunks indexed`);
onUpload();
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (file) handleFile(file);
};

return (
<div
className="border-2 border-dashed border-purple-500 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition-colors"
onClick={() => inputRef.current?.click()}
onDragOver={(e) => e.preventDefault()}
onDrop={(e) => {
e.preventDefault();
const file = e.dataTransfer.files?.[0];
if (file) handleFile(file);
}}
>
<input
ref={inputRef}
type="file"
accept=".pdf,.txt"
onChange={handleChange}
className="hidden"
/>

{uploading ? (
<p className="text-purple-400">Uploading...</p>
) : message ? (
<div>
<p className="text-gray-300 text-sm mb-1 truncate">📄 {fileName}</p>
<p className="text-green-400 text-sm">{message}</p>
</div>
) : (
<div>
<p className="text-gray-300 mb-1"> Click or drag a file here...</p>
<p className="text-gray-500 text-sm">PDF or TXT</p>
</div>
)}
</div>
);
}
