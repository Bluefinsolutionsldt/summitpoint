"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  LayoutDashboardIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  BellIcon,
  UserIcon,
  SearchIcon,
  CalendarIcon,
  LineChartIcon,
  FolderIcon,
  CheckCircleIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 h-screen flex overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 py-4 px-2 mb-8">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 flex justify-center items-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3L28 9V23L16 29L4 23V9L16 3Z"
                    stroke="#4F6EF7"
                    strokeWidth="2"
                    fill="#4F6EF7"
                  />
                  <text
                    x="16"
                    y="20"
                    fontFamily="Arial"
                    fontSize="12"
                    fill="white"
                    textAnchor="middle"
                  >
                    S
                  </text>
                </svg>
              </div>
            </div>
            <h1 className="text-xl font-bold">Summit Point</h1>
          </div>

          <nav className="flex-1 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 bg-gray-700/50 text-white rounded-lg"
            >
              <LayoutDashboardIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <FolderIcon className="h-5 w-5" />
              <span>Projects</span>
            </Link>
            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <CalendarIcon className="h-5 w-5" />
              <span>Calendar</span>
            </Link>
            <Link
              href="/dashboard/team"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <UsersIcon className="h-5 w-5" />
              <span>Team</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <LineChartIcon className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors"
            >
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-700">
            <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/30 rounded-lg transition-colors">
              <LogOutIcon className="h-5 w-5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {sidebarOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-between">
            <div className="relative max-w-md w-full hidden sm:block">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, John!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your projects today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Dashboard cards */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Projects
                  </h2>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FolderIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-gray-500">4 active projects</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Team Members
                  </h2>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <UsersIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-sm text-gray-500">2 new this month</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <CheckCircleIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">36</p>
                <div className="flex items-center mt-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                  <p className="text-sm text-gray-500">12 tasks due soon</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Progress */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Project Progress
                  </h2>
                  <Button variant="outline" size="sm" className="text-sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-5">
                  {/* Project item */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Website Redesign</h3>
                        <p className="text-sm text-gray-500">Design Team</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        85%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Mobile App Development</h3>
                        <p className="text-sm text-gray-500">
                          Development Team
                        </p>
                      </div>
                      <span className="text-sm font-medium text-indigo-600">
                        62%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Marketing Campaign</h3>
                        <p className="text-sm text-gray-500">Marketing Team</p>
                      </div>
                      <span className="text-sm font-medium text-purple-600">
                        40%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Jane Smith updated Project Alpha
                      </p>
                      <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <UsersIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        New team member joined
                      </p>
                      <p className="text-sm text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Project Beta was completed
                      </p>
                      <p className="text-sm text-gray-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
