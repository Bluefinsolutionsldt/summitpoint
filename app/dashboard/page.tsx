"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import SimpleTimetable from "@/components/ui/SimpleTimetable";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Timetable data for Future Ready Summit 2025
  const timetableData = [
    {
      id: "1",
      day: "Monday",
      date: "May 12th, 2025",
      time: "09:00 - 10:30",
      session: "Opening Ceremony",
      speaker: "Government, EU, and UNDP Officials",
      location: "Main Hall",
    },
    {
      id: "2",
      day: "Monday",
      date: "May 12th, 2025",
      time: "11:00 - 12:30",
      session: "Disruptive Change Makers Plenary",
      speaker: "Innovation Leaders",
      location: "Main Hall",
    },
    {
      id: "3",
      day: "Tuesday",
      date: "May 13th, 2025",
      time: "09:00 - 10:30",
      session: "Empowering People - Digital Inclusion Ceremony",
      speaker: "Digital Inclusion Experts",
      location: "Main Hall",
    },
    {
      id: "4",
      day: "Tuesday",
      date: "May 13th, 2025",
      time: "11:00 - 12:30",
      session: "Smart Cities Through Urban Technology",
      speaker: "Tech Industry Leaders",
      location: "Panel Room A",
    },
    {
      id: "5",
      day: "Tuesday",
      date: "May 13th, 2025",
      time: "13:00 - 14:00",
      session: "Sustainable Infrastructure - Smart Mobility & Transport",
      speaker: "Transport Innovation Experts",
      location: "Innovation Hub",
    },
    {
      id: "6",
      day: "Tuesday",
      date: "May 13th, 2025",
      time: "14:30 - 15:30",
      session: "Sustainable Infrastructure - Smart Water",
      speaker: "Water Management Specialists",
      location: "Workshop Room B",
    },
    {
      id: "7",
      day: "Tuesday",
      date: "May 13th, 2025",
      time: "16:00 - 17:30",
      session: "Smart Energy & Digital Infrastructure",
      speaker: "Energy Experts",
      location: "Main Hall",
    },
    {
      id: "8",
      day: "Wednesday",
      date: "May 14th, 2025",
      time: "09:00 - 10:30",
      session: "Financing Sustainable Infrastructure",
      speaker: "Finance Experts",
      location: "Main Hall",
    },
    {
      id: "9",
      day: "Wednesday",
      date: "May 14th, 2025",
      time: "11:00 - 12:30",
      session: "Inclusive Urban Design – Shenzhen Case Study",
      speaker: "Urban Design Experts",
      location: "Workshop Room A",
    },
    {
      id: "10",
      day: "Wednesday",
      date: "May 14th, 2025",
      time: "14:00 - 15:30",
      session: "Future-Ready Skills Debate",
      speaker: "Youth Leaders",
      location: "Debate Forum",
    },
    {
      id: "11",
      day: "Wednesday",
      date: "May 14th, 2025",
      time: "16:00 - 17:30",
      session: "Research Commercialization (Hosted by COSTECH)",
      speaker: "COSTECH Representatives",
      location: "Roundtable Hall",
    },
    {
      id: "12",
      day: "Thursday",
      date: "May 15th, 2025",
      time: "All Day",
      session: "Code Like a Girl Workshop",
      speaker: "Coding Instructors",
      location: "Tech Lab",
    },
    {
      id: "13",
      day: "Thursday",
      date: "May 15th, 2025",
      time: "All Day",
      session: "Vodacom Digital Accelerator",
      speaker: "Vodacom Representatives",
      location: "Startup Arena",
    },
    {
      id: "14",
      day: "Friday",
      date: "May 16th, 2025",
      time: "09:00 - 10:30",
      session: "Actionable Roadmap Plenary",
      speaker: "Policy Makers",
      location: "Main Hall",
    },
    {
      id: "15",
      day: "Friday",
      date: "May 16th, 2025",
      time: "16:00 - 17:30",
      session: "Joint Closing Ceremony",
      speaker: "Summit Organizers",
      location: "Main Hall",
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state if rendering on the server or during initial client load
  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to your Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Hello, {user?.name || "User"}! Here's your personalized dashboard.
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Profile
            </h2>
            <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
              Active
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user?.name || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email || "Not available"}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="min-w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Account created</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="min-w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Logged in successfully</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm font-medium">Profile</span>
            </button>

            <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 mb-2"
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
              <span className="text-sm font-medium">Events</span>
            </button>

            <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="text-sm font-medium">Tasks</span>
            </button>

            <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-medium">Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timetable Section */}
      <div className="mt-8">
        <SimpleTimetable
          items={timetableData}
          programmeUrl="/events/FRS_Programme_2025.pdf"
        />
      </div>
    </div>
  );
}
