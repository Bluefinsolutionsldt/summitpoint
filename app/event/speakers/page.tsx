"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Users,
  Briefcase,
  Globe,
  Twitter,
  Linkedin,
} from "lucide-react";

// Mock speakers data
const speakersData = [
  {
    id: "1",
    name: "Dr. Amos Nungu",
    title: "Director General",
    organization: "COSTECH",
    bio: "Dr. Amos Nungu is the Director General of the Tanzania Commission for Science and Technology (COSTECH), with extensive experience in research and innovation policy.",
    image: "/events/speakers/Dr. Amos Nungu.jpg",
    category: "Keynote",
    social: {
      twitter: "amosnungu",
      linkedin: "amos-nungu",
    },
  },
  {
    id: "2",
    name: "Joseph Manirakiza",
    title: "Programme Manager",
    organization: "Funguo",
    bio: "Joseph Manirakiza serves as the Programme Manager at Funguo, where he oversees innovation initiatives and strategic partnerships across Tanzania.",
    image: "/events/speakers/JOSEPH MANIRAKIZA-PROGRAMME MANAGER FUNGUO .jpg",
    category: "Keynote",
    social: {
      twitter: "josephmanirakiza",
      linkedin: "joseph-manirakiza",
    },
  },
  {
    id: "3",
    name: "Prof. Caroline Nombo",
    title: "Professor",
    organization: "University of Dar es Salaam",
    bio: "Prof. Caroline Nombo is a distinguished academic and researcher at the University of Dar es Salaam, specializing in development studies and innovation ecosystems.",
    image: "/events/speakers/Prof. Caroline Nombo.png",
    category: "Panel",
    social: {
      linkedin: "caroline-nombo",
    },
  },
  {
    id: "4",
    name: "Shigeki Komatsubara",
    title: "Resident Representative",
    organization: "UNDP Tanzania",
    bio: "Shigeki Komatsubara is the Resident Representative for UNDP Tanzania, leading development initiatives and partnerships to support sustainable development in the country.",
    image: "/events/speakers/ShigekiKomatsubara.jpg",
    category: "Workshop",
    social: {
      twitter: "ShigekiKomatsubara",
      linkedin: "shigeki-komatsubara",
    },
  },
  {
    id: "5",
    name: "Zuwena Farah",
    title: "Manager",
    organization: "Vodacom Foundation",
    bio: "Zuwena Farah leads initiatives at Vodacom Foundation, focusing on digital inclusion, education, and community development across Tanzania.",
    image: "/events/speakers/ZUWENA FARAH-VODACOM FOUNDATION.webp",
    category: "Panel",
    social: {
      twitter: "zuwenafarah",
      linkedin: "zuwena-farah",
    },
  },
];

// Speaker categories
const categories = ["All", "Keynote", "Panel", "Workshop"];

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter speakers based on search query and category
  const filteredSpeakers = speakersData.filter((speaker) => {
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || speaker.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Event Speakers
        </h1>
        <p className="text-gray-600">
          Meet our distinguished speakers for Innovation Week Tanzania 2025.
        </p>
      </div>

      {/* Search and filter */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search speakers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filters */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-50 text-gray-700 border border-gray-100 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Speakers grid */}
      {filteredSpeakers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              {/* Speaker image with fallback */}
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback for missing images - show first letter of name
                    const imgElement = e.target as HTMLImageElement;
                    imgElement.style.display = "none";

                    // Check if parentElement exists before setting innerHTML
                    if (imgElement.parentElement) {
                      imgElement.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800 text-6xl font-bold">
                          ${speaker.name.charAt(0)}
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Speaker info */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-2">
                    {speaker.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800">
                    {speaker.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Briefcase size={14} className="mr-1" />
                    <span>{speaker.title}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Globe size={14} className="mr-1" />
                    <span>{speaker.organization}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {speaker.bio.length > 150
                    ? `${speaker.bio.substring(0, 150)}...`
                    : speaker.bio}
                </p>

                {/* Social links */}
                <div className="flex space-x-2">
                  {speaker.social.twitter && (
                    <a
                      href={`https://twitter.com/${speaker.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {speaker.social.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            No speakers found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
