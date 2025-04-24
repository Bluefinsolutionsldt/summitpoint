"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import EventCard from "@/components/EventCard";
import { fetchEvents } from "@/lib/api-util";

// Event interface
interface Event {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string | null;
  city: string;
  venue: string;
  bannerImage: string;
  themeColor: string;
  organization: {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    logo: string | null;
  };
}

// Filter options type
type FilterOption = "all" | "upcoming" | "ongoing";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("upcoming");

  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Fetch events
  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        console.log("Dashboard events data:", data[0]); // Log the first event to see structure
        setEvents(data || []);
        setFilteredEvents(data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      getEvents();
    }
  }, [isAuthenticated]);

  // Filter events based on selected filter
  useEffect(() => {
    const now = new Date();

    let filtered = [...events];

    if (activeFilter === "upcoming") {
      filtered = events.filter((event) => {
        const startDate = new Date(event.startDate);
        return startDate > now;
      });
    } else if (activeFilter === "ongoing") {
      filtered = events.filter((event) => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        return startDate <= now && endDate >= now;
      });
    }

    setFilteredEvents(filtered);
  }, [activeFilter, events]);

  // Filter change handler
  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
  };

  // Show loading state
  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // Protected content (only shown if authenticated)
  return (
    <div className="container mx-auto px-4 py-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div>
            {user && (
              <p className="text-black dark:text-gray-400 mt-1 font-medium text-lg sm:text-[3rem] gap-4 flex flex-col">
                {getTimeBasedGreeting()},{" "}
                <span className="text-blue-600 text-lg sm:text-xl  dark:text-blue-400">
                  {user.name}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <button
            onClick={() => handleFilterChange("all")}
            className={`py-2 px-4 font-medium ${
              activeFilter === "all"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => handleFilterChange("upcoming")}
            className={`py-2 px-4 font-medium ${
              activeFilter === "upcoming"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => handleFilterChange("ongoing")}
            className={`py-2 px-4 font-medium ${
              activeFilter === "ongoing"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ongoing Events
          </button>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              startDate={event.startDate}
              endDate={event.endDate}
              description={event.description}
              city={event.city}
              venue={event.venue}
              bannerImage={event.bannerImage}
              themeColor={event.themeColor}
              organization={event.organization}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-600">
            {activeFilter === "all"
              ? "There are no events at the moment. Please check back later."
              : activeFilter === "upcoming"
              ? "There are no upcoming events at the moment. Please check back later."
              : "There are no ongoing events at the moment. Please check back later."}
          </p>
        </div>
      )}
    </div>
  );
}
