import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  CalendarIcon,
  PhotoIcon,
  ClockIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftIcon,
  UserGroupIcon,
  ArrowRightIcon,
  ChartBarIcon,
  TicketIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

interface EventDetailOption {
  icon: React.ReactNode;
  label: string;
  count?: number;
  href: string;
  id: string;
}

interface EventDetailCardProps {
  title: string;
  dateRange: string;
  venue: string;
  logoSrc: string;
  onSectionSelect?: (sectionId: string) => void;
  eventId?: string;
  isDetailView?: boolean;
}

export default function EventDetailCard({
  title,
  dateRange,
  venue,
  logoSrc,
  onSectionSelect,
  eventId,
  isDetailView = false,
}: EventDetailCardProps) {
  const router = useRouter();

  const options: EventDetailOption[] = [
    {
      icon: <MapPinIcon className="w-7 h-7 text-blue-600" />,
      label: "Event location",
      href: `/event-detail/${eventId}/location`,
      id: "location",
    },
    {
      icon: <PhotoIcon className="w-7 h-7 text-blue-600" />,
      label: "Photos",
      href: `/event-detail/${eventId}/photos`,
      id: "photos",
    },
    {
      icon: <ClockIcon className="w-7 h-7 text-blue-600" />,
      label: "Timetable",
      count: 69,
      href: `/event-detail/${eventId}/timetable`,
      id: "timetable",
    },
    {
      icon: <UserGroupIcon className="w-7 h-7 text-blue-600" />,
      label: "Speakers",
      count: 21,
      href: `/event-detail/${eventId}/speakers`,
      id: "speakers",
    },
    {
      icon: (
        <ChatBubbleOvalLeftEllipsisIcon className="w-7 h-7 text-blue-600" />
      ),
      label: "Chatroom",
      count: 127,
      href: `/event-detail/${eventId}/chatroom`,
      id: "chatroom",
    },
    {
      icon: <ChartBarIcon className="w-7 h-7 text-blue-600" />,
      label: "Surveys",
      count: 1,
      href: `/event-detail/${eventId}/surveys`,
      id: "surveys",
    },
    {
      icon: <DocumentDuplicateIcon className="w-7 h-7 text-blue-600" />,
      label: "Documents",
      count: 16,
      href: `/event-detail/${eventId}/documents`,
      id: "documents",
    },
    {
      icon: <DocumentTextIcon className="w-7 h-7 text-blue-600" />,
      label: "Sessions",
      href: `/event-detail/${eventId}/sessions`,
      id: "sessions",
    },
    {
      icon: <VideoCameraIcon className="w-7 h-7 text-blue-600" />,
      label: "Live stream",
      href: `/event-detail/${eventId}/livestream`,
      id: "livestream",
    },
    {
      icon: <ChatBubbleOvalLeftIcon className="w-7 h-7 text-blue-600" />,
      label: "Suggestions",
      href: `/event-detail/${eventId}/suggestions`,
      id: "suggestions",
    },
  ];

  // Create a copy of the options with white icons for mobile view
  const mobileOptions = options.map((option) => ({
    ...option,
    icon: React.cloneElement(
      option.icon as React.ReactElement,
      {
        className: "w-6 h-6 text-white",
      } as React.HTMLAttributes<SVGElement>
    ),
  }));

  const handleOptionClick = (id: string, e: React.MouseEvent) => {
    if (onSectionSelect) {
      e.preventDefault();
      onSectionSelect(id);
    }
  };

  // If we're already in detail view, don't show the detailed options
  if (isDetailView) {
    return (
      <>
        {/* Mobile View - Exactly like the image */}
        <div className="flex flex-col w-full md:hidden">
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="my-2">{dateRange}</p>
            <p className="flex items-center gap-2">
              <span>Venue:</span> {venue}
            </p>
          </div>

          <div className="p-8 flex justify-center">
            <Image
              src={logoSrc || "/ppra-logo.svg"}
              alt="Event Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-0.5">
            {mobileOptions.map((option, index) => (
              <Link
                key={index}
                href={option.href}
                className={`flex flex-col items-center justify-center p-4 ${
                  option.label === "Event location"
                    ? "bg-green-500"
                    : option.label === "Photos"
                    ? "bg-blue-500"
                    : "bg-white"
                }`}
                onClick={(e) => handleOptionClick(option.id, e)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    option.label === "Event location" ||
                    option.label === "Photos"
                      ? ""
                      : "bg-blue-500"
                  } mb-2`}
                >
                  {option.icon}
                </div>
                <span
                  className={`text-center ${
                    option.label === "Event location" ||
                    option.label === "Photos"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {option.label}
                </span>
                {option.count && (
                  <div
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${
                      option.label === "Event location" ||
                      option.label === "Photos"
                        ? "bg-white text-blue-500"
                        : "bg-orange-500 text-white"
                    } font-bold mt-2`}
                  >
                    {option.count}
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="h-5 bg-gray-100 flex justify-center items-center">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Desktop View */}
        <div className="hidden md:block">
          {/* Hero section with event info */}
          <div className="relative bg-blue-800 text-white">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90"></div>
              <div className="absolute inset-0 bg-[url('/header.png')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="w-40 h-40 bg-white p-3 rounded-xl shadow-lg flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={logoSrc || "/ppra-logo.svg"}
                    alt="Event Logo"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                  <div className="mt-2 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>{dateRange}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{venue}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {options.map((option, index) => (
                  <Link
                    key={index}
                    href={option.href}
                    className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors"
                    onClick={(e) => handleOptionClick(option.id, e)}
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      {option.icon}
                    </div>
                    <span className="text-center font-medium text-gray-800">
                      {option.label}
                    </span>
                    {option.count && (
                      <div className="mt-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {option.count}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{dateRange}</p>
            <p className="mt-1 text-sm text-gray-500 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {venue}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href={`/event-detail/${eventId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Details
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
