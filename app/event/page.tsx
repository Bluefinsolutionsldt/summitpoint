"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  FileText,
  Camera,
  BarChart3,
  FileQuestion,
  Video,
  MessageCircle,
  MessageSquare,
  ChevronRight,
  Check,
  Calendar,
  Award,
  Briefcase,
  Building,
  Cpu,
  BookOpen,
} from "lucide-react";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import EventFeaturesGrid from "@/components/ui/EventFeaturesGrid";
import { Button } from "@/components/ui/button";

// Event data
const eventData = {
  id: "frs-2025",
  title: "Innovation Week Tanzania and Future Ready Summit 2025",
  subtitle: "Innovation for a Resilient and Inclusive Future",
  dateRange: "May 12-16, 2025",
  venue: "JNICC, Dar es Salaam",
  description:
    "Innovation Week Tanzania is a key annual event since 2015, bringing together a diverse range of stakeholders in Tanzania's innovation ecosystem. It serves as a central platform for showcasing new ideas, encouraging collaboration across sectors, tackling policy issues, and promoting the growth of innovations to drive economic and social progress in the country.More recently, Vodacom's Future Ready Summit, launched in 2024 as a leading forum for technology insights, has become a central part of Innovation Week Tanzania. This integration has strengthened the platform, making it larger and more effective in its mission to accelerate innovation-driven development within Tanzania.",
  coverImage: "/events/save.png",
  focusAreas: [
    {
      title: "Skills for a Smart Future",
      subtitle: "Urban Workforce Evolution",
      description:
        "Developing future-ready skills through innovation, digital education, and upskilling to empower the urban workforce.",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      color: "blue",
    },
    {
      title: "Urban Sustainable Systems",
      subtitle: "Resilient Infrastructure",
      description:
        "Integrating smart technologies and green solutions to build climate-resilient, efficient, and sustainable urban systems.",
      icon: <Building className="h-8 w-8 text-green-500" />,
      color: "green",
    },
    {
      title: "Smart & Inclusive Cities",
      subtitle: "Inclusive Urban Communities",
      description:
        "Leveraging technology and participatory planning to create equitable, accessible, and people-centered urban environments.",
      icon: <Cpu className="h-8 w-8 text-purple-500" />,
      color: "purple",
    },
  ],
  sessionFormat:
    "As the summit takes place within the broader Innovation Week Tanzania, select sessions will be integrated, while others will be dedicated exclusively to the FRS25 Summit agenda. To ensure maximum engagement, certain sessions will run in parallel, allowing delegates to participate in discussions most relevant to their interests.",
  schedule: [
    {
      day: "Day 1",
      date: "Monday, May 12th",
      sessions: [
        {
          time: "Morning",
          title: "Opening Ceremony",
          description:
            "Official opening of the summit with opening keynote and high-level plenary.",
          format: "Plenary",
        },
        {
          time: "Morning",
          title: "Disruptive change makers plenary",
          description:
            "The future of smart cities with an intersection of the youth agenda.",
          format: "Plenary Sessions with robust audience engagement",
        },
      ],
    },
    {
      day: "Day 2",
      date: "Tuesday, May 13th",
      sessions: [
        {
          time: "Morning",
          title: "Empowering People - Digital Inclusion Ceremony",
          description:
            "Smart Cities for All, Bridging the Digital Divide Through Inclusive Technologies",
          format: "Fireside Chat",
        },
        {
          time: "Mid-morning",
          title: "E-Governance in Action",
          description:
            "Presentation by one of the most digitally advanced societies on Smart Governance and how e-government services drive citizen-led urban development.",
          format: "Case Study Presentation",
        },
        {
          time: "Mid-morning",
          title:
            "Sustainable Infrastructure - Smart Mobility & Transport Systems",
          description:
            "Explore the future of smart mobility, focusing on the shift to new powering sources and unlocking smart urban transport solutions.",
          format: "Group TED",
        },
        {
          time: "Afternoon",
          title: "Smart water solutions for future cities",
          description:
            "Explore how IoT sensors, AI-driven analytics, and digital water grids are transforming urban water systems—enabling real-time monitoring, reducing waste, and optimizing distribution.",
          format: "Plenary Session",
        },
        {
          time: "Afternoon",
          title:
            "Sustainable Infrastructure - Digital infrastructure for smart cities",
          description:
            "Smart Energy: A Model for Sustainable Urban Power Management, and Powering the Future through integration of smart grids with renewable energy sources.",
          format: "Case study presentation & Plenary session",
        },
        {
          time: "Throughout the day",
          title: "Policy Roundtables - Hosted by Vodacom",
          description:
            "Focus areas: Satellite and rural coverage, e-Waste management, Infrastructure financing, e-Government and smart cities, Evolution of mobile money, Digitizing critical sectors",
          format: "Closed door sessions - Invite only",
        },
      ],
    },
    {
      day: "Day 3",
      date: "Wednesday, May 14th",
      sessions: [
        {
          time: "Morning",
          title: "Financing Sustainable Infrastructure",
          description:
            "Explore innovative financing solutions like green bonds, sustainability linked loans and blended finance as well as partnerships with government and multilateral agencies.",
          format: "Plenary Session",
        },
        {
          time: "Morning",
          title: "The Role of Public Private Partnerships",
          description:
            "Design PPP agreements that balance private-sector innovation with public-sector oversight, ensuring that projects prioritize societal benefits over profits.",
          format: "Fireside Chat",
        },
        {
          time: "Mid-morning",
          title: "Inclusive Urban Design – A Shenzen Case Study",
          description:
            "Balancing development with resource efficiency and sustainability for smart urban planning strategies that optimize land use, enhance mobility, and integrate green infrastructure.",
          format: "Case Study Presentation",
        },
        {
          time: "Afternoon",
          title: "The future workplace and bridging the skill gap",
          description:
            "Embracing disruptive technology, the rise of Gig economy and freelance work/digital nomads. Will the future of work liberate us or enslave us to machines?",
          format: "Plenary Session",
        },
        {
          time: "Throughout the day",
          title: "Policy Roundtables - Hosted by Vodacom",
          description:
            "Focus areas include satellite coverage, e-waste, infrastructure, e-government, mobile money evolution, and digitizing critical sectors.",
          format: "Closed door sessions - Invite only",
        },
      ],
    },
    {
      day: "Day 4",
      date: "Thursday, May 15th",
      sessions: [
        {
          time: "Throughout the day",
          title: "Youth Engagement",
          description:
            "Code Like a Girl Workshop, Vodacom Digital Accelerator, and more activities.",
          format: "Workshops & Sessions",
        },
      ],
    },
    {
      day: "Day 5",
      date: "Friday, May 16th",
      sessions: [
        {
          time: "Mid-morning",
          title: "Declarations from the weeklong summit",
          description: "Presentation of summit outcomes and future directions.",
          format: "Plenary",
        },
        {
          time: "Afternoon",
          title: "Youth showcase & Capture the flag universities challenge",
          description: "Joint closing ceremony and youth innovation showcase.",
          format: "Competition & Ceremony",
        },
      ],
    },
  ],
};

export default function EventPage() {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render content on server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={eventData.coverImage}
          alt={eventData.title}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/100 via-blue-800/70 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <div className="bg-blue-600/30 text-white text-xs sm:text-sm font-medium px-3 py-1 rounded-full w-max backdrop-blur-sm mb-2 sm:mb-3">
            May 12-16, 2025
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
            {eventData.title}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 font-light max-w-2xl mb-2 sm:mb-3">
            {eventData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-white mt-1 sm:mt-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">{eventData.venue}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">
                {eventData.dateRange}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Description */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          About Innovation Week Tanzania and Future Ready Summit 2025
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {eventData.description}
        </p>
      </div>

      {/* Event Features Section */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">
          Event Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Event Location */}
          <FeatureCard
            href="/event/venue"
            icon={<MapPin className="h-8 w-8 text-blue-500" />}
            title="Event location"
            description="Find your way to the venue"
            bgColor="bg-blue-50"
          />

          {/* Photos */}
          <FeatureCard
            href="/event/gallery"
            icon={<Camera className="h-8 w-8 text-blue-500" />}
            title="Photos"
            description="Event gallery"
            bgColor="bg-blue-50"
          />

          {/* Timetable */}
          <FeatureCard
            href="/event/schedule"
            icon={<Clock className="h-8 w-8 text-blue-500" />}
            title="Timetable"
            description="Detailed event schedule"
            bgColor="bg-blue-50"
          />

          {/* Speakers */}
          <FeatureCard
            href="/event/speakers"
            icon={<Users className="h-8 w-8 text-blue-500" />}
            title="Speakers"
            description="Meet the presenters"
            bgColor="bg-blue-50"
          />

          {/* Chatroom */}
          {/* <FeatureCard
            href="/event/chatroom"
            icon={<MessageCircle className="h-8 w-8 text-blue-500" />}
            title="Chatroom"
            description="Join the conversation"
            
            bgColor="bg-blue-50"
          /> */}

          {/* Documents */}
          <FeatureCard
            href="/event/documents"
            icon={<FileText className="h-8 w-8 text-blue-500" />}
            title="Documents"
            description="Important files"
            bgColor="bg-blue-50"
          />

          {/* Live stream */}
          <FeatureCard
            href="/event/livestream"
            icon={<Video className="h-8 w-8 text-blue-500" />}
            title="Live stream"
            description="Watch remotely"
            bgColor="bg-blue-50"
          />

          {/* Surveys */}
          <FeatureCard
            href="/event/feedback"
            icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
            title="Survey & Suggestions"
            description="Share your thoughts and ideas"
            bgColor="bg-blue-50"
          />

        
        </div>
      </div>

      {/* Timetable */}
      <section id="timetable" className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-center mx-auto">
            <p className="text-blue-600 font-medium text-sm uppercase tracking-wider mb-2">
              What to expect
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Timetable</h2>
            <p className="text-gray-600 leading-relaxed">
              Check out our event schedule and plan your day.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Link
              href="/events/FRS_Programme 25.03.25.pdf"
              target="_blank"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download Full Programme
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  count?: number;
  bgColor: string;
}

function FeatureCard({
  href,
  icon,
  title,
  description,
  count,
  bgColor,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center mb-4`}
        >
          {icon}
        </div>

        <h3 className="font-semibold text-gray-800 text-lg mb-1">{title}</h3>

        {count !== undefined && (
          <div className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-medium mb-2">
            {count}
          </div>
        )}

        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
