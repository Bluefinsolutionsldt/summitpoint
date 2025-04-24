import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EventDetailCard from "./EventDetailCard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    dateRange: string;
    venue: string;
    logoSrc: string;
    location?: {
      address: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    timetable?: Array<{
      id: string;
      day: string;
      time: string;
      title: string;
      speaker?: string;
      description?: string;
    }>;
    speakers?: Array<{
      id: string;
      name: string;
      title: string;
      organization: string;
      bio?: string;
      photoUrl?: string;
    }>;
  };
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to events
        </Link>
      </div>

      <EventDetailCard
        title={event.title}
        dateRange={event.dateRange}
        venue={event.venue}
        logoSrc={event.logoSrc}
        eventId={event.id}
        isDetailView={true}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Event Overview</h2>
          <p className="text-gray-700 mb-4">
            Welcome to {event.title}. This event brings together professionals
            and stakeholders in the procurement sector across East Africa to
            discuss challenges, innovations, and opportunities in the field.
          </p>
          <p className="text-gray-700 mb-4">
            Please use the navigation options above to explore different aspects
            of the event, including the schedule, speakers, venue location, and
            more.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Event Highlights</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>World-class speakers and industry experts</li>
                <li>Networking opportunities with professionals</li>
                <li>Interactive panel discussions and workshops</li>
                <li>Exhibition showcasing latest innovations</li>
                <li>Cultural evening and gala dinner</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Key Information</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Dates:</span> {event.dateRange}
                </p>
                <p>
                  <span className="font-medium">Venue:</span> {event.venue}
                </p>
                <p>
                  <span className="font-medium">Registration:</span> Opens daily
                  at 8:00 AM
                </p>
                <p>
                  <span className="font-medium">Languages:</span> English,
                  Swahili (translation available)
                </p>
                <p>
                  <span className="font-medium">Dress Code:</span> Business
                  Formal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
