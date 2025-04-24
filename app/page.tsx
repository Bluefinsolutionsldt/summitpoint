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
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">
          Upcoming Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventDetailCard
              key={event.id}
              title={event.title}
              dateRange={event.dateRange}
              venue={event.venue}
              logoSrc={event.logoSrc}
              eventId={event.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
