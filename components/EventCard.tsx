import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";

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
    name: string;
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
  themeColor,
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

  const handleImageError = () => {
    setImgError(true);
  };

  // Construct the image URL based on the banner image filename
  // Use our proxy API route to handle authentication with a query parameter
  // We use thumbnails for the card view for better performance
  const imageUrl =
    imgError || !bannerImage
      ? "/side.png"
      : `/api/banner-image?file=${encodeURIComponent(
          bannerImage
        )}&thumbnail=true`;

  // Default color if themeColor is not provided
  const cardColor = themeColor || "#0C80B3";

  // Extract the day for the date badge
  const eventDay = formatDate(startDate).split(" ")[0];
  const eventMonth = formatDate(startDate).split(" ")[1];

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
      style={{ maxWidth: "400px" }}
    >
      <div className="w-full h-48 relative">
        {/* Date badge */}
        <div
          className="absolute top-4 left-4 z-20 rounded-lg w-20 h-20 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: cardColor }}
        >
          <span className="text-2xl font-bold">{eventDay}</span>
          <span className="text-sm">{eventMonth}</span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

        {/* Banner image */}
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
        />

        {/* Sponsor logos at the top */}
        <div className="absolute top-2 right-2 z-20 flex space-x-2">
          {organization?.name && (
            <div className="bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
              {organization.name}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3
            className="text-lg font-bold mb-2 line-clamp-2"
            style={{ color: cardColor }}
          >
            {name}
          </h3>

          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}

          <div className="space-y-2 mt-3">
            <div className="flex items-start gap-2 text-gray-700">
              <CalendarIcon
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: cardColor }}
              />
              <span className="text-sm">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>

            <div className="flex items-start gap-2 text-gray-700">
              <MapPinIcon
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: cardColor }}
              />
              <span className="text-sm">
                {venue}, {city}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="mt-4 group w-full rounded-md font-medium text-white flex items-center justify-center gap-2 transition-all duration-200"
          style={{ backgroundColor: cardColor }}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Attend Event
          <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
