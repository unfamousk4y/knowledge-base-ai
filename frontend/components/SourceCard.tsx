export default function SourceCard({ chunkId }: { chunkId: number }) {
return (
<div className="text-xs text-gray-500 bg-gray-900 rounded px-3 py-1 inline-block mr-2 mt-1">
📄 Source chunk #{chunkId}
</div>
);
}