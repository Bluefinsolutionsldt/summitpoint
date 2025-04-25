"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  color?: string;
  onClick?: () => void;
}

export default function FeatureCard({
  title,
  description,
  icon,
  color = "#0C80B3",
  onClick,
}: FeatureCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "flex flex-col h-full p-6 rounded-xl transition-all duration-300 hover:bg-opacity-10 cursor-pointer group overflow-hidden relative border border-gray-100",
        onClick
          ? "hover:shadow-md hover:translate-y-[-2px]"
          : "hover:shadow-md hover:translate-y-[-2px]"
      )}
      style={{
        background: `linear-gradient(to bottom, ${color}05, ${color}10)`,
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
      <div className="z-10 flex flex-col">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>

        <h3 className="font-medium text-gray-800 mb-2 text-lg">{title}</h3>

        {description && (
          <p className="text-sm text-gray-500 mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
