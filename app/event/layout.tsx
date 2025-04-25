"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/AuthContext";

// Navigation items for event pages
const navItems = [
  { title: "Overview", path: "", icon: "BookOpenIcon" },
  { title: "Location", path: "/venue", icon: "MapPinIcon" },
  { title: "Photos", path: "/gallery", icon: "CameraIcon" },
  { title: "Timetable", path: "/schedule", icon: "ClockIcon" },
  { title: "Speakers", path: "/speakers", icon: "UsersIcon" },
  { title: "Chatroom", path: "/chatroom", icon: "MessageCircleIcon" },
  { title: "Surveys", path: "/surveys", icon: "BarChart3Icon" },
  { title: "Documents", path: "/documents", icon: "FileTextIcon" },
  { title: "Sessions", path: "/sessions", icon: "FileQuestionIcon" },
  { title: "Live Stream", path: "/livestream", icon: "VideoIcon" },
  { title: "Suggestions", path: "/suggestions", icon: "MessageSquareIcon" },
];

interface EventLayoutProps {
  children: ReactNode;
}

export default function EventLayout({ children }: EventLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // If not authenticated and finished loading, redirect to login
    if (!loading && !isAuthenticated && typeof window !== "undefined") {
      // Check for backup authentication in localStorage
      const hasLocalAuth = localStorage.getItem("summit_point_auth") !== null;

      if (!hasLocalAuth) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  // Don't render anything on server to avoid hydration issues
  if (!isClient) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F6F5]">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Function to determine if a nav item is active
  const isActive = (path: string) => {
    if (path === "" && pathname === "/event") {
      return true;
    }
    return pathname === `/event${path}`;
  };

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
            {user && (
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
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
