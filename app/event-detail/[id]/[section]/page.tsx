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
} from "@heroicons/react/24/outline";
import { eventAPI } from "@/lib/api";

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
            setTimetableData(timetable);
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
        <div className="p-6 bg-white rounded-lg shadow-md flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 font-medium">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Try Again
          </button>
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
            <h2 className="text-2xl font-bold mb-4">Event Timetable</h2>

            {timetableData && timetableData.length > 0 ? (
              <div className="space-y-6">
                <div className="flex overflow-x-auto pb-4 mb-6 gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md whitespace-nowrap">
                    All Days
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md whitespace-nowrap hover:bg-gray-50">
                    Day 1
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md whitespace-nowrap hover:bg-gray-50">
                    Day 2
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md whitespace-nowrap hover:bg-gray-50">
                    Day 3
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md whitespace-nowrap hover:bg-gray-50">
                    Day 4
                  </button>
                </div>

                {timetableData.map((item) => (
                  <div
                    key={item.id}
                    className="border-l-4 border-blue-500 pl-4 py-4 bg-gray-50 rounded-r-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-blue-600 mb-1">
                      {item.startTime} - {item.endTime}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    {item.speaker && (
                      <div className="text-sm text-gray-700 mb-2 flex items-center">
                        <UserIcon className="h-4 w-4 mr-1 text-gray-500" />
                        Speaker: {item.speaker}
                      </div>
                    )}
                    {item.description && (
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    )}
                    <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                      Add to my schedule
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 py-4">
                No timetable items available at the moment
              </p>
            )}
          </div>
        );

      case "speakers":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Speakers</h2>

            {speakersData && speakersData.length > 0 ? (
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
                      <h3 className="font-bold text-lg mb-1">{speaker.name}</h3>
                      <p className="text-blue-600 text-sm mb-2">
                        {speaker.title}
                        {speaker.organization && `, ${speaker.organization}`}
                      </p>
                      <p className="text-gray-600 text-sm">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 py-4">
                No speaker information available at the moment
              </p>
            )}
          </div>
        );

      case "sessions":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Sessions</h2>

            {sessionsData && sessionsData.length > 0 ? (
              <div className="space-y-6">
                {sessionsData.map((session) => (
                  <div
                    key={session.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {session.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {session.date} | {session.startTime} - {session.endTime}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{session.description}</p>
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
            ) : (
              <p className="text-gray-600 py-4">
                No sessions available at the moment
              </p>
            )}
          </div>
        );

      case "photos":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Photos</h2>

            {photosData && photosData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photosData.map((photo, index) => (
                  <div
                    key={photo.id || index}
                    className="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || `Event photo ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="hover:opacity-90 transition-opacity cursor-pointer object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 py-4">
                No photos available at the moment
              </p>
            )}
          </div>
        );

      case "surveys":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Surveys</h2>

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
              <p className="text-gray-600 py-4">
                No surveys available at the moment
              </p>
            )}
          </div>
        );

      case "chatroom":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Chat</h2>
            <p className="text-gray-600 py-4">
              This feature is currently under development.
            </p>
          </div>
        );

      case "documents":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Event Documents</h2>
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
                    <h3 className="font-medium">Conference Proceedings</h3>
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
            <h2 className="text-2xl font-bold mb-4">Event Livestream</h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg mb-4">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">
                  Livestream will be available during the event
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              The livestream for this event will start on the first day of the
              conference. Please check back later.
            </p>
          </div>
        );

      case "suggestions":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Suggestions</h2>
            <p className="text-gray-600 mb-6">
              We value your feedback. Please share any suggestions or ideas to
              improve the event.
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
              {sectionTitles[section] || "Section Not Found"}
            </h2>
            <p className="text-gray-600">
              Details for this section are not available.
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
