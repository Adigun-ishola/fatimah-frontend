"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/api";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await adminApi.login(email, password);
        if (response.data.success) {
          localStorage.setItem("admin_token", response.data.data.token);
          setIsAuthenticated(true);
          router.push("/admin");
          return { success: true };
        }
        return { success: false, message: "Login failed" };
      } catch (error: any) {
        return {
          success: false,
          message: error.response?.data?.message || "Login failed",
        };
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    router.push("/admin/login");
  }, [router]);

  return { isAuthenticated, isLoading, login, logout };
}