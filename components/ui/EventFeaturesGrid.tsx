"use client";

import { useRouter } from "next/navigation";
import EventFeatureCard from "@/components/ui/EventFeatureCard";
import {
  MapPinIcon,
  PhotoIcon,
  ClockIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface EventFeaturesGridProps {
  eventId: string;
  themeColor?: string;
  // Feature counts
  counts?: {
    photos?: number;
    timetable?: number;
    speakers?: number;
    chatroom?: number;
    surveys?: number;
    documents?: number;
  };
}

export default function EventFeaturesGrid({
  eventId,
  themeColor = "#0C80B3",
  counts = {},
}: EventFeaturesGridProps) {
  const router = useRouter();

  // Create an icon with the right color
  const createIcon = (Icon: any) => (
    <Icon className="w-7 h-7" style={{ color: themeColor }} />
  );

  // Define all features
  const features = [
    {
      id: "location",
      title: "Event location",
      description: "Find your way to the venue",
      icon: createIcon(MapPinIcon),
      path: `/event-detail/${eventId}/location`,
    },
    {
      id: "photos",
      title: "Photos",
      description: "Event gallery",
      icon: createIcon(PhotoIcon),
      path: `/event-detail/${eventId}/photos`,
      count: counts.photos,
    },
    {
      id: "timetable",
      title: "Timetable",
      description: "Event schedule",
      icon: createIcon(ClockIcon),
      path: `/event-detail/${eventId}/timetable`,
      count: counts.timetable,
    },
    {
      id: "speakers",
      title: "Speakers",
      description: "Meet the presenters",
      icon: createIcon(UserGroupIcon),
      path: `/event-detail/${eventId}/speakers`,
      count: counts.speakers,
    },
    {
      id: "chatroom",
      title: "Chatroom",
      description: "Join the conversation",
      icon: createIcon(ChatBubbleOvalLeftEllipsisIcon),
      path: `/event-detail/${eventId}/chatroom`,
      count: counts.chatroom,
    },
    {
      id: "surveys",
      title: "Surveys",
      description: "Share your feedback",
      icon: createIcon(ChartBarIcon),
      path: `/event-detail/${eventId}/surveys`,
      count: counts.surveys,
    },
    {
      id: "documents",
      title: "Documents",
      description: "Important files",
      icon: createIcon(DocumentDuplicateIcon),
      path: `/event-detail/${eventId}/documents`,
      count: counts.documents,
    },
    {
      id: "sessions",
      title: "Sessions",
      description: "Event agenda",
      icon: createIcon(DocumentTextIcon),
      path: `/event-detail/${eventId}/sessions`,
    },
    {
      id: "livestream",
      title: "Live stream",
      description: "Watch remotely",
      icon: createIcon(VideoCameraIcon),
      path: `/event-detail/${eventId}/livestream`,
    },
    {
      id: "suggestions",
      title: "Suggestions",
      description: "Share your ideas",
      icon: createIcon(ChatBubbleOvalLeftIcon),
      path: `/event-detail/${eventId}/suggestions`,
    },
  ];

  const handleFeatureClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-white rounded-xl shadow-md py-8 px-4 overflow-hidden">
      <h2
        className="text-xl font-semibold mb-6 px-4"
        style={{ color: themeColor }}
      >
        Event Features
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {features.map((feature) => (
          <EventFeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={themeColor}
            count={feature.count}
            onClick={() => handleFeatureClick(feature.path)}
          />
        ))}
      </div>
    </div>
  );
}
