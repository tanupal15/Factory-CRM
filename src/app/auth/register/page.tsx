"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess(true);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-surface-container p-8 rounded-xl border border-outline-variant shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-container rounded-lg mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">person_add</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-primary">Request Access</h2>
          <p className="text-on-surface-variant font-body-md mt-2">Join Nexus AI Factory</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-secondary-container/20 border border-secondary text-secondary p-4 rounded-lg mb-6">
              Registration successful! Please check your email to verify your account before signing in.
            </div>
            <Link href="/auth/login" className="text-primary hover:underline font-bold">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-md px-4 py-2 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>
            </div>
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

            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:brightness-110 active:scale-[0.98] transition-all mt-4"
            >
              Request Access
            </button>
          </form>
        )}

        <p className="text-center text-on-surface-variant text-sm mt-6">
          Already have an account? <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
