import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Loader2,
  Calendar,
  MapPin,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface TimetableItem {
  id: string;
  day: string;
  date: string;
  time: string;
  session: string;
  speaker: string;
  location: string;
}

interface TimetableDayGroup {
  day: string;
  date: string;
  items: TimetableItem[];
}

interface TimetableProps {
  programmeUrl?: string;
  items: TimetableItem[];
  showDownloadLink?: boolean;
}

// Day color themes as specified
const dayColorThemes = {
  Monday: {
    main: "#F3AA4E",
    lighter: "#F7C280",
    lightest: "#FFF6EB",
    darker: "#D18425",
    text: "#A05E0A",
  },
  Tuesday: {
    main: "#98B7FF",
    lighter: "#B7CDFF",
    lightest: "#F3F7FF",
    darker: "#6C95F2",
    text: "#3760B9",
  },
  Wednesday: {
    main: "#C7F1EC",
    lighter: "#DDF7F4",
    lightest: "#F0FDFA",
    darker: "#92D5CD",
    text: "#2A847A",
  },
  Thursday: {
    main: "#D8BAFF",
    lighter: "#E5D4FF",
    lightest: "#F8F4FF",
    darker: "#B58CEF",
    text: "#6B3BB5",
  },
  Friday: {
    main: "#FF93A8",
    lighter: "#FFBAC7",
    lightest: "#FFF2F6",
    darker: "#E86A84",
    text: "#C1324E",
  },
};

const SimpleTimetable: React.FC<TimetableProps> = ({
  programmeUrl = "/events/FRS_Programme 25.03.25.pdf",
  items,
  showDownloadLink = true,
}) => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Group timetable items by day
  const groupedByDay = items.reduce((groups: TimetableDayGroup[], item) => {
    const existingGroup = groups.find(
      (group) => group.day === item.day && group.date === item.date
    );

    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      groups.push({
        day: item.day,
        date: item.date,
        items: [item],
      });
    }

    return groups;
  }, []);

  const toggleSessionSelection = (id: string) => {
    setSelectedSessions((prev) =>
      prev.includes(id)
        ? prev.filter((sessionId) => sessionId !== id)
        : [...prev, id]
    );
  };

  // Get color theme for a specific day
  const getColorTheme = (day: string) => {
    return (
      dayColorThemes[day as keyof typeof dayColorThemes] ||
      dayColorThemes.Monday
    );
  };

  const handleSubmit = () => {
    if (selectedSessions.length === 0) {
      setFeedback("Please select at least one session to attend.");
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    // Simulate processing
    setTimeout(() => {
      // Get selected session details
      const selectedSessionDetails = items
        .filter((item) => selectedSessions.includes(item.id))
        .map((item) => ({
          id: item.id,
          day: item.day,
          date: item.date,
          time: item.time,
          session: item.session,
          location: item.location,
        }));

      // Check for conflicts (sessions happening at the same time)
      const sessionsByDay: Record<string, any[]> = {};

      selectedSessionDetails.forEach((session) => {
        if (!sessionsByDay[session.day]) {
          sessionsByDay[session.day] = [];
        }
        sessionsByDay[session.day].push(session);
      });

      // Look for time conflicts
      let conflicts: any[] = [];

      for (const day in sessionsByDay) {
        const daySessions = sessionsByDay[day];

        for (let i = 0; i < daySessions.length; i++) {
          for (let j = i + 1; j < daySessions.length; j++) {
            // Simple check for time conflicts
            if (daySessions[i].time === daySessions[j].time) {
              conflicts.push({
                day,
                time: daySessions[i].time,
                sessions: [daySessions[i].session, daySessions[j].session],
              });
            }
          }
        }
      }

      if (conflicts.length > 0) {
        setFeedback(
          "There are time conflicts in your selection. Please review and adjust."
        );
      } else {
        // Show success message
        setFeedback(
          "Thank you for registering! We've saved your session selections."
        );

        // Log selections to console
        console.log("Selected sessions:", selectedSessionDetails);
      }

      setIsSubmitting(false);
    }, 1000);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Event Timetable
          </h2>
          <p className="text-sm text-gray-600">
            Select the sessions you wish to attend.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={toggleExpand}
            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" /> Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" /> Expand All
              </>
            )}
          </button>

          {showDownloadLink && (
            <Link
              href={programmeUrl}
              target="_blank"
              className="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90 transition-colors flex items-center"
              style={{ backgroundColor: dayColorThemes.Monday.main }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Download PDF
            </Link>
          )}
        </div>
      </div>

      {/* Day navigation tabs */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveDay(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
              activeDay === null
                ? "text-white bg-gray-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span>All Days</span>
          </button>

          {groupedByDay.map((dayGroup) => {
            const colorTheme = getColorTheme(dayGroup.day);
            const isActive = activeDay === dayGroup.day;

            return (
              <button
                key={dayGroup.day}
                onClick={() => setActiveDay(dayGroup.day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center whitespace-nowrap ${
                  isActive ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: isActive
                    ? colorTheme.main
                    : colorTheme.lightest,
                  color: isActive ? "white" : colorTheme.text,
                  boxShadow: isActive
                    ? `0 2px 8px ${colorTheme.main}40`
                    : "none",
                }}
              >
                <span>{dayGroup.day}</span>
                <span className="text-xs ml-2 opacity-80">
                  {dayGroup.date.split(",")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                Attend
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                Day
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                Time
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                Session
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                Speaker
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {isExpanded &&
              groupedByDay
                .filter((dayGroup) => !activeDay || dayGroup.day === activeDay)
                .map((dayGroup, groupIndex) => {
                  const colorTheme = getColorTheme(dayGroup.day);
                  return (
                    <React.Fragment key={`day-${groupIndex}`}>
                      {/* Day header row */}
                      <tr>
                        <td
                          colSpan={6}
                          className="py-3 px-4 font-semibold text-sm"
                          style={{
                            backgroundColor: colorTheme.lightest,
                            color: colorTheme.text,
                            borderBottom: `1px solid ${colorTheme.lighter}`,
                          }}
                        >
                          {dayGroup.day}, {dayGroup.date}
                        </td>
                      </tr>

                      {dayGroup.items.map((item, itemIndex) => {
                        const isSelected = selectedSessions.includes(item.id);
                        return (
                          <tr
                            key={item.id || `item-${groupIndex}-${itemIndex}`}
                            className={`transition-colors hover:bg-gray-50 ${
                              isSelected ? "bg-opacity-70" : ""
                            }`}
                            style={{
                              backgroundColor: isSelected
                                ? colorTheme.lightest
                                : "",
                            }}
                          >
                            <td className="py-4 px-4 border-b border-gray-100">
                              <div className="flex justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    id={`session-${item.id}`}
                                    checked={isSelected}
                                    onChange={() =>
                                      toggleSessionSelection(item.id)
                                    }
                                    className="sr-only peer"
                                  />
                                  <div
                                    className="w-5 h-5 border rounded-md peer-checked:flex peer-checked:items-center peer-checked:justify-center peer-checked:text-white transition-colors"
                                    style={{
                                      borderColor: colorTheme.lighter,
                                      backgroundColor: isSelected
                                        ? colorTheme.main
                                        : "transparent",
                                    }}
                                  >
                                    {isSelected && (
                                      <Check className="w-3 h-3" />
                                    )}
                                  </div>
                                </label>
                              </div>
                            </td>
                            <td
                              className="py-4 px-4 border-b border-gray-100 text-sm font-medium"
                              style={{ color: colorTheme.text }}
                            >
                              {item.day}
                            </td>
                            <td className="py-4 px-4 border-b border-gray-100 text-sm text-gray-700">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                {item.time}
                              </div>
                            </td>
                            <td className="py-4 px-4 border-b border-gray-100">
                              <div
                                className="font-medium text-sm"
                                style={{
                                  color: isSelected ? colorTheme.text : "#333",
                                }}
                              >
                                {item.session}
                              </div>
                            </td>
                            <td className="py-4 px-4 border-b border-gray-100 text-sm text-gray-600">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                {item.speaker || "-"}
                              </div>
                            </td>
                            <td className="py-4 px-4 border-b border-gray-100 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                {item.location || "-"}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
          </tbody>
        </table>
      </div>

      {/* Session Selection Summary */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
          {selectedSessions.length} session
          {selectedSessions.length !== 1 ? "s" : ""} selected
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedSessions.length > 0 ? (
            items
              .filter((item) => selectedSessions.includes(item.id))
              .map((item) => {
                const colorTheme = getColorTheme(item.day);
                return (
                  <div
                    key={item.id}
                    className="inline-flex items-center text-xs px-3 py-1.5 rounded-full shadow-sm"
                    style={{
                      backgroundColor: `${colorTheme.lighter}`,
                      color: colorTheme.text,
                    }}
                  >
                    <span className="font-medium mr-1">
                      {item.day.substring(0, 3)}:
                    </span>
                    <span>
                      {item.session.length > 25
                        ? `${item.session.substring(0, 25)}...`
                        : item.session}
                    </span>
                    <button
                      onClick={() => toggleSessionSelection(item.id)}
                      className="ml-2 h-4 w-4 rounded-full flex items-center justify-center hover:opacity-80"
                      style={{ background: colorTheme.text, color: "white" }}
                    >
                      &times;
                    </button>
                  </div>
                );
              })
          ) : (
            <p className="text-sm text-gray-500">No sessions selected yet.</p>
          )}
        </div>
      </div>

      {/* Submit button and feedback */}
      <div className="mt-6 flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedSessions.length === 0}
          className="px-4 py-3 text-white rounded-lg text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
          style={{
            backgroundColor: dayColorThemes.Monday.main,
            boxShadow: `0 4px 14px 0 ${dayColorThemes.Monday.main}40`,
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Check size={16} className="mr-2" />
              Submit Session Selections
            </>
          )}
        </button>

        {feedback && (
          <div
            className={`p-4 border rounded-lg text-sm ${
              feedback.includes("conflicts")
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-green-50 border-green-200 text-green-800"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>

      {showDownloadLink && (
        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Note:</span> Schedule may be subject
            to changes. Check regularly for updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleTimetable;
