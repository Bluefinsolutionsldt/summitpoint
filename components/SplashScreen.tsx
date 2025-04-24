"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0.8);
  const [textOpacity, setTextOpacity] = useState(0);
  const [showRipples, setShowRipples] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Logo animation
    setTimeout(() => {
      setLogoScale(1);
      setTimeout(() => {
        setTextOpacity(1);
        setShowRipples(true);
      }, 500);
    }, 300);
  }, []);

  const handleNavigate = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.push("/login");
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-600 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleNavigate}
      style={{
        backgroundImage: "url('/ITAC CONFERENCE_81.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better visibility of content */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="flex flex-col items-center z-10">
        <div className="mb-8 relative">
          <div className="relative flex items-center justify-center w-48 h-48">
            {showRipples && (
              <>
                <div className="absolute inset-0 rounded-full animate-ripple-1 border-4 border-white shadow-lg" />
                <div className="absolute inset-0 rounded-full animate-ripple-2 border-[3px] border-white/80" />
                <div className="absolute inset-0 rounded-full animate-ripple-3 border-2 border-white/60" />
              </>
            )}
            <div
              className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-700 ease-out"
              style={{ transform: `scale(${logoScale})` }}
            >
              <Image
                src="/logo/blue-logo.png"
                alt="Summit Point Logo"
                width={96}
                height={96}
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>
        <div
          className="transition-opacity duration-1000 ease-in-out"
          style={{ opacity: textOpacity }}
        >
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">
            SUMMIT POINT
          </h1>
          <p className="text-center mt-2 text-blue-100 font-normal drop-shadow-md">
            Your Event Management Solution
          </p>
          <p className="text-center mt-6 text-gray-200 text-sm">
            Click anywhere to continue
          </p>
        </div>
      </div>
    </div>
  );
}
