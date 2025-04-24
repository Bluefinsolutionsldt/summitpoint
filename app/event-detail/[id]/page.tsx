"use client";

import { useEffect, useState, use } from "react";
import EventDetails from "@/components/EventDetails";

// Mock database of events - this would typically come from an API in a real application
const eventsDatabase: Record<string, any> = {
  "eapf-16": {
    id: "eapf-16",
    title: "16th EAST AFRICAN PROCUREMENT FORUM",
    dateRange: "09 to 12 Sep 2024",
    venue: "Arusha International Conference Centre",
    logoSrc: "/ppra-logo.svg",
    location: {
      address: "Arusha International Conference Centre, Arusha, Tanzania",
      coordinates: {
        lat: -3.3695,
        lng: 36.6942,
      },
    },
    timetable: [
      {
        id: "day1-1",
        day: "Day 1 - September 9",
        time: "09:00 - 10:30",
        title: "Opening Ceremony",
        speaker: "H.E. Dr. Samia Suluhu Hassan",
        description:
          "Welcome address and official opening of the forum by the President of Tanzania",
      },
      {
        id: "day1-2",
        day: "Day 1 - September 9",
        time: "11:00 - 12:30",
        title: "Keynote: The Future of Public Procurement in East Africa",
        speaker: "Dr. James Ndongo",
        description:
          "Overview of procurement challenges and opportunities in the region",
      },
      {
        id: "day2-1",
        day: "Day 2 - September 10",
        time: "09:00 - 10:30",
        title: "Panel Discussion: Digital Transformation in Procurement",
        description: "Exploring e-procurement systems and digital tools",
      },
    ],
    speakers: [
      {
        id: "speaker-1",
        name: "Dr. Samia Suluhu Hassan",
        title: "President",
        organization: "United Republic of Tanzania",
        bio: "H.E. Dr. Samia Suluhu Hassan is the President of Tanzania and will be the Guest of Honor at the event.",
      },
      {
        id: "speaker-2",
        name: "Dr. James Ndongo",
        title: "Director General",
        organization: "East African Procurement Authority",
        bio: "Dr. Ndongo is an expert in public procurement with over 20 years of experience in the field.",
      },
      {
        id: "speaker-3",
        name: "Sarah Kimani",
        title: "Chief Procurement Officer",
        organization: "Ministry of Finance, Kenya",
        bio: "Sarah has pioneered several procurement reforms in Kenya over the past decade.",
      },
    ],
  },
  "eapf-15": {
    id: "eapf-15",
    title: "15th EAST AFRICAN PROCUREMENT FORUM",
    dateRange: "05 to 08 Sep 2023",
    venue: "Kampala International Conference Centre",
    logoSrc: "/ppra-logo.svg",
    location: {
      address: "Kampala International Conference Centre, Kampala, Uganda",
      coordinates: {
        lat: 0.3136,
        lng: 32.5811,
      },
    },
    timetable: [
      {
        id: "day1-1",
        day: "Day 1 - September 5",
        time: "09:00 - 10:30",
        title: "Opening Ceremony",
        speaker: "H.E. Yoweri Museveni",
        description: "Welcome address by the President of Uganda",
      },
    ],
    speakers: [
      {
        id: "speaker-1",
        name: "H.E. Yoweri Museveni",
        title: "President",
        organization: "Republic of Uganda",
        bio: "President of Uganda and Guest of Honor at the forum.",
      },
    ],
  },
  "eapf-14": {
    id: "eapf-14",
    title: "14th EAST AFRICAN PROCUREMENT FORUM",
    dateRange: "10 to 13 Oct 2022",
    venue: "Nairobi International Conference Centre",
    logoSrc: "/ppra-logo.svg",
    location: {
      address: "Nairobi International Conference Centre, Nairobi, Kenya",
      coordinates: {
        lat: -1.2921,
        lng: 36.8219,
      },
    },
    timetable: [
      {
        id: "day1-1",
        day: "Day 1 - October 10",
        time: "09:00 - 10:30",
        title: "Opening Ceremony",
        speaker: "H.E. William Ruto",
        description: "Welcome address by the President of Kenya",
      },
    ],
    speakers: [
      {
        id: "speaker-1",
        name: "H.E. William Ruto",
        title: "President",
        organization: "Republic of Kenya",
        bio: "President of Kenya and Guest of Honor at the forum.",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetailPage({ params }: PageProps) {
  // Use React.use() to unwrap the params Promise
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [eventData, setEventData] = useState(eventsDatabase["eapf-16"]);

  useEffect(() => {
    console.log("Event ID from route params:", id);

    if (id && id in eventsDatabase) {
      console.log("Found event data for id:", id);
      setEventData(eventsDatabase[id]);
    } else {
      console.log("Using default event data (eapf-16)");
      setEventData(eventsDatabase["eapf-16"]);
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-100">
      <EventDetails event={eventData} />
    </main>
  );
}
