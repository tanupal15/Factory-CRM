"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AIAssistantModal from "../ai/AIAssistantModal";

export default function TopNav() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase().trim();
    if (q.includes('customer')) router.push('/customers');
    else if (q.includes('order')) router.push('/orders');
    else if (q.includes('machine')) router.push('/machines');
    else if (q.includes('inventory') || q.includes('stock')) router.push('/inventory');
    else if (q.includes('worker') || q.includes('employee')) router.push('/workers');
    else router.push('/dashboard');
  };

  return (
    <>
      <header className="bg-surface/90 backdrop-blur border-b border-outline-variant shadow-sm sticky top-0 z-30 flex justify-between items-center w-full px-6 h-16">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-bold text-secondary tracking-tight">Nexus AI Factory</span>
            <span className="bg-secondary-container/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-secondary/30">CRM v2.4</span>
          </Link>

          <div className="hidden lg:flex gap-4 ml-6 text-sm">
            <Link href="/dashboard" className="text-on-surface-variant font-medium hover:text-on-surface px-2 py-1 rounded transition-colors">Dashboard</Link>
            <Link href="/machines" className="text-on-surface-variant font-medium hover:text-on-surface px-2 py-1 rounded transition-colors">Machines</Link>
            <Link href="/projects" className="text-on-surface-variant font-medium hover:text-on-surface px-2 py-1 rounded transition-colors">Projects</Link>
            <Link href="/reports" className="text-on-surface-variant font-medium hover:text-on-surface px-2 py-1 rounded transition-colors">Reports</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-full pl-9 pr-4 py-1.5 text-xs focus:ring-2 focus:ring-secondary focus:outline-none w-56 transition-all focus:w-72"
              placeholder="Search assets, orders, customers..."
              type="text"
            />
          </form>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="flex items-center gap-1 bg-primary-container text-primary px-3 py-1.5 rounded-full text-xs font-bold hover:brightness-110 transition-all"
              title="Open AI Assistant"
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span className="hidden md:inline">AI Copilot</span>
            </button>

            <Link
              href="/notifications"
              className="material-symbols-outlined p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors relative"
              title="Notifications"
            >
              notifications
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
            </Link>

            <Link
              href="/settings"
              className="material-symbols-outlined p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              title="Settings"
            >
              settings
            </Link>
          </div>

          <Link href="/profile" className="flex items-center gap-2 border-l border-outline-variant pl-4">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-bold text-secondary text-sm border border-secondary/30">
              PA
            </div>
            <div className="hidden xl:block text-left text-xs">
              <div className="font-bold text-on-surface">Plant Admin</div>
              <div className="text-on-surface-variant">SUPER_ADMIN</div>
            </div>
          </Link>
        </div>
      </header>

      <AIAssistantModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </>
  );
}
