import React from "react";
import Link from "next/link";

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

const Timetable: React.FC<TimetableProps> = ({
  programmeUrl = "/events/FRS_Programme 25.03.25.pdf",
  items,
  showDownloadLink = true,
}) => {
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Event Timetable</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
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
                    colSpan={4}
                    className="py-3 px-4 font-semibold text-blue-700 bg-blue-50"
                  >
                    {dayGroup.day}, {dayGroup.date}
                  </td>
                </tr>
                {dayGroup.items.map((item, itemIndex) => (
                  <tr key={item.id || `item-${groupIndex}-${itemIndex}`}>
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

export default Timetable;
