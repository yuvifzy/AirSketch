export default function LeftPanel() {
  return (
    <div className="w-[220px] h-full bg-[#111827] border-r border-white/5 flex flex-col">
      <div className="p-4 border-b border-white/5">
        <h2 className="text-xs uppercase tracking-widest text-slate-400">Fleet</h2>
      </div>
      <div className="flex-1 p-4">
        <p className="text-slate-500">Drone queue goes here</p>
      </div>
    </div>
  );
}
