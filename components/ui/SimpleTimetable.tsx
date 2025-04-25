import React, { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

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

const SimpleTimetable: React.FC<TimetableProps> = ({
  programmeUrl = "/events/FRS_Programme 25.03.25.pdf",
  items,
  showDownloadLink = true,
}) => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Event Timetable</h2>
      <p className="text-sm text-gray-600 mb-6">
        Select the sessions you wish to attend and submit your selections.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Attend
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Time
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Session
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Speaker
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedByDay.map((dayGroup, groupIndex) => (
              <React.Fragment key={`day-${groupIndex}`}>
                <tr>
                  <td
                    colSpan={5}
                    className="py-3 px-4 font-semibold text-blue-700 bg-blue-50"
                  >
                    {dayGroup.day}, {dayGroup.date}
                  </td>
                </tr>
                {dayGroup.items.map((item, itemIndex) => (
                  <tr
                    key={item.id || `item-${groupIndex}-${itemIndex}`}
                    className={
                      selectedSessions.includes(item.id) ? "bg-blue-50" : ""
                    }
                  >
                    <td className="py-3 px-4 border-b border-gray-100 text-sm">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          id={`session-${item.id}`}
                          checked={selectedSessions.includes(item.id)}
                          onChange={() => toggleSessionSelection(item.id)}
                          className="h-4 w-4 rounded-sm text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100 text-sm">
                      {item.time}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100 text-sm font-medium">
                      {item.session}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100 text-sm">
                      {item.speaker || "-"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-100 text-sm">
                      {item.location || "-"}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Session Selection Summary */}
      <div className="mt-6 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          {selectedSessions.length} session
          {selectedSessions.length !== 1 ? "s" : ""} selected
        </h3>

        <div className="flex flex-wrap gap-2">
          {selectedSessions.length > 0 ? (
            items
              .filter((item) => selectedSessions.includes(item.id))
              .map((item) => (
                <div
                  key={item.id}
                  className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                >
                  <span>
                    {item.session.length > 25
                      ? `${item.session.substring(0, 25)}...`
                      : item.session}
                  </span>
                  <button
                    onClick={() => toggleSessionSelection(item.id)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-500">No sessions selected yet.</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="mt-4 flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || selectedSessions.length === 0}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
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
            className={`p-3 border rounded-lg text-sm ${
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
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> The schedule may be
            subject to changes.
          </p>
          <Link
            href={programmeUrl}
            target="_blank"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Download Full Programme
          </Link>
        </div>
      )}
    </div>
  );
};

export default SimpleTimetable;
