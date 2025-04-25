"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

interface EventHeaderCardProps {
  title: string;
  dateRange: string;
  venue: string;
  logoSrc?: string;
  themeColor?: string;
  organizationName?: string;
  bannerImage?: string;
  bannerThumbnail?: string;
}

export default function EventHeaderCard({
  title,
  dateRange,
  venue,
  logoSrc = "/logo.svg",
  themeColor = "#0C80B3",
  organizationName,
  bannerImage,
  bannerThumbnail,
}: EventHeaderCardProps) {
  const [imgError, setImgError] = React.useState(false);

  // Handle external CDN URLs directly
  const isCdnUrl = (url?: string) =>
    url?.startsWith("https://cdn.summitpoint.co.tz/");

  // Use bannerThumbnail if available, otherwise fallback to bannerImage
  // Ensure imageUrl always has a default value to satisfy TypeScript
  const imageUrl: string =
    imgError || (!bannerThumbnail && !bannerImage)
      ? "/header.png"
      : isCdnUrl(bannerThumbnail)
      ? bannerThumbnail || "/header.png"
      : isCdnUrl(bannerImage)
      ? bannerImage || "/header.png"
      : bannerThumbnail
      ? `/api/banner-image?file=${encodeURIComponent(bannerThumbnail)}`
      : `/api/banner-image?file=${encodeURIComponent(bannerImage || "")}`;

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 hover:text-blue-800 mb-4 transition-colors"
          style={{ color: themeColor }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to events
        </Link>
      </div>

      <div
        className="relative text-white overflow-hidden rounded-xl shadow-lg"
        style={{ backgroundColor: themeColor }}
      >
        {/* Background gradient and image overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-70 z-10"
            style={{
              backgroundImage: `linear-gradient(to right, ${themeColor}, ${themeColor}88)`,
            }}
          />
          {/* Full-width banner image */}
          <div className="absolute inset-0 bg-cover bg-center">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              onError={() => setImgError(true)}
              sizes="100vw"
              unoptimized={isCdnUrl(imageUrl)} // Skip optimization for external CDN URLs
            />
          </div>
        </div>

        {/* Event header content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Logo with improved styling */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white p-3 rounded-xl shadow-xl flex-shrink-0 flex items-center justify-center backdrop-blur-sm bg-white/90 border border-white/20 transition-transform hover:scale-105">
              <Image
                src={isCdnUrl(logoSrc) ? logoSrc : logoSrc || "/logo.svg"}
                alt="Event Logo"
                width={150}
                height={150}
                className="object-contain"
                unoptimized={isCdnUrl(logoSrc)}
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white shadow-sm">
                {title}
              </h1>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                  <CalendarIcon className="h-5 w-5" />
                  <span className="font-medium">{dateRange}</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                  <MapPinIcon className="h-5 w-5" />
                  <span className="font-medium">{venue}</span>
                </div>
              </div>

              {organizationName && (
                <div className="mt-5 bg-white/20 inline-block px-4 py-2 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm border border-white/20">
                  Presented by {organizationName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
