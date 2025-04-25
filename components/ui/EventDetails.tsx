"use client";

import { useState } from "react";
import EventHeaderCard from "./EventHeaderCard";
import EventInfoCard from "./EventInfoCard";
import EventHighlightCard from "./EventHighlightCard";
import EventFeaturesGrid from "./EventFeaturesGrid";
import {
  MapPinIcon,
  CalendarIcon,
  UserIcon,
  BuildingOffice2Icon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    dateRange: string;
    venue: string;
    description?: string;
    logoSrc?: string;
    bannerImage?: string;
    bannerThumbnail?: string;
    themeColor?: string;
    location?: {
      address: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    organization?: {
      id?: number;
      name?: string;
      logo?: string | null;
    };
  };
}

export default function EventDetails({ event }: EventDetailsProps) {
  // Default color if themeColor is not provided
  const themeColor = event.themeColor || "#0C80B3";

  // Event information items
  const eventInfoItems = [
    {
      icon: <CalendarIcon className="w-5 h-5" />,
      label: "Date Range",
      value: event.dateRange,
    },
    {
      icon: <MapPinIcon className="w-5 h-5" />,
      label: "Venue",
      value: event.venue,
    },
    {
      icon: <ClockIcon className="w-5 h-5" />,
      label: "Registration",
      value: "Opens daily at 8:00 AM",
    },
    {
      icon: <BuildingOffice2Icon className="w-5 h-5" />,
      label: "Organizer",
      value: event.organization?.name || "Summit Point",
    },
    {
      icon: <UserIcon className="w-5 h-5" />,
      label: "Dress Code",
      value: "Business Formal",
    },
  ];

  // Event highlights
  const eventHighlights = [
    "World-class speakers and industry experts",
    "Networking opportunities with professionals",
    "Interactive panel discussions and workshops",
    "Exhibition showcasing latest innovations",
    "Cultural evening and gala dinner",
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Event header */}
      <EventHeaderCard
        title={event.title}
        dateRange={event.dateRange}
        venue={event.venue}
        logoSrc={event.logoSrc || "/logo.svg"}
        themeColor={themeColor}
        organizationName={event.organization?.name}
        bannerImage={event.bannerImage}
        bannerThumbnail={event.bannerThumbnail}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Features Grid */}
        <div className="transform -mt-6 relative z-10">
          <EventFeaturesGrid
            eventId={event.id}
            themeColor={themeColor}
            counts={{
              photos: 24,
              timetable: 69,
              speakers: 21,
              chatroom: 127,
              surveys: 1,
              documents: 16,
            }}
          />
        </div>

        {/* Description and cards section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Description section */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: themeColor }}
            >
              Event Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description ||
                `Welcome to ${event.title}. This event brings together professionals and stakeholders to discuss challenges, innovations, and opportunities.`}
            </p>
          </div>

          {/* Info and Highlights */}
          <EventInfoCard
            title="Key Information"
            items={eventInfoItems}
            themeColor={themeColor}
          />

          <EventHighlightCard
            title="Event Highlights"
            highlights={eventHighlights}
            themeColor={themeColor}
          />
        </div>
      </div>
    </div>
  );
}
