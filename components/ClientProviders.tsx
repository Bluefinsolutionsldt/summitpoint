"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthContext";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
