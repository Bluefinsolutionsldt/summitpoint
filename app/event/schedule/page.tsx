"use client";

import { useState } from "react";
import SimpleTimetable from "@/components/ui/SimpleTimetable";

// Future Ready Summit 2025 schedule data
const scheduleData = [
  // Day 1: Monday
  {
    date: "May 12th, 2025",
    day: "Day 1",
    events: [
      {
        id: "1.1",
        time: "09:00 - 10:30",
        title: "Opening Ceremony",
        description:
          "Official welcome and summit inauguration. Keynote address on smart, sustainable, and inclusive urban futures. Participation from government, EU representatives, and UNDP.",
        location: "Main Hall",
        speakers: [
          "Government Officials",
          "EU Representatives",
          "UNDP Officials",
        ],
      },
      {
        id: "1.2",
        time: "11:00 - 12:30",
        title: "Disruptive Change Makers Plenary",
        description:
          "Interactive plenary with audience engagement. Topics include the future of smart cities and youth empowerment, and case studies on disruptive innovations shaping urban landscapes.",
        location: "Main Hall",
        speakers: ["Innovation Leaders", "Urban Planners"],
      },
    ],
  },
  // Day 2: Tuesday
  {
    date: "May 13th, 2025",
    day: "Day 2",
    events: [
      {
        id: "2.1",
        time: "09:00 - 10:30",
        title: "Empowering People - Digital Inclusion Ceremony",
        description:
          "Case study presentations and fireside chat. Topics include Smart Cities for All: Bridging the digital divide with inclusive tech, and E-Governance in Action: Showcase of digital government services driving citizen engagement.",
        location: "Main Hall",
        speakers: ["Digital Inclusion Experts"],
      },
      {
        id: "2.2",
        time: "11:00 - 12:30",
        title: "Smart Cities Through Urban Technology",
        description:
          "Panel discussion with Q&A. Topics include the role of AI, IoT, and mobile broadband in equitable urban development.",
        location: "Panel Room A",
        speakers: ["Tech Industry Leaders", "Urban Development Specialists"],
      },
      {
        id: "2.3",
        time: "13:00 - 14:00",
        title: "Sustainable Infrastructure - Smart Mobility & Transport",
        description:
          "TED-style talks with group discussion. Topics include the future of electric and autonomous vehicles in African cities.",
        location: "Innovation Hub",
        speakers: ["Transport Innovation Experts"],
      },
      {
        id: "2.4",
        time: "14:30 - 15:30",
        title: "Sustainable Infrastructure - Smart Water",
        description:
          "Case study with fireside chat. Topics include IoT sensors and AI for water management (e.g., leak detection, real-time monitoring).",
        location: "Workshop Room B",
        speakers: ["Water Management Specialists"],
      },
      {
        id: "2.5",
        time: "16:00 - 17:30",
        title: "Smart Energy & Digital Infrastructure",
        description:
          "Plenary with case studies. Topics include smart grids and renewable energy integration.",
        location: "Main Hall",
        speakers: ["Energy Experts", "Infrastructure Specialists"],
      },
    ],
  },
  // Day 3: Wednesday
  {
    date: "May 14th, 2025",
    day: "Day 3",
    events: [
      {
        id: "3.1",
        time: "09:00 - 10:30",
        title: "Financing Sustainable Infrastructure",
        description:
          "Plenary with fireside chat. Topics include green bonds, blended finance, and PPP models for smart cities.",
        location: "Main Hall",
        speakers: ["Finance Experts", "Investment Specialists"],
      },
      {
        id: "3.2",
        time: "11:00 - 12:30",
        title: "Inclusive Urban Design – Shenzhen Case Study",
        description:
          "Expert presentation with interactive workshop. Topics include balancing rapid urbanization with sustainability (e.g., green infrastructure).",
        location: "Workshop Room A",
        speakers: ["Urban Design Experts", "Shenzhen Representatives"],
      },
      {
        id: "3.3",
        time: "14:00 - 15:30",
        title: "Future-Ready Skills Debate",
        description:
          "Youth-led open debate. Topics include 'Will AI liberate or enslave the workforce?' and 'Gig economy vs. stable employment in the digital age.'",
        location: "Debate Forum",
        speakers: ["Youth Leaders", "Industry Experts"],
      },
      {
        id: "3.4",
        time: "16:00 - 17:30",
        title: "Research Commercialization (Hosted by COSTECH)",
        description:
          "Roundtable discussions. Topics include turning academic research into market-ready solutions.",
        location: "Roundtable Hall",
        speakers: ["COSTECH Representatives", "Academic Researchers"],
      },
      {
        id: "3.5",
        time: "18:00 - 20:00",
        title: "Networking Cocktail",
        description: "Evening networking event for summit attendees.",
        location: "Reception Hall",
        speakers: [],
      },
    ],
  },
  // Day 4: Thursday
  {
    date: "May 15th, 2025",
    day: "Day 4",
    events: [
      {
        id: "4.1",
        time: "All Day",
        title: "Code Like a Girl Workshop",
        description: "Hands-on coding sessions for young women.",
        location: "Tech Lab",
        speakers: ["Coding Instructors"],
      },
      {
        id: "4.2",
        time: "All Day",
        title: "Vodacom Digital Accelerator",
        description: "Startup pitch sessions for innovative digital solutions.",
        location: "Startup Arena",
        speakers: ["Vodacom Representatives", "Venture Capitalists"],
      },
      {
        id: "4.3",
        time: "All Day",
        title: "Youth Engagement Hub",
        description: "Interactive tech demos showcasing youth-led innovations.",
        location: "Innovation Hub",
        speakers: ["Youth Innovators"],
      },
    ],
  },
  // Day 5: Friday
  {
    date: "May 16th, 2025",
    day: "Day 5",
    events: [
      {
        id: "5.1",
        time: "09:00 - 10:30",
        title: "Actionable Roadmap Plenary",
        description:
          "Policy declarations and stakeholder pledges for implementing summit outcomes.",
        location: "Main Hall",
        speakers: ["Policy Makers", "Industry Leaders"],
      },
      {
        id: "5.2",
        time: "11:00 - 12:30",
        title: "Capture the Flag Challenge",
        description: "Cybersecurity competition for universities.",
        location: "Cyber Arena",
        speakers: ["Cybersecurity Experts"],
      },
      {
        id: "5.3",
        time: "14:00 - 15:30",
        title: "Youth Showcase",
        description:
          "Demo pitches of youth-led innovations developed throughout the summit.",
        location: "Innovation Hub",
        speakers: ["Youth Innovators"],
      },
      {
        id: "5.4",
        time: "16:00 - 17:30",
        title: "Joint Closing Ceremony",
        description:
          "Summit wrap-up, awards, and official declarations for future action.",
        location: "Main Hall",
        speakers: ["Summit Organizers", "Government Officials"],
      },
    ],
  },
];

// Convert the schedule data to timetable format
const timetableItems = scheduleData.flatMap((day) =>
  day.events.map((event) => ({
    id: event.id,
    day:
      day.day === "Day 1"
        ? "Monday"
        : day.day === "Day 2"
        ? "Tuesday"
        : day.day === "Day 3"
        ? "Wednesday"
        : day.day === "Day 4"
        ? "Thursday"
        : "Friday",
    date: day.date,
    time: event.time,
    session: event.title,
    speaker: event.speakers.join(", "),
    location: event.location,
  }))
);

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Future Ready Summit (FRS) 2025 Programme
        </h1>
        <p className="text-gray-600 mb-2">12th – 16th May 2025 | Tanzania</p>
        <p className="text-gray-600 font-medium">
          Theme: Innovation for a Resilient and Inclusive Future
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Co-Funded by: European Union, UNDP, Vodacom Tanzania
        </p>
      </div>

      {/* Timetable component with session selection */}
      <SimpleTimetable
        items={timetableItems}
        programmeUrl="/events/FRS_Programme_2025.pdf"
        showDownloadLink={true}
      />
    </div>
  );
}
