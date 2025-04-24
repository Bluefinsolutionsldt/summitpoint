"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  HomeIcon,
  LayoutDashboardIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  BellIcon,
  UserIcon,
  SearchIcon,
  CalendarIcon,
  LineChartIcon,
  FolderIcon,
  MenuIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Detect if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check initially
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const isActiveRoute = (route: string) => {
    if (route === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    if (route !== "/dashboard" && pathname.startsWith(route)) {
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 h-screen flex overflow-hidden">
        {/* Desktop Sidebar - Not visible on mobile */}
        <div
          className={`
          fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 text-gray-800 transform transition-all duration-300 ease-in-out hidden lg:block
          ${sidebarCollapsed ? "w-20" : "w-64"}
        `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div
              className={`flex items-center border-b border-gray-200 p-4 ${
                sidebarCollapsed ? "justify-center" : "px-6"
              }`}
            >
              {!sidebarCollapsed && (
                <>
                  <div className="relative w-8 h-8 mr-3">
                    <Image
                      src="/logo/blue-logo.png"
                      alt="Summit Point Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-xl font-bold">Summit Point</h1>
                </>
              )}
              {sidebarCollapsed && (
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo/blue-logo.png"
                    alt="Summit Point Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
              <Link
                href="/dashboard"
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : "justify-start"
                } py-3 px-3 rounded-lg transition-colors ${
                  isActiveRoute("/dashboard")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <HomeIcon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="ml-3">Home</span>}
              </Link>
              <Link
                href="/dashboard/search"
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : "justify-start"
                } py-3 px-3 rounded-lg transition-colors ${
                  isActiveRoute("/dashboard/search")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <SearchIcon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="ml-3">Search</span>}
              </Link>
              <Link
                href="/dashboard/profile"
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : "justify-start"
                } py-3 px-3 rounded-lg transition-colors ${
                  isActiveRoute("/dashboard/profile")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <UserIcon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="ml-3">Profile</span>}
              </Link>
              <Link
                href="/dashboard/notifications"
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : "justify-start"
                } py-3 px-3 rounded-lg transition-colors ${
                  isActiveRoute("/dashboard/notifications")
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BellIcon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="ml-3">Notifications</span>
                )}
              </Link>
            </nav>

            {/* Sidebar Footer - Collapse/Expand Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className={`flex items-center ${
                  sidebarCollapsed ? "justify-center" : "justify-start"
                } w-full py-2 px-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors`}
              >
                <LogOutIcon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="ml-3">Logout</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          {/* Mobile Header - Only visible on mobile */}
          <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="relative w-7 h-7 mr-2">
                    <Image
                      src="/logo/blue-logo.png"
                      alt="Summit Point Logo"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-lg">Summit Point</span>
                </div>
              </div>
              <div className="flex items-center">
                <button className="text-gray-700 mx-2 focus:outline-none relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <Link href="/dashboard/profile">
                  <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Top Header - Desktop only */}
          <header className="hidden lg:block bg-white border-b border-gray-200 py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {pathname === "/dashboard"
                    ? "Dashboard"
                    : pathname.split("/").pop()?.charAt(0).toUpperCase() +
                      (pathname.split("/").pop()?.slice(1) || "")}
                </h1>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button className="p-1 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="ml-3 relative">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <Link href="/dashboard/profile">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pb-16 lg:pb-8">
            {children}
          </main>

          {/* Mobile Bottom Navigation */}
          {isMobile && (
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200">
              <div className="flex justify-around">
                <Link
                  href="/dashboard"
                  className={`flex flex-col items-center py-3 px-2 flex-1 ${
                    isActiveRoute("/dashboard")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <HomeIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Home</span>
                </Link>
                <Link
                  href="/dashboard/search"
                  className={`flex flex-col items-center py-3 px-2 flex-1 ${
                    isActiveRoute("/dashboard/search")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <SearchIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Search</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className={`flex flex-col items-center py-3 px-2 flex-1 ${
                    isActiveRoute("/dashboard/profile")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Profile</span>
                </Link>
                <Link
                  href="/dashboard/notifications"
                  className={`flex flex-col items-center py-3 px-2 flex-1 ${
                    isActiveRoute("/dashboard/notifications")
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <BellIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">Alerts</span>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
