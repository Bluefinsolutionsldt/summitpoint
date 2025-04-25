"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ExternalLink } from "lucide-react";

export default function EventVenuePage() {
  // Single venue data for JNICC
  const venueData = {
    name: "Julius Nyerere International Conference Centre (JNICC)",
    location: "Dar es Salaam, Tanzania",
    description:
      "The Julius Nyerere International Convention Centre (JNICC) is a state-of-the-art conference facility located in the heart of Dar es Salaam, Tanzania. Named after Tanzania's founding father, Julius Nyerere, the center offers world-class facilities for conferences, exhibitions, and events with modern amenities and flexible meeting spaces.",
    coordinates: {
      lat: -6.812173,
      lng: 39.288505,
    },
    directions: [
      "Located 20 minutes from Julius Nyerere International Airport",
      "10 minutes from major hotels in downtown Dar es Salaam",
      "Walking distance from the Central Business District",
      "Accessible via Kivukoni Road, near the National Museum",
    ],
    transportation: [
      "Taxi services are available from major hotels and the airport",
      "Uber and other ride-hailing services operate throughout Dar es Salaam",
      "Hotel shuttle services may be available upon request",
      "Public transportation (dala dala) available on major routes nearby",
    ],
    facilities: [
      "Modern conference halls with full audiovisual capabilities",
      "High-speed Wi-Fi throughout the venue",
      "On-site catering services",
      "Ample parking for attendees",
      "Security services and accessible entrances",
    ],
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Event Location
        </h1>
        <h2 className="text-xl text-gray-600 mb-6">{venueData.name}</h2>

        <div className="bg-gray-100 h-96 flex items-center justify-center relative rounded-lg mb-8 overflow-hidden">
          {/* Actual Google Maps embed - Note the '!1m14!' parameter ensures the marker is visible */}
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1990.8810452547996!2d39.28583117328949!3d-6.812173000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b090aaaaaa9%3A0xc7b3c607727314d5!2sJulius%20Nyerere%20International%20Convention%20Centre!5e0!3m2!1sen!2sus!4v1705413456855!5m2!1sen!2sus`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Julius Nyerere International Convention Centre Map"
            className="absolute inset-0"
          ></iframe>

          {/* Location indicator overlay */}
          <div className="absolute top-4 left-4 z-10 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg flex items-center max-w-xs">
            <MapPin className="h-6 w-6 text-red-600 flex-shrink-0 mr-2" />
            <div>
              <p className="font-semibold text-sm">Event Venue</p>
              <p className="text-xs text-gray-600">
                Julius Nyerere International Convention Centre
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <a
              href={`https://maps.google.com/?q=${venueData.coordinates.lat},${venueData.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center shadow-lg"
            >
              Open in Google Maps <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About the Venue</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {venueData.description}
            </p>

            <h3 className="text-xl font-semibold mb-3">Facilities</h3>
            <ul className="space-y-2 mb-6">
              {venueData.facilities.map((facility, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">{facility}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">How to Get There</h3>
            <div className="space-y-3 mb-6">
              {venueData.directions.map((direction, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700">{direction}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Transportation Options
            </h3>
            <ul className="space-y-2">
              {venueData.transportation.map((option, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">{option}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Contact Information
          </h3>
          <p className="text-gray-700">
            For any inquiries about the venue, please contact the event
            organizers at events@example.com or call +255 123 456 789.
          </p>
        </div>
      </div>
    </div>
  );
}
