"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AIAssistantModal from "@/components/ai/AIAssistantModal";

export default function SideNav() {
  const pathname = usePathname();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const navClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-sm ${
      isActive(path)
        ? 'text-secondary dark:text-secondary-fixed border-l-4 border-secondary bg-secondary-container/10 font-bold'
        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
    }`;

  return (
    <>
      <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container dark:bg-surface-container border-r border-outline-variant hidden md:flex flex-col pt-16 pb-6">
        <div className="px-5 my-4">
          <div className="flex items-center gap-3 p-2 bg-surface-container-low rounded-xl border border-outline-variant">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary">factory</span>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-on-surface text-sm truncate">Plant Sector G-7</h3>
              <p className="text-xs text-secondary font-semibold">98.2% OEE • Active</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-4 overflow-y-auto custom-scrollbar">
          <div>
            <div className="px-3 mb-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              Core CRM & Operations
            </div>
            <div className="space-y-0.5">
              <Link href="/dashboard" className={navClass('/dashboard')}>
                <span className="material-symbols-outlined text-lg">dashboard</span>
                <span>Dashboard</span>
              </Link>
              <Link href="/ai-insights" className={navClass('/ai-insights')}>
                <span className="material-symbols-outlined text-lg text-primary">psychology</span>
                <span>AI Insights</span>
              </Link>
              <Link href="/analytics" className={navClass('/analytics')}>
                <span className="material-symbols-outlined text-lg">analytics</span>
                <span>Analytics</span>
              </Link>
              <Link href="/customers" className={navClass('/customers')}>
                <span className="material-symbols-outlined text-lg">groups</span>
                <span>Customers</span>
              </Link>
              <Link href="/orders" className={navClass('/orders')}>
                <span className="material-symbols-outlined text-lg">shopping_cart</span>
                <span>Orders</span>
              </Link>
              <Link href="/quotations" className={navClass('/quotations')}>
                <span className="material-symbols-outlined text-lg">request_quote</span>
                <span>Quotations</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="px-3 mb-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              Plant & Supply
            </div>
            <div className="space-y-0.5">
              <Link href="/machines" className={navClass('/machines')}>
                <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
                <span>Machines</span>
              </Link>
              <Link href="/inventory" className={navClass('/inventory')}>
                <span className="material-symbols-outlined text-lg">inventory_2</span>
                <span>Inventory</span>
              </Link>
              <Link href="/products" className={navClass('/products')}>
                <span className="material-symbols-outlined text-lg">category</span>
                <span>Products</span>
              </Link>
              <Link href="/projects" className={navClass('/projects')}>
                <span className="material-symbols-outlined text-lg">assignment</span>
                <span>Projects</span>
              </Link>
              <Link href="/suppliers" className={navClass('/suppliers')}>
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                <span>Suppliers</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="px-3 mb-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              Workforce & Finance
            </div>
            <div className="space-y-0.5">
              <Link href="/workers" className={navClass('/workers')}>
                <span className="material-symbols-outlined text-lg">badge</span>
                <span>Workers</span>
              </Link>
              <Link href="/attendance" className={navClass('/attendance')}>
                <span className="material-symbols-outlined text-lg">co_present</span>
                <span>Attendance</span>
              </Link>
              <Link href="/tasks" className={navClass('/tasks')}>
                <span className="material-symbols-outlined text-lg">task</span>
                <span>Work Tasks</span>
              </Link>
              <Link href="/invoices" className={navClass('/invoices')}>
                <span className="material-symbols-outlined text-lg">receipt_long</span>
                <span>Invoices</span>
              </Link>
              <Link href="/purchase-orders" className={navClass('/purchase-orders')}>
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                <span>Purchase Orders</span>
              </Link>
              <Link href="/expenses" className={navClass('/expenses')}>
                <span className="material-symbols-outlined text-lg">payments</span>
                <span>Expenses</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="px-3 mb-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              System & Admin
            </div>
            <div className="space-y-0.5">
              <Link href="/reports" className={navClass('/reports')}>
                <span className="material-symbols-outlined text-lg">bar_chart</span>
                <span>Reports</span>
              </Link>
              <Link href="/departments" className={navClass('/departments')}>
                <span className="material-symbols-outlined text-lg">domain</span>
                <span>Departments</span>
              </Link>
              <Link href="/notifications" className={navClass('/notifications')}>
                <span className="material-symbols-outlined text-lg">notifications</span>
                <span>Notifications</span>
              </Link>
              <Link href="/activity-logs" className={navClass('/activity-logs')}>
                <span className="material-symbols-outlined text-lg">history</span>
                <span>Audit Logs</span>
              </Link>
              <Link href="/user-management" className={navClass('/user-management')}>
                <span className="material-symbols-outlined text-lg">manage_accounts</span>
                <span>User Roles</span>
              </Link>
              <Link href="/settings" className={navClass('/settings')}>
                <span className="material-symbols-outlined text-lg">settings</span>
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </nav>

        <div className="mt-auto px-4 pt-3 border-t border-outline-variant space-y-2">
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="w-full bg-primary text-on-primary py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm shadow-md"
          >
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
            <span>Nexus AI Assistant</span>
          </button>
          
          <div className="flex items-center justify-between text-xs text-on-surface-variant px-1 pt-1">
            <Link href="/support" className="hover:text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">help</span>
              Support
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="hover:text-error flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <AIAssistantModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </>
  );
}
