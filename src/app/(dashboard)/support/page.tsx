export default async function SupportPage() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg mb-2">Support</h1>
          <p className="text-on-surface-variant font-body-md">Get help and contact the technical team</p>
        </div>
      </div>
      <div className="bg-surface-container rounded-lg border border-outline-variant shadow-sm p-8 max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Contact System Administrator</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-on-surface-variant">Subject</label>
            <input type="text" className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1 text-on-surface-variant">Message</label>
            <textarea rows={4} className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2"></textarea>
          </div>
          <button type="button" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-bold">Send Ticket</button>
        </form>
      </div>
    </div>
  );
}
