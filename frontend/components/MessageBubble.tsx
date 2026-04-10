export default function MessageBubble({
role,
content,
}: {
role: "user" | "assistant";
content: string;
}) {
return (
<div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-3`}>
<div
className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
role === "user"
? "bg-purple-600 text-white"
: "bg-gray-800 text-gray-100"
}`}
>
{content}
</div>
</div>
);
}