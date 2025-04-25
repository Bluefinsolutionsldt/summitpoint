"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  UserIcon,
  DocumentIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  DocumentTextIcon,
  ClockIcon,
  PhotoIcon,
  ChartBarIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { eventAPI } from "@/lib/api";
import { fetchEventById } from "@/lib/api-util";

// Fallback data in case API fails
const fallbackEventData = {
  id: "eapf-16",
  title: "16th EAST AFRICAN PROCUREMENT FORUM",
  dateRange: "09 to 12 Sep 2024",
  venue: "Arusha International Conference Centre",
  logoSrc: "/ppra-logo.svg",
  location: {
    address: "Arusha International Conference Centre, Arusha, Tanzania",
    coordinates: {
      lat: -3.3695,
      lng: 36.6942,
    },
  },
  timetable: [],
  speakers: [],
  sessions: [],
  photos: [],
  surveys: [],
};

// Map section names to display titles
const sectionTitles: { [key: string]: string } = {
  location: "Event Location",
  photos: "Event Photos",
  timetable: "Event Timetable",
  speakers: "Event Speakers",
  chatroom: "Event Chat",
  surveys: "Event Surveys",
  documents: "Event Documents",
  sessions: "Event Sessions",
  livestream: "Live Stream",
  suggestions: "Suggestions",
};

// Type definitions for data
interface TimetableItem {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  speaker?: string;
  date: string;
  day?: string;
  venue?: string;
  location?: string;
  language?: string;
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  organization?: string;
  bio?: string;
  imageUrl?: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  tags?: string[];
  venue?: string;
  speaker?: string;
}

interface Photo {
  id: string;
  url: string;
  caption?: string;
}

interface SurveyQuestion {
  id: number;
  question: string;
  questionType: number;
  answers: string[];
  surveyId: number;
  responses: any;
}

interface Survey {
  id: number;
  name: string;
  eventId: number;
  questions: SurveyQuestion[];
}

export default function EventSectionPage() {
  const params = useParams<{ id: string; section: string }>();
  const { id, section } = params;

  const [eventData, setEventData] = useState(fallbackEventData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Define state for each section data
  const [timetableData, setTimetableData] = useState<TimetableItem[]>([]);
  const [photosData, setPhotosData] = useState<Photo[]>([]);
  const [sessionsData, setSessionsData] = useState<Session[]>([]);
  const [speakersData, setSpeakersData] = useState<Speaker[]>([]);
  const [surveysData, setSurveysData] = useState<Survey[]>([]);

  // Additional state for timetable filtering
  const [allTimetableData, setAllTimetableData] = useState<TimetableItem[]>([]);
  const [activeDateFilter, setActiveDateFilter] = useState<string>("all");
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("all");

  // Fetch main event data
  useEffect(() => {
    async function fetchEvent() {
      try {
        if (!id) return;

        // Convert string ID to number if it's numeric
        const idStr = Array.isArray(id) ? id[0] : String(id);
        const numericId = !isNaN(Number(idStr)) ? Number(idStr) : idStr;

        console.log("Fetching event details for ID:", numericId);
        const data = await fetchEventById(numericId);

        if (data) {
          // Transform API data to our expected format
          const formattedEvent = {
            id: data.id.toString(),
            title: data.name,
            dateRange: `${new Date(
              data.startDate
            ).toLocaleDateString()} - ${new Date(
              data.endDate
            ).toLocaleDateString()}`,
            venue: `${data.venue}, ${data.city}`,
            logoSrc: data.organization?.logo || "/logo.svg",
            description: data.description || "",
            location: {
              address: `${data.venue}, ${data.city}`,
              coordinates: {
                lat: data.latitude || -3.3695,
                lng: data.longitude || 36.6942,
              },
            },
            timetable: [],
            speakers: [],
            sessions: [],
            photos: [],
            surveys: [],
          };

          setEventData(formattedEvent);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        // We'll continue with fallback data
      }
    }

    fetchEvent();
  }, [id]);

  useEffect(() => {
    console.log("Event ID from route params:", id);
    console.log("Section from route params:", section);

    // Fetch the appropriate data based on the current section
    async function fetchSectionData() {
      setLoading(true);
      setError("");

      try {
        switch (section) {
          case "timetable":
            const timetable = await eventAPI.getTimetable(id);
            setAllTimetableData(timetable);
            setTimetableData(timetable);

            // Extract unique dates for filtering
            const dates = timetable.map((item: { date: string }) => item.date);
            const uniqueDatesList = Array.from(
              new Set(dates)
            ).sort() as string[];
            setUniqueDates(uniqueDatesList);
            break;
          case "photos":
            const photos = await eventAPI.getPhotos(id);
            setPhotosData(photos);
            break;
          case "sessions":
            const sessions = await eventAPI.getSessions(id);
            setSessionsData(sessions);
            break;
          case "speakers":
            const speakers = await eventAPI.getSpeakers(id);
            setSpeakersData(speakers);
            break;
          case "surveys":
            const surveys = await eventAPI.getSurveys(id);
            setSurveysData(surveys);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error(`Error fetching ${section} data:`, err);
        setError(`Failed to load ${section} data. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }

    fetchSectionData();
  }, [id, section]);

  // Function to render different section content based on the section parameter
  const renderSectionContent = () => {
    if (loading) {
      return (
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h3 className="text-lg font-medium text-gray-700">
              Loading {eventData.title} {sectionTitles[section] || section}...
            </h3>
            <p className="text-gray-500 mt-2 text-center">
              Fetching event data from Summit Point API
            </p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-full bg-red-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-red-600 font-medium text-lg mb-2">
              Failed to Load Data
            </div>
            <p className="text-gray-600 mb-4 text-center max-w-md">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    switch (section) {
      case "location":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Location</h2>
            <p className="mb-6 text-gray-700">
              {eventData.location?.address || eventData.venue}
            </p>
            {/* Map placeholder */}
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">
                Interactive map would be displayed here
                {eventData.location?.coordinates?.lat &&
                  ` (Coordinates: ${eventData.location.coordinates.lat}, ${eventData.location.coordinates.lng})`}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Directions</h3>
              <p className="text-gray-700 mb-4">
                The venue is easily accessible from major transportation hubs in
                the area.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-medium">1</span>
                  </div>
                  <p className="text-gray-700">
                    10 minutes from the international airport
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-medium">2</span>
                  </div>
                  <p className="text-gray-700">
                    Walking distance from major hotels
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-medium">3</span>
                  </div>
                  <p className="text-gray-700">Parking available on site</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "timetable":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Timetable
            </h2>

            {timetableData && timetableData.length > 0 ? (
              <div>
                <p className="text-gray-600 mb-6">
                  Full schedule of sessions, workshops, and events for{" "}
                  {eventData.title}.
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => setTimetableData(allTimetableData)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedDay === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All Days
                  </button>
                  {Array.from(
                    new Set(
                      allTimetableData.map(
                        (item: TimetableItem) =>
                          item.day ||
                          new Date(item.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })
                      )
                    )
                  ).map((day, index) => (
                    <button
                      key={`day-${index}`}
                      onClick={() => {
                        setSelectedDay(day as string);
                        setTimetableData(
                          allTimetableData.filter(
                            (item: TimetableItem) =>
                              (item.day ||
                                new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                  }
                                )) === day
                          )
                        );
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedDay === day
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  {timetableData.map((item) => (
                    <div
                      key={item.id}
                      className="border-l-4 border-blue-500 pl-4 py-4 bg-gray-50 rounded-r-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className="text-sm font-medium text-blue-600">
                          {item.startTime} - {item.endTime}
                        </div>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          {item.day ||
                            new Date(item.date).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          ,{" "}
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      {item.speaker && (
                        <div className="text-sm text-gray-700 mb-2 flex items-center">
                          <UserIcon className="h-4 w-4 mr-1 text-gray-500" />
                          Speaker: {item.speaker}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-x-4 text-sm text-gray-700 mb-2">
                        {(item.venue || item.location) && (
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                            Venue: {item.venue || item.location}
                          </div>
                        )}
                        {item.language && (
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-4 w-4 mr-1 text-gray-500" />
                            Language: {item.language}
                          </div>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-gray-600 mt-2">{item.description}</p>
                      )}
                      <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                        Add to my schedule
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-100 mt-8">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Note:</span> The schedule is
                    subject to change. Please check regularly for updates.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/events/FRS_Programme 25.03.25.pdf"
                      target="_blank"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                      Download Full Programme
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 px-6 bg-blue-50 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <ClockIcon className="h-16 w-16 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  The schedule for {eventData.title} (ID: {id}) is currently
                  being finalized. Please check back later for the complete
                  event timetable.
                </p>
                <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">
                    What to expect:
                  </h4>
                  <ul className="text-left text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Detailed session information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Speaker details and presentations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Networking opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Special events and activities</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "speakers":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Speakers
            </h2>

            {speakersData && speakersData.length > 0 ? (
              <div className="space-y-6">
                <p className="text-gray-600 mb-4">
                  Meet the industry experts and thought leaders who will be
                  speaking at {eventData.title}.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {speakersData.map((speaker) => (
                    <div
                      key={speaker.id}
                      className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-300 w-full">
                        {speaker.imageUrl ? (
                          <Image
                            src={speaker.imageUrl}
                            alt={speaker.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="rounded-t-lg object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <UserIcon className="h-20 w-20 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">
                          {speaker.name}
                        </h3>
                        <p className="text-blue-600 text-sm mb-2">
                          {speaker.title}
                          {speaker.organization && `, ${speaker.organization}`}
                        </p>
                        {speaker.bio && (
                          <div>
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {speaker.bio}
                            </p>
                            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                              Read bio
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 px-6 bg-blue-50 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <UserIcon className="h-16 w-16 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Speakers Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  The speakers for {eventData.title} (ID: {id}) have not been
                  announced yet. Check back later to learn about the industry
                  experts who will be presenting.
                </p>
                <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">
                    What to expect:
                  </h4>
                  <ul className="text-left text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Industry thought leaders</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Expert panels and keynotes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Q&A opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Networking with presenters</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "sessions":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Sessions
            </h2>

            {sessionsData && sessionsData.length > 0 ? (
              <div className="space-y-6">
                <p className="text-gray-600 mb-4">
                  Browse the scheduled sessions for {eventData.title}. The
                  sessions are listed in chronological order.
                </p>

                {/* Group sessions by date */}
                {(() => {
                  // Get unique dates and sort them
                  const dates = [
                    ...new Set(sessionsData.map((session) => session.date)),
                  ].sort();

                  return dates.map((date) => {
                    const dateStr = new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });

                    const dateSessions = sessionsData.filter(
                      (session) => session.date === date
                    );

                    return (
                      <div key={date} className="mt-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3 pb-2 border-b border-gray-200">
                          {dateStr}
                        </h3>

                        <div className="space-y-4">
                          {dateSessions.map((session) => (
                            <div
                              key={session.id}
                              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                            >
                              <h3 className="font-semibold text-lg mb-2">
                                {session.title}
                              </h3>
                              <div className="flex items-center text-sm text-gray-600 mb-3">
                                <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
                                <span>
                                  {session.startTime} - {session.endTime}
                                </span>
                                {session.venue && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <MapPinIcon className="w-4 h-4 mr-1 text-gray-500" />
                                    <span>{session.venue}</span>
                                  </>
                                )}
                              </div>
                              {session.description && (
                                <p className="text-gray-700 mb-4">
                                  {session.description}
                                </p>
                              )}
                              {session.speaker && (
                                <div className="flex items-center mb-3">
                                  <UserIcon className="w-4 h-4 mr-1 text-gray-500" />
                                  <span className="text-sm text-gray-600">
                                    Speaker: {session.speaker}
                                  </span>
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {session.tags &&
                                  session.tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              <div className="py-12 px-6 bg-blue-50 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <DocumentTextIcon className="h-16 w-16 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Sessions Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  The detailed sessions for {eventData.title} (ID: {id}) are
                  currently being planned. Check back closer to the event date
                  for a complete list of sessions.
                </p>
                <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Session topics may include:
                  </h4>
                  <ul className="text-left text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Industry trends and innovations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Case studies and success stories</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Workshops and interactive discussions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Networking and collaboration opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "photos":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Photos
            </h2>

            {photosData && photosData.length > 0 ? (
              <div className="space-y-6">
                <p className="text-gray-600 mb-4">
                  Browse photos from {eventData.title}. Click on any photo to
                  view a larger version.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photosData.map((photo, index) => (
                    <div
                      key={photo.id || index}
                      className="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() => window.open(photo.url, "_blank")}
                    >
                      <Image
                        src={photo.url}
                        alt={
                          photo.caption ||
                          `${eventData.title} photo ${index + 1}`
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="group-hover:opacity-90 transition-opacity object-cover"
                      />
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm transform translate-y-full group-hover:translate-y-0 transition-transform">
                          {photo.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {photosData.length > 9 && (
                  <div className="flex justify-center mt-6">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Load More Photos
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 px-6 bg-blue-50 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <PhotoIcon className="h-16 w-16 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Photos Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Photos for {eventData.title} (ID: {id}) will be available
                  after the event begins. Check back during or after the event
                  to see highlights and memorable moments.
                </p>
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg border border-blue-100 flex items-center justify-center">
                      <div className="text-blue-200 text-4xl">📷</div>
                    </div>
                    <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg border border-blue-100 flex items-center justify-center">
                      <div className="text-blue-200 text-4xl">🖼️</div>
                    </div>
                    <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg border border-blue-100 flex items-center justify-center">
                      <div className="text-blue-200 text-4xl">📸</div>
                    </div>
                    <div className="aspect-w-4 aspect-h-3 bg-white rounded-lg border border-blue-100 flex items-center justify-center">
                      <div className="text-blue-200 text-4xl">👥</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "surveys":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Surveys
            </h2>

            {surveysData && surveysData.length > 0 ? (
              <div className="space-y-8">
                {surveysData.map((survey) => (
                  <div
                    key={survey.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="font-bold text-lg text-blue-800">
                        {survey.name}
                      </h3>
                    </div>

                    <div className="p-6">
                      {survey.questions &&
                        survey.questions.map((question, qIndex) => (
                          <div
                            key={question.id}
                            className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
                          >
                            <p className="font-medium mb-3">
                              {qIndex + 1}. {question.question}
                            </p>

                            {question.questionType === 3 && (
                              <div className="space-y-2">
                                {question.answers &&
                                  question.answers.map((answer, aIndex) => (
                                    <div
                                      key={aIndex}
                                      className="flex items-center"
                                    >
                                      <input
                                        type="radio"
                                        id={`q${question.id}-a${aIndex}`}
                                        name={`question-${question.id}`}
                                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                      />
                                      <label
                                        htmlFor={`q${question.id}-a${aIndex}`}
                                        className="text-gray-700"
                                      >
                                        {answer}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}

                      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Submit Survey
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 px-6 bg-blue-50 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <ChartBarIcon className="h-16 w-16 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  Surveys Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No surveys are currently available for {eventData.title} (ID:{" "}
                  {id}). Surveys will be published during or after the event to
                  gather participant feedback.
                </p>
                <div className="w-full max-w-md mx-auto bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Your feedback matters:
                  </h4>
                  <ul className="text-left text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Help us improve future events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Share your experience and insights</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Suggest topics for future discussions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-0.5 text-blue-500">•</div>
                      <span>Rate speakers and sessions</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case "chatroom":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Chat
            </h2>
            <p className="text-gray-600 py-4">
              The chat feature for {eventData.title} is currently under
              development. Check back during the event to interact with other
              attendees.
            </p>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Coming soon:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>Real-time messaging with attendees</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>Direct messaging with speakers</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-blue-500">•</span>
                  <span>Topic-based discussion rooms</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Documents
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Event Agenda</h3>
                    <p className="text-sm text-gray-500">PDF, 2.3 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium">Speaker Biographies</h3>
                    <p className="text-sm text-gray-500">PDF, 1.8 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium">
                      {eventData.title} - Proceedings
                    </h3>
                    <p className="text-sm text-gray-500">PDF, 4.5 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );

      case "livestream":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Event Livestream
            </h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg mb-4">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">
                  Livestream will be available during the event
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              The livestream for {eventData.title} will start on the first day
              of the conference ({eventData.dateRange.split(" - ")[0]}). Please
              check back later.
            </p>
          </div>
        );

      case "suggestions":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} - Suggestions
            </h2>
            <p className="text-gray-600 mb-6">
              We value your feedback. Please share any suggestions or ideas to
              improve the {eventData.title} event.
            </p>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="suggestion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Suggestion
                </label>
                <textarea
                  id="suggestion"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your ideas here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Suggestion
              </button>
            </form>
          </div>
        );

      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {eventData.title} -{" "}
              {sectionTitles[section] || "Section Not Found"}
            </h2>
            <p className="text-gray-600">
              Details for this section are not available for {eventData.title}{" "}
              (ID: {id}).
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href={`/event-detail/${id}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Event Details
        </Link>
        <h1 className="text-3xl font-bold mt-2">{eventData.title}</h1>
        <p className="text-lg text-gray-600 mt-1">
          {sectionTitles[section] || section}
        </p>
      </div>

      {renderSectionContent()}
    </div>
  );
}
