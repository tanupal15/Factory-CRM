"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant dark:border-outline-variant hidden md:flex flex-col pt-20 pb-8">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">factory</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary scale-x-105 origin-left leading-tight">Plant 042</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Active: 98.2% OEE</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        <Link href="/dashboard" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/dashboard') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </Link>
        <Link href="/customers" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/customers') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">groups</span>
          <span className="font-label-sm text-label-sm">Customers</span>
        </Link>
        <Link href="/workers" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/workers') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">badge</span>
          <span className="font-label-sm text-label-sm">Workers</span>
        </Link>
        <Link href="/inventory" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/inventory') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="font-label-sm text-label-sm">Inventory</span>
        </Link>
        <Link href="/orders" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/orders') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-label-sm text-label-sm">Orders</span>
        </Link>
        <Link href="/products" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/products') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">category</span>
          <span className="font-label-sm text-label-sm">Products</span>
        </Link>
        <Link href="/reports" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/reports') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">bar_chart</span>
          <span className="font-label-sm text-label-sm">Reports</span>
        </Link>
        <Link href="/settings" className={`flex items-center gap-3 font-bold px-4 py-3 rounded-lg transition-all ${isActive('/settings') ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm text-label-sm">Settings</span>
        </Link>
      </nav>
      <div className="mt-auto px-4 space-y-4">
        <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span>AI Assistant</span>
        </button>
        <div className="border-t border-outline-variant pt-4">
          <Link href="/support" className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface px-4 py-2 transition-all">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-sm text-label-sm">Support</span>
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface px-4 py-2 transition-all w-full text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-sm text-label-sm">Log Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
