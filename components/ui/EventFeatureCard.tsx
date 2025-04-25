"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EventFeatureCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  color?: string;
  count?: number;
  onClick?: () => void;
}

export default function EventFeatureCard({
  title,
  description,
  icon,
  color = "#ffffff",
  count,
  onClick,
}: EventFeatureCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "flex flex-col items-center p-5 rounded-xl transition-all duration-300 hover:bg-opacity-10 cursor-pointer group overflow-hidden relative border-none",
        onClick ? "hover:shadow-md hover:translate-y-[-2px]" : ""
      )}
      style={{
        background: `linear-gradient(to bottom, ${color}05, ${color}15)`,
      }}
    >
      {/* Hover effect - subtle gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent 50%)`,
        }}
      />

      {/* Main content with z-index to stay above the hover effect */}
      <div className="z-10 flex flex-col items-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-3 transform transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>

        <span className="text-center font-medium text-gray-800 mb-1">
          {title}
        </span>

        {count !== undefined && (
          <div
            className="mt-2 text-white text-xs font-medium px-2.5 py-0.5 rounded-full group-hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
          >
            {count}
          </div>
        )}

        {description && (
          <p className="mt-2 text-sm text-gray-500 text-center max-w-[200px] opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
