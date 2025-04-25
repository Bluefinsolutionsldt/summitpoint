"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface EventInfoCardProps {
  title: string;
  items: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
  }>;
  themeColor?: string;
}

export default function EventInfoCard({
  title,
  items,
  themeColor = "#0C80B3",
}: EventInfoCardProps) {
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
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {item.icon && (
                <div
                  className="p-2 rounded-full"
                  style={{
                    backgroundColor: `${themeColor}15`,
                    color: themeColor,
                  }}
                >
                  {item.icon}
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {item.label}
                </div>
                <div className="text-gray-700 font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
