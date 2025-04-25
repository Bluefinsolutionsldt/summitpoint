"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PlayCircle,
  Calendar,
  Clock,
  Users,
  Filter,
  Video,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  X,
  Bell,
  Mail,
  Check,
} from "lucide-react";

// Define session data
const sessions = [
  {
    id: "opening-ceremony",
    title: "Opening Ceremony",
    description:
      "Official opening of the summit with opening keynote and high-level plenary.",
    date: "May 12, 2025",
    time: "09:00 - 10:30 EAT",
    speaker: "Dr. James Mwangi",
    speakerTitle: "Minister of Technology",
    image: "/events/save.png",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Main Stage", "Keynote"],
  },
  {
    id: "smart-cities-panel",
    title: "Smart Cities for All: Digital Inclusion Panel",
    description:
      "Expert panel discussing how to ensure smart cities benefit all citizens through inclusive technologies.",
    date: "May 12, 2025",
    time: "11:00 - 12:30 EAT",
    speaker: "Sarah Kimani",
    speakerTitle: "Digital Inclusion Expert",
    image: "/events/mainpage event.png",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Panel", "Digital Inclusion"],
  },
  {
    id: "sustainable-infrastructure",
    title: "Sustainable Infrastructure: Smart Mobility & Transport Systems",
    description:
      "Explore the future of smart mobility, focusing on the shift to new powering sources and unlocking smart urban transport solutions.",
    date: "May 13, 2025",
    time: "10:00 - 11:30 EAT",
    speaker: "Prof. Caroline Nombo",
    speakerTitle: "Urban Planning Expert",
    image: "/events/speakers/Prof. Caroline Nombo.png",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Session", "Smart Mobility"],
  },
  {
    id: "financing-innovation",
    title: "Financing Sustainable Infrastructure",
    description:
      "Explore innovative financing solutions like green bonds, sustainability linked loans and blended finance as well as partnerships with government and multilateral agencies.",
    date: "May 14, 2025",
    time: "09:00 - 10:30 EAT",
    speaker: "Dr. Amos Nungu",
    speakerTitle: "Financial Specialist",
    image: "/events/speakers/Dr. Amos Nungu.jpg",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Session", "Finance"],
  },
  {
    id: "smart-water-solutions",
    title: "Smart Water Solutions for Future Cities",
    description:
      "Explore how IoT sensors, AI-driven analytics, and digital water grids are transforming urban water systems—enabling real-time monitoring, reducing waste, and optimizing distribution.",
    date: "May 13, 2025",
    time: "14:00 - 15:30 EAT",
    speaker: "Joseph Manirakiza",
    speakerTitle: "Innovation Program Manager",
    image: "/events/speakers/JOSEPH MANIRAKIZA-PROGRAMME MANAGER FUNGUO .jpg",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Session", "Water Management"],
  },
  {
    id: "future-workplace",
    title: "The Future Workplace and Bridging the Skill Gap",
    description:
      "Embracing disruptive technology, the rise of Gig economy and freelance work/digital nomads. Will the future of work liberate us or enslave us to machines?",
    date: "May 14, 2025",
    time: "14:00 - 15:30 EAT",
    speaker: "Zuwena Farah",
    speakerTitle: "Foundation Director",
    image: "/events/speakers/ZUWENA FARAH-VODACOM FOUNDATION.webp",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Panel", "Future of Work"],
  },
  {
    id: "summit-declaration",
    title: "Declarations from the Weeklong Summit",
    description: "Presentation of summit outcomes and future directions.",
    date: "May 16, 2025",
    time: "10:00 - 11:30 EAT",
    speaker: "Shigeki Komatsubara",
    speakerTitle: "UNDP Representative",
    image: "/events/speakers/Shigeki Komatsubara.jpg",
    streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isLive: false,
    isPast: false,
    tags: ["Main Stage", "Closing"],
  },
];

export default function LivestreamPage() {
  const [activeFilter, setActiveFilter] = useState<string>("upcoming");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showNotLiveModal, setShowNotLiveModal] = useState<boolean>(false);
  const [isReminderSet, setIsReminderSet] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  // Extract all unique tags
  const allTags = Array.from(
    new Set(sessions.flatMap((session) => session.tags))
  );

  // Filter sessions based on selected filter
  const getFilteredSessions = () => {
    let filtered = [...sessions];

    // First filter by status
    if (activeFilter === "live") {
      filtered = filtered.filter((session) => session.isLive);
    } else if (activeFilter === "upcoming") {
      filtered = filtered.filter(
        (session) => !session.isLive && !session.isPast
      );
    } else if (activeFilter === "past") {
      filtered = filtered.filter((session) => session.isPast);
    }

    // Then filter by tag if one is selected
    if (activeTag) {
      filtered = filtered.filter((session) => session.tags.includes(activeTag));
    }

    return filtered;
  };

  const filteredSessions = getFilteredSessions();

  // Find current live session if any
  const currentLiveSession = sessions.find((session) => session.isLive);

  // Handle session click
  const handleSessionClick = (session: any, e: React.MouseEvent) => {
    e.preventDefault();

    if (session.isLive) {
      // If session is live, allow direct navigation to the stream URL
      window.open(session.streamUrl, "_blank");
    } else {
      // If not live, show the modal
      setSelectedSession(session);
      setShowNotLiveModal(true);
    }
  };

  // Handle reminder submission
  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, here you would save the email and session info to a database
    // For now, we'll just show a success message
    setIsReminderSet(true);

    // Close modal after 3 seconds
    setTimeout(() => {
      setShowNotLiveModal(false);
      setIsReminderSet(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Event Livestream
        </h1>
        <p className="text-gray-600 mb-6">
          Watch live and recorded sessions from the Future Ready Summit 2025
        </p>

        {/* Note about upcoming livestreams */}
        <div className="mb-10 bg-blue-50 border border-blue-100 rounded-xl overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center">
            <div className="flex items-center">
              <span className="font-medium">UPCOMING LIVESTREAMS</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              No sessions are currently live. The first session will begin on
              May 12, 2025. Browse the upcoming sessions below and set reminders
              to be notified when they go live.
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All Sessions
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "live"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveFilter("live")}
            >
              Live Now
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeFilter === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                activeFilter === "past"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveFilter("past")}
            >
              Past
            </button>
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={activeTag || ""}
              onChange={(e) => setActiveTag(e.target.value || null)}
            >
              <option value="">All Topics</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Sessions list */}
        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={session.image}
                    alt={session.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {session.isLive && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse mr-1"></div>
                      LIVE
                    </div>
                  )}
                  {session.isPast && (
                    <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded-md">
                      RECORDED
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={session.streamUrl}
                      onClick={(e) => handleSessionClick(session, e)}
                      className="bg-blue-600 bg-opacity-80 hover:bg-opacity-100 text-white rounded-full p-3 transition-all transform hover:scale-110"
                    >
                      <PlayCircle className="h-8 w-8" />
                    </a>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {session.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-medium text-lg mb-1">{session.title}</h3>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{session.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{session.time.split(" ")[0]}</span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{session.speaker}</span>
                    </div>

                    <a
                      href={session.streamUrl}
                      onClick={(e) => handleSessionClick(session, e)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                    >
                      Watch {session.isPast ? "Recording" : "Session"}{" "}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No sessions found
            </h3>
            <p className="text-gray-500">
              {activeFilter === "live"
                ? "There are no live sessions at the moment."
                : "No sessions match the selected filters."}
            </p>
          </div>
        )}

        {/* Technical information */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Technical Information
          </h3>
          <p className="text-gray-700 mb-2">
            For the best viewing experience, please ensure you have a stable
            internet connection. All livestreams are available in HD quality
            (720p) and will be recorded for later viewing.
          </p>
          <p className="text-gray-700">
            If you experience any technical issues, please email{" "}
            <a
              href="mailto:support@frs2025.example.com"
              className="text-blue-600 hover:underline"
            >
              support@frs2025.example.com
            </a>
          </p>
        </div>
      </div>

      {/* Not Live Modal */}
      {showNotLiveModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowNotLiveModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {isReminderSet ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reminder Set!</h3>
                <p className="text-gray-600">
                  We'll notify you when this session goes live.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-yellow-50 rounded-lg p-4 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">
                      This session is not live yet
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      {selectedSession.isPast
                        ? "This session has already ended."
                        : `This session will be live on ${selectedSession.date} at ${selectedSession.time}.`}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {selectedSession.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{selectedSession.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{selectedSession.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span>
                      {selectedSession.speaker}, {selectedSession.speakerTitle}
                    </span>
                  </div>
                </div>

                {!selectedSession.isPast && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-blue-600" />
                      Get notified when this session goes live
                    </h4>

                    <form onSubmit={handleReminderSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => setShowNotLiveModal(false)}
                          className="flex-1 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Set Reminder
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
