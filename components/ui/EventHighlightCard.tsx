"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface EventHighlightCardProps {
  title: string;
  highlights: string[];
  themeColor?: string;
}

export default function EventHighlightCard({
  title,
  highlights,
  themeColor = "#0C80B3",
}: EventHighlightCardProps) {
  return (
    <Card
      className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-t-4"
      style={{ borderTopColor: themeColor }}
    >
      <CardHeader className="pb-2">
        <CardTitle
          className="text-lg font-semibold"
          style={{ color: themeColor }}
        >
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className="p-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: `${themeColor}15` }}
              >
                <CheckCircle
                  size={16}
                  className="flex-shrink-0"
                  style={{ color: themeColor }}
                />
              </div>
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
