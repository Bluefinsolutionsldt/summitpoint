"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";
import EventDetailCard from "@/components/EventDetailCard";

export default function Home() {
  const events = [
    {
      id: "eapf-16",
      title: "16th EAST AFRICAN PROCUREMENT FORUM",
      dateRange: "09 to 12 Sep 2024",
      venue: "Arusha International Conference Centre",
      logoSrc: "/ppra-logo.svg",
    },
    {
      id: "eapf-15",
      title: "15th EAST AFRICAN PROCUREMENT FORUM",
      dateRange: "05 to 08 Sep 2023",
      venue: "Kampala International Conference Centre",
      logoSrc: "/ppra-logo.svg",
    },
    {
      id: "eapf-14",
      title: "14th EAST AFRICAN PROCUREMENT FORUM",
      dateRange: "10 to 13 Oct 2022",
      venue: "Nairobi International Conference Centre",
      logoSrc: "/ppra-logo.svg",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <SplashScreen />
    </main>
  );
}
