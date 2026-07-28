"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-surface-container p-8 rounded-xl border border-outline-variant shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-container rounded-lg mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">factory</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Welcome Back</h2>
          <p className="text-on-surface-variant font-body-md mt-2">Sign in to Nexus AI Factory</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-on-surface-variant">
              <input type="checkbox" className="mr-2 rounded border-outline-variant bg-surface text-primary focus:ring-primary" />
              Remember me
            </label>
            <Link href="/auth/forgot-password" className="text-primary hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-on-surface-variant text-sm mt-6">
          Don&apos;t have an account? <Link href="/auth/register" className="text-primary hover:underline font-medium">Request Access</Link>
        </p>
      </div>
    </div>
  );
}
