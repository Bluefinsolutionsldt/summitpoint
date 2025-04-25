"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/AuthContext";

interface EventLayoutProps {
  children: ReactNode;
}

export default function EventLayout({ children }: EventLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F6F6F5] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo/blue-logo.png"
                alt="Summit Point Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-lg text-blue-900">
              Summit Point
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="container mx-auto py-6 px-4">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Summit Point. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
