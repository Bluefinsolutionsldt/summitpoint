"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "sonner";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </AuthProvider>
  );
}
