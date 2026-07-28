import Link from "next/link";

export default function TopNav() {
  return (
    <header className="bg-surface dark:bg-surface text-primary dark:text-primary-fixed-dim border-b border-outline-variant dark:border-outline-variant shadow-sm docked full-width top-0 sticky z-50 flex justify-between items-center w-full px-margin h-16">
      <div className="flex items-center gap-stack-lg">
        <span className="font-headline-md text-headline-md font-bold text-secondary dark:text-secondary">Nexus AI Factory</span>
        <div className="hidden md:flex gap-stack-md ml-stack-lg">
          <Link href="/dashboard" className="text-on-surface-variant font-medium hover:bg-surface-container-high transition-colors duration-200 cursor-pointer active:opacity-80 px-2 py-1">Dashboard</Link>
          <Link href="/machines" className="text-primary font-bold border-b-2 border-primary pb-1 cursor-pointer active:opacity-80 transition-colors duration-200">Machines</Link>
          <Link href="/projects" className="text-on-surface-variant font-medium hover:bg-surface-container-high transition-colors duration-200 cursor-pointer active:opacity-80 px-2 py-1">Production</Link>
        </div>
      </div>
      <div className="flex items-center gap-stack-md">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input className="bg-surface-container-low border border-outline-variant rounded-full pl-10 pr-4 py-2 text-label-sm focus:ring-2 focus:ring-primary focus:outline-none w-64" placeholder="Search factory assets..." type="text" />
        </div>
        <div className="flex gap-2">
          <button className="material-symbols-outlined p-2 hover:bg-surface-container-high rounded-full transition-colors">notifications</button>
          <button className="material-symbols-outlined p-2 hover:bg-surface-container-high rounded-full transition-colors">contrast</button>
          <button className="material-symbols-outlined p-2 hover:bg-surface-container-high rounded-full transition-colors">settings</button>
        </div>
        <Link href="/profile" className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjkAtnF-YY9oG46pzXQ46ihHvEcwFPPPc54lES4CPiPtxRhM9lYzPwhiFd8ZDP9cKbruKH70b3leh_-pGMxarnLBHl0ZKkVJdbnhxQbM2Jq8Q7kncqd4ekJqb6Pvu8jZpXUmXgXrd6IcLSFB_Wwqlh-2BWEjiMCcOEFww6NCIg3tKsCMAMWao9IrfpsDz2_0guTVhsuVis973b3KvhcHvLYz1uCkqk768ghnzRHNqQFqj2O-iJ0oNdJw" />
        </Link>
      </div>
    </header>
  );
}
