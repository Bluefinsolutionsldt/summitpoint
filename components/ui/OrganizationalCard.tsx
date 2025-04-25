"use client";

import React from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrganizationalCardProps {
  type: string;
  title: string;
  description: string;
  rating?: number;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
}

export default function OrganizationalCard({
  type,
  title,
  description,
  rating,
  percentage,
  color = "#6777DC",
  icon,
}: OrganizationalCardProps) {
  // Truncate description if it's too long
  const truncatedDescription =
    description.length > 80 ? `${description.slice(0, 80)}...` : description;

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl p-6 h-[250px] flex flex-col text-white justify-between shadow-md border-0",
        "group hover:scale-[1.02] transition-all duration-300 ease-out"
      )}
      style={{
        backgroundColor: color,
        backgroundImage:
          "radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 60%)",
      }}
    >
      {/* Add decorative curves */}
      <div className="absolute right-0 top-0 bottom-0 w-3/4 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute right-[-120px] w-[300px] h-[300px] rounded-full border-2 border-white/10 group-hover:border-white/20 transition-all duration-500"
            style={{
              top: `${100 + i * 40}px`,
              transitionDelay: `${i * 80}ms`,
            }}
          ></div>
        ))}
      </div>

      {/* Background glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}90, transparent 70%)`,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex justify-between items-start">
        <span className="text-sm font-medium opacity-90 tracking-wide uppercase bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
          {type}
        </span>
        {icon && (
          <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 border border-white/20">
            {icon}
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-2">
        <h3 className="text-3xl font-bold leading-tight group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-sm text-white/80 line-clamp-2 group-hover:text-white transition-colors duration-300">
          {truncatedDescription}
        </p>
      </div>

      {/* Ratings */}
      {(rating || percentage) && (
        <div className="relative z-10 flex items-center space-x-4">
          {rating && (
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <Star className="w-5 h-5 fill-white text-white" />
              <span className="font-bold">{rating.toFixed(1)}</span>
            </div>
          )}
          {percentage && (
            <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                %
              </div>
              <span className="font-bold">{percentage}%</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
