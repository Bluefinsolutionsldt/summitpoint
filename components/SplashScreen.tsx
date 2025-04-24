"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0.8);
  const [textOpacity, setTextOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Logo animation
    setTimeout(() => {
      setLogoScale(1);
      setTimeout(() => {
        setTextOpacity(1);
      }, 500);
    }, 300);

    // Redirect after animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        router.push("/login");
      }, 600);
    }, 2800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-blue-50 z-50 transition-opacity duration-600 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-8">
          <div
            className="relative w-24 h-24 transition-transform duration-700 ease-out transform"
            style={{ transform: `scale(${logoScale})` }}
          >
            <Image
              src="/logo/blue-logo.png"
              alt="Summit Point Logo"
              width={96}
              height={96}
              className="drop-shadow-md"
            />
          </div>
        </div>
        <div
          className="transition-opacity duration-1000 ease-in-out"
          style={{ opacity: textOpacity }}
        >
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
            SUMMIT POINT
          </h1>
          <p className="text-center mt-2 text-blue-600 font-medium">
            Your Project Management Solution
          </p>
        </div>
      </div>
    </div>
  );
}
