export default function RightPanel() {
  return (
    <div className="w-[240px] h-full bg-[#111827] border-l border-white/5 flex flex-col">
      <div className="p-4 border-b border-white/5">
        <h2 className="text-xs uppercase tracking-widest text-slate-400">Path Score</h2>
      </div>
      <div className="flex-1 p-4">
        <p className="text-slate-500">Scoring panel goes here</p>
      </div>
    </div>
  );
}
