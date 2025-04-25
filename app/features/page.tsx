import { Metadata } from "next";
import Image from "next/image";
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
  HomeIcon,
  CalendarIcon,
  UserIcon,
  BellIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import FeatureCard from "@/components/ui/FeatureCard";

export const metadata: Metadata = {
  title: "Features | SummitPoint",
  description: "Explore all the features available in SummitPoint",
};

export default function FeaturesPage() {
  const primaryColor = "#0C80B3";

  // Create an icon with the right color
  const createIcon = (Icon: any) => (
    <Icon className="w-7 h-7" style={{ color: primaryColor }} />
  );

  // Define all features by page/section
  const featuresByPage = [
    {
      page: "Home",
      icon: createIcon(HomeIcon),
      features: [
        {
          title: "Event Discovery",
          description: "Browse and find events that interest you",
          icon: createIcon(CalendarIcon),
        },
        {
          title: "Quick Registration",
          description: "Register for events with just a few clicks",
          icon: createIcon(UserIcon),
        },
      ],
    },
    {
      page: "Events",
      icon: createIcon(CalendarIcon),
      features: [
        {
          title: "Event Location",
          description: "Find your way to the venue with maps and directions",
          icon: createIcon(MapPinIcon),
        },
        {
          title: "Photo Gallery",
          description: "Browse event photos and memories",
          icon: createIcon(PhotoIcon),
        },
        {
          title: "Timetable",
          description: "View the complete event schedule",
          icon: createIcon(ClockIcon),
        },
      ],
    },
    {
      page: "Speakers",
      icon: createIcon(UserGroupIcon),
      features: [
        {
          title: "Speaker Profiles",
          description: "Learn about event presenters and their backgrounds",
          icon: createIcon(UserGroupIcon),
        },
        {
          title: "Session Information",
          description: "Details about each speaker's sessions",
          icon: createIcon(DocumentTextIcon),
        },
      ],
    },
    {
      page: "Engagement",
      icon: createIcon(ChatBubbleOvalLeftIcon),
      features: [
        {
          title: "Live Chat",
          description: "Join conversations with other attendees",
          icon: createIcon(ChatBubbleOvalLeftEllipsisIcon),
        },
        {
          title: "Surveys & Feedback",
          description: "Share your opinions and help improve future events",
          icon: createIcon(ChartBarIcon),
        },
        {
          title: "Suggestions",
          description: "Submit your ideas directly to event organizers",
          icon: createIcon(ChatBubbleOvalLeftIcon),
        },
      ],
    },
    {
      page: "Resources",
      icon: createIcon(DocumentDuplicateIcon),
      features: [
        {
          title: "Documents",
          description: "Access important files and resources",
          icon: createIcon(DocumentDuplicateIcon),
        },
        {
          title: "Session Materials",
          description: "Download presentations and session content",
          icon: createIcon(DocumentTextIcon),
        },
      ],
    },
    {
      page: "Media",
      icon: createIcon(VideoCameraIcon),
      features: [
        {
          title: "Live Streaming",
          description: "Watch events remotely in real-time",
          icon: createIcon(VideoCameraIcon),
        },
        {
          title: "Recorded Sessions",
          description: "Access past sessions and presentations",
          icon: createIcon(VideoCameraIcon),
        },
      ],
    },
    {
      page: "User Account",
      icon: createIcon(UserIcon),
      features: [
        {
          title: "Profile Management",
          description: "Update your personal information and preferences",
          icon: createIcon(UserIcon),
        },
        {
          title: "Notifications",
          description: "Stay updated with event announcements and changes",
          icon: createIcon(BellIcon),
        },
        {
          title: "Settings",
          description: "Customize your app experience",
          icon: createIcon(CogIcon),
        },
      ],
    },
  ];

  // Speakers data with images
  const speakers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Tech Innovator",
      image: "/speakers/speaker1.jpg",
      sessions: 2,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Industry Expert",
      image: "/speakers/speaker2.jpg",
      sessions: 1,
    },
    {
      id: 3,
      name: "Amara Wilson",
      role: "Thought Leader",
      image: "/speakers/speaker3.jpg",
      sessions: 3,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: primaryColor }}>
        SummitPoint Features
      </h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Explore all the features available across SummitPoint to enhance your
        event experience. From event discovery to engaging with other attendees,
        we provide tools to make your participation seamless and meaningful.
      </p>

      <div className="space-y-12">
        {featuresByPage.map((page) => (
          <div key={page.page} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              {page.icon}
              <h2
                className="text-xl font-semibold"
                style={{ color: primaryColor }}
              >
                {page.page}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={primaryColor}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Speakers Section with Images */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            {createIcon(UserGroupIcon)}
            <h2
              className="text-xl font-semibold"
              style={{ color: primaryColor }}
            >
              Speakers
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Our platform features distinguished speakers from various
            industries. View their profiles, upcoming sessions, and connect with
            them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="flex flex-col items-center">
                <div
                  className="relative w-44 h-44 mb-4 rounded-full overflow-hidden border-4"
                  style={{ borderColor: primaryColor }}
                >
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transform transition-transform hover:scale-110 duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {speaker.name}
                </h3>
                <p className="text-gray-600">{speaker.role}</p>
                <div
                  className="mt-2 px-3 py-1 rounded-full text-white text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  {speaker.sessions}{" "}
                  {speaker.sessions === 1 ? "Session" : "Sessions"}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Speaker Profiles"
              description="Learn about event presenters and their backgrounds"
              icon={createIcon(UserGroupIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Session Information"
              description="Details about each speaker's sessions and topics"
              icon={createIcon(DocumentTextIcon)}
              color={primaryColor}
            />
          </div>
        </div>

        {/* Engagement Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            {createIcon(ChatBubbleOvalLeftIcon)}
            <h2
              className="text-xl font-semibold"
              style={{ color: primaryColor }}
            >
              Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Live Chat"
              description="Join conversations with other attendees"
              icon={createIcon(ChatBubbleOvalLeftEllipsisIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Surveys & Feedback"
              description="Share your opinions and help improve future events"
              icon={createIcon(ChartBarIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Suggestions"
              description="Submit your ideas directly to event organizers"
              icon={createIcon(ChatBubbleOvalLeftIcon)}
              color={primaryColor}
            />
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            {createIcon(DocumentDuplicateIcon)}
            <h2
              className="text-xl font-semibold"
              style={{ color: primaryColor }}
            >
              Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Documents"
              description="Access important files and resources"
              icon={createIcon(DocumentDuplicateIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Session Materials"
              description="Download presentations and session content"
              icon={createIcon(DocumentTextIcon)}
              color={primaryColor}
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            {createIcon(VideoCameraIcon)}
            <h2
              className="text-xl font-semibold"
              style={{ color: primaryColor }}
            >
              Media
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              title="Live Streaming"
              description="Watch events remotely in real-time"
              icon={createIcon(VideoCameraIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Recorded Sessions"
              description="Access past sessions and presentations"
              icon={createIcon(VideoCameraIcon)}
              color={primaryColor}
            />
          </div>
        </div>

        {/* User Account Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            {createIcon(UserIcon)}
            <h2
              className="text-xl font-semibold"
              style={{ color: primaryColor }}
            >
              User Account
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Profile Management"
              description="Update your personal information and preferences"
              icon={createIcon(UserIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Notifications"
              description="Stay updated with event announcements and changes"
              icon={createIcon(BellIcon)}
              color={primaryColor}
            />
            <FeatureCard
              title="Settings"
              description="Customize your app experience"
              icon={createIcon(CogIcon)}
              color={primaryColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
