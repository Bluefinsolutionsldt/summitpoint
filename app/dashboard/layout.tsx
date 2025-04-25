"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
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

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/dashboard" current={pathname === "/dashboard"}>
              Dashboard
            </NavLink>
            <NavLink
              href="/dashboard/profile"
              current={pathname === "/dashboard/profile"}
            >
              Profile
            </NavLink>
            <NavLink
              href="/dashboard/settings"
              current={pathname === "/dashboard/settings"}
            >
              Settings
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Summit Point. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  current: boolean;
  children: ReactNode;
}

function NavLink({ href, current, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-1 py-2 text-sm font-medium ${
        current
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-300"
      }`}
    >
      {children}
    </Link>
  );
}
