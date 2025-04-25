"use client";

import { useState } from "react";
import React from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  FileDown,
  File,
  FileCog,
  FileImage,
  ExternalLink,
  Search,
  Calendar,
  Users,
  FileCode,
  Info,
} from "lucide-react";

// Define document categories and documents
const documentCategories = [
  {
    id: "program",
    name: "Programs",
    icon: <Calendar className="h-5 w-5 text-blue-500" />,
    description: "Event schedules and programs",
  },
  {
    id: "presentations",
    name: "Presentations",
    icon: <FileImage className="h-5 w-5 text-green-500" />,
    description: "Speaker presentations and slides",
  },
  {
    id: "reports",
    name: "Reports",
    icon: <FileText className="h-5 w-5 text-orange-500" />,
    description: "Conference reports and summaries",
  },
  {
    id: "guidelines",
    name: "Guidelines",
    icon: <Info className="h-5 w-5 text-purple-500" />,
    description: "Participant guidelines and information",
  },
  {
    id: "technical",
    name: "Technical Documents",
    icon: <FileCode className="h-5 w-5 text-red-500" />,
    description: "Technical specifications and documentation",
  },
];

// Define document data
const documents = [
  {
    id: 1,
    title: "Future Ready Summit Programme",
    description: "Full programme and schedule for FRS 2025",
    category: "program",
    fileType: "PDF",
    fileSize: "304 KB",
    dateAdded: "March 25, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf",
  },
  {
    id: 2,
    title: "Participant Guide",
    description: "Essential information for all summit attendees",
    category: "guidelines",
    fileType: "PDF",
    fileSize: "1.2 MB",
    dateAdded: "April 2, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
  {
    id: 3,
    title: "Keynote Presentation: Future of Smart Cities",
    description: "Slides from the opening keynote address",
    category: "presentations",
    fileType: "PDF",
    fileSize: "8.4 MB",
    dateAdded: "May 12, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
  {
    id: 4,
    title: "Workshop Materials: Digital Innovation",
    description: "Materials for the Digital Innovation workshop",
    category: "presentations",
    fileType: "PDF",
    fileSize: "5.7 MB",
    dateAdded: "May 13, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
  {
    id: 5,
    title: "Technical Specifications: Smart Energy Systems",
    description: "Technical documentation on smart energy implementation",
    category: "technical",
    fileType: "PDF",
    fileSize: "2.3 MB",
    dateAdded: "April 15, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
  {
    id: 6,
    title: "Day 1 Summary Report",
    description: "Summary of proceedings and key insights from Day 1",
    category: "reports",
    fileType: "PDF",
    fileSize: "1.8 MB",
    dateAdded: "May 13, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
  {
    id: 7,
    title: "Conference Venue Map",
    description: "Detailed map of the conference venue and facilities",
    category: "guidelines",
    fileType: "PDF",
    fileSize: "950 KB",
    dateAdded: "April 20, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
  {
    id: 8,
    title: "Speaker Biographies",
    description: "Profiles and background information for all speakers",
    category: "program",
    fileType: "PDF",
    fileSize: "2.5 MB",
    dateAdded: "April 5, 2025",
    path: "/events/FRS_Programme 25.03.25.pdf", // Using the same file as mock
  },
];

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter documents by active category and search query
  const filteredDocuments = documents.filter(
    (doc) =>
      (activeCategory === "all" || doc.category === activeCategory) &&
      (searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get icon for document based on file type
  const getDocumentIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />;
      case "ppt":
      case "pptx":
        return <FileImage className="h-10 w-10 text-orange-500" />;
      case "doc":
      case "docx":
        return <File className="h-10 w-10 text-blue-500" />;
      case "xls":
      case "xlsx":
        return <FileCog className="h-10 w-10 text-green-500" />;
      default:
        return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Event Documents
        </h1>
        <p className="text-gray-600 mb-6">
          Access and download all documents related to the Future Ready Summit
          2025
        </p>

        {/* Search bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
          <button
            className={`p-2 sm:p-3 border rounded-lg flex flex-col items-center text-center transition-colors ${
              activeCategory === "all"
                ? "bg-blue-50 border-blue-200"
                : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mb-1 sm:mb-2" />
            <span className="font-medium text-sm sm:text-base">All</span>
            <span className="text-xs text-gray-500 mt-1 hidden sm:inline">
              {documents.length} files
            </span>
          </button>

          {documentCategories.map((category) => (
            <button
              key={category.id}
              className={`p-2 sm:p-3 border rounded-lg flex flex-col items-center text-center transition-colors ${
                activeCategory === category.id
                  ? "bg-blue-50 border-blue-200"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              <span className="font-medium text-sm sm:text-base mt-1 sm:mt-2 line-clamp-2 h-10">
                {category.name}
              </span>
              <span className="text-xs text-gray-500 mt-1 hidden sm:inline">
                {documents.filter((doc) => doc.category === category.id).length}{" "}
                files
              </span>
            </button>
          ))}
        </div>

        {/* Document listing */}
        <div className="space-y-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <div
                key={document.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="hidden sm:block">
                    {getDocumentIcon(document.fileType)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:hidden mb-1">
                      {React.cloneElement(getDocumentIcon(document.fileType), {
                        className: "h-5 w-5",
                      })}
                      <span className="text-sm font-medium">
                        {document.fileType} • {document.fileSize}
                      </span>
                    </div>
                    <h3 className="font-medium text-base sm:text-lg text-gray-900 break-words line-clamp-2">
                      {document.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {document.description}
                    </p>

                    <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1 mb-3 sm:mb-0">
                      <span className="inline-flex items-center">
                        <File className="h-4 w-4 mr-1" />
                        {document.fileType}
                      </span>
                      <span>{document.fileSize}</span>
                      <span>Added: {document.dateAdded}</span>
                      <span className="text-blue-600">
                        {
                          documentCategories.find(
                            (cat) => cat.id === document.category
                          )?.name
                        }
                      </span>
                    </div>

                    <div className="flex gap-2 sm:hidden mt-2">
                      <a
                        href={document.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center flex-1 justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> View
                      </a>
                      <a
                        href={document.path}
                        download
                        className="inline-flex items-center flex-1 justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" /> Download
                      </a>
                    </div>
                  </div>

                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="flex gap-2">
                      <a
                        href={document.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" /> View
                      </a>
                      <a
                        href={document.path}
                        download
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" /> Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
              <FileDown className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                No documents found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "There are no documents in this category."}
              </p>
            </div>
          )}
        </div>

        {/* Guidelines for submitting documents */}
        <div className="mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-base sm:text-lg font-semibold text-blue-700 mb-2">
            Need to submit a document?
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-2">
            If you're a speaker or presenter and need to submit materials for
            the event, please email your documents to:
          </p>
          <a
            href="mailto:documents@frs2025.example.com"
            className="text-blue-600 hover:text-blue-800 font-medium break-all"
          >
            documents@frs2025.example.com
          </a>
        </div>
      </div>
    </div>
  );
}
