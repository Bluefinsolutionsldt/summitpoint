"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface EventCardProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string | null;
  city: string;
  venue: string;
  bannerImage: string;
  themeColor: string;
  organization: {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    logo: string | null;
  };
}

export default function EventCard({
  id,
  name,
  startDate,
  endDate,
  description,
  city,
  venue,
  bannerImage,
  themeColor = "#0C80B3",
  organization,
}: EventCardProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  const handleCardClick = () => {
    router.push(`/event-detail/${id}`);
  };

  const handleAttendEvent = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop card click event from firing
    router.push(`/event-detail/${id}`);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  // Construct the image URL for the card view
  const imageUrl =
    imgError || !bannerImage
      ? "/side.png"
      : `/api/banner-image?file=${encodeURIComponent(
          bannerImage
        )}&thumbnail=true`;

  // Extract the day and month for the date badge
  const eventDay = formatDate(startDate).split(" ")[0];
  const eventMonth = formatDate(startDate).split(" ")[1];

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image container with aspect ratio */}
      <div className="relative pt-[56.25%] bg-gray-200">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={handleImageError}
        />

        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 text-center min-w-16">
          <div className="text-2xl font-bold">{eventDay}</div>
          <div className="text-sm uppercase" style={{ color: themeColor }}>
            {eventMonth}
          </div>
        </div>

        {/* Organization badge */}
        {organization?.name && (
          <div
            className="absolute bottom-4 left-4 text-white text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: `${themeColor}CC` }}
          >
            {organization.name}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex-grow flex flex-col">
        <h3
          className="text-lg font-semibold line-clamp-2 mb-2"
          style={{ color: themeColor }}
        >
          {name}
        </h3>

        {/* Event metadata */}
        <div className="mt-2 space-y-2 text-gray-600 text-sm mb-4">
          <div className="flex items-start">
            <CalendarIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>
              {formatDate(startDate)} to {formatDate(endDate)}
            </span>
          </div>

          <div className="flex items-start">
            <MapPinIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>
              {venue}, {city}
            </span>
          </div>
        </div>

        {/* Description - truncated to 2 lines */}
        {description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>
        )}

        {/* Action button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={handleAttendEvent}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors"
            style={{
              backgroundColor: `${themeColor}15`,
              color: themeColor,
            }}
          >
            <span>View Event</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
