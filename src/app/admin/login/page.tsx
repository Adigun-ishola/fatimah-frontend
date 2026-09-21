"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Scale, Lock, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || "Invalid credentials. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0f2440] to-[#1a365d]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#1a365d] flex items-center justify-center mx-auto mb-4 shadow-md">
            <Scale className="w-7 h-7 text-[#c9a84c]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1a365d] font-['Playfair_Display']">
            Admin Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Jimoh-Sulaiman Fatima Adesewa Portfolio
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fatima@fatimaadesewa.com"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 outline-none text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}