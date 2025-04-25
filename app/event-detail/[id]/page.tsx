"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchEventById } from "@/lib/api-util";
import EventDetails from "@/components/ui/EventDetails";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { format } from "date-fns";

interface EventData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string | null;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  bannerImage: string;
  bannerThumbnail: string;
  isPrivate: boolean;
  signatureRequired: boolean;
  accessCode: string | null;
  themeColor: string;
  organization: {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    logo: string | null;
  };
}

// Format dates for display
const formatDateRange = (startDate: string, endDate: string) => {
  try {
    const start = format(new Date(startDate), "dd MMM yyyy");
    const end = format(new Date(endDate), "dd MMM yyyy");
    return `${start} to ${end}`;
  } catch (error) {
    return "Date unavailable";
  }
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvent() {
      if (!id) return;

      try {
        setLoading(true);
        // Convert string ID to number if it's numeric
        // Ensure id is treated as a string first
        const idStr = Array.isArray(id) ? id[0] : String(id);
        const numericId = !isNaN(Number(idStr)) ? Number(idStr) : idStr;
        console.log("Fetching event with ID:", numericId);

        const data = await fetchEventById(numericId);
        if (data) {
          console.log("Event data loaded successfully:", data.id);
          setEventData(data);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Failed to load event:", err);
        setError("Failed to load event data");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !eventData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
        <p className="text-gray-700 mb-4">{error || "Event not found"}</p>
        <a
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  // Transform API data to the format expected by EventDetails component
  const formattedEvent = {
    id: eventData.id.toString(),
    title: eventData.name,
    dateRange: formatDateRange(eventData.startDate, eventData.endDate),
    venue: `${eventData.venue}, ${eventData.city}`,
    logoSrc: eventData.organization?.logo || "/logo.svg",
    description: eventData.description || "",
    location: {
      address: `${eventData.venue}, ${eventData.city}`,
      coordinates: {
        lat: eventData.latitude,
        lng: eventData.longitude,
      },
    },
    bannerImage: eventData.bannerImage?.startsWith("http")
      ? eventData.bannerImage
      : `https://cdn.summitpoint.co.tz/images/${eventData.bannerImage}`,
    bannerThumbnail: eventData.bannerThumbnail?.startsWith("http")
      ? eventData.bannerThumbnail
      : `https://cdn.summitpoint.co.tz/images/${eventData.bannerThumbnail}`,
    themeColor: eventData.themeColor,
    organization: eventData.organization,
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <EventDetails event={formattedEvent} />
    </main>
  );
}
