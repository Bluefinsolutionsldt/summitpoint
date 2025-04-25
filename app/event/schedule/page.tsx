"use client";

import { useState } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";

// Mock schedule data
const scheduleData = [
  // Day 1
  {
    date: "September 7, 2025",
    day: "Day 1",
    events: [
      {
        id: "1.1",
        time: "09:00 - 10:30",
        title: "Opening Ceremony",
        description: "Welcome address and official opening by dignitaries",
        location: "Main Hall",
        speakers: ["Dr. James Mwangi"],
      },
      {
        id: "1.2",
        time: "11:00 - 12:30",
        title: "Keynote: Innovation Ecosystem in East Africa",
        description: "An overview of the innovation landscape in East Africa",
        location: "Main Hall",
        speakers: ["Sarah Kimani"],
      },
      {
        id: "1.3",
        time: "14:00 - 15:30",
        title: "Panel: Funding Innovation in Tanzania",
        description:
          "Exploring funding mechanisms and investment opportunities",
        location: "Panel Room A",
        speakers: ["Dr. Robert Mwesigwa", "John Doe", "Jane Smith"],
      },
    ],
  },
  // Day 2
  {
    date: "September 8, 2025",
    day: "Day 2",
    events: [
      {
        id: "2.1",
        time: "09:00 - 10:30",
        title: "Workshop: Design Thinking",
        description:
          "Interactive workshop on applying design thinking to solve challenges",
        location: "Workshop Room B",
        speakers: ["Alice Johnson"],
      },
      {
        id: "2.2",
        time: "11:00 - 12:30",
        title: "Future of Work in Digital Economy",
        description:
          "Exploring changing landscape of employment in digital era",
        location: "Panel Room A",
        speakers: ["Bob Anderson", "Carol Martinez"],
      },
      {
        id: "2.3",
        time: "14:00 - 16:00",
        title: "Startup Pitching Competition",
        description:
          "Local startups pitch their innovations to a panel of judges",
        location: "Main Hall",
        speakers: [],
      },
    ],
  },
  // Day 3
  {
    date: "September 9, 2025",
    day: "Day 3",
    events: [
      {
        id: "3.1",
        time: "09:00 - 10:30",
        title: "AI & Machine Learning in Africa",
        description: "Current state and future potential of AI applications",
        location: "Tech Room C",
        speakers: ["Dr. James Mwangi"],
      },
      {
        id: "3.2",
        time: "11:00 - 12:30",
        title: "Sustainable Innovation",
        description: "Green technologies and environmental sustainability",
        location: "Green Room D",
        speakers: ["Emma Wilson"],
      },
    ],
  },
  // Days 4-5 omitted for brevity
];

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<string>(scheduleData[0].day);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Event Schedule
        </h1>
        <p className="text-gray-600">
          Browse the complete schedule for Innovation Week Tanzania 2025. All
          times are in East Africa Time (EAT).
        </p>
      </div>

      {/* Day selector */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {scheduleData.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg min-w-[100px] ${
                activeDay === day.day
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
              }`}
            >
              <span className="font-medium">{day.day}</span>
              <span className="text-xs mt-1">{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {scheduleData.find((d) => d.day === activeDay)?.day}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {scheduleData.find((d) => d.day === activeDay)?.date}
        </p>

        <div className="space-y-6">
          {scheduleData
            .find((d) => d.day === activeDay)
            ?.events.map((event) => (
              <div
                key={event.id}
                className="border-l-4 border-blue-400 pl-4 py-2"
              >
                <div className="flex items-center text-gray-500 mb-1">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm font-medium">{event.time}</span>
                </div>

                <h3 className="font-medium text-lg text-gray-800 mb-1">
                  {event.title}
                </h3>

                <p className="text-gray-600 mb-3">{event.description}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {event.location && (
                    <div className="flex items-center text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  {event.speakers && event.speakers.length > 0 && (
                    <div className="flex items-start text-gray-500">
                      <Clock size={14} className="mr-1 mt-1" />
                      <span>{event.speakers.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Download option */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-800">Need the full schedule?</h3>
          <p className="text-sm text-gray-600">
            Download the complete agenda as PDF
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  );
}
