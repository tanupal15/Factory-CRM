export default async function AIInsightsPage() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">AI Insights</h1>
          <p className="text-on-surface-variant font-body-md">Predictive maintenance and operations analytics</p>
        </div>
      </div>
      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-primary mb-4 block">psychology</span>
        <h2 className="text-xl font-bold mb-2">Nexus AI is analyzing your factory floor...</h2>
        <p className="text-on-surface-variant">Gathering telemetry data to build predictive models.</p>
      </div>
    </div>
  );
}
