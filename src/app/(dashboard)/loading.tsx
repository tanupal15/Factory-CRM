export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 rounded-full border-4 border-surface-container-high border-t-primary animate-spin"></div>
      <p className="text-on-surface-variant font-label-sm animate-pulse">Loading data...</p>
    </div>
  );
}
