"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Ticket,
  Download,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Info,
  ChevronRight,
  QrCode,
  CheckCircle,
} from "lucide-react";

// Define types
interface EventTicket {
  id: string;
  eventName: string;
  ticketType: string;
  ticketHolder: string;
  email: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  qrCode: string;
  price: string;
  currency: string;
  status: "valid" | "used" | "expired" | "canceled";
  seatInfo?: string;
  additionalInfo?: string;
}

// Sample ticket data
const tickets: EventTicket[] = [
  {
    id: "FRS2025-001234",
    eventName: "Future Ready Summit 2025",
    ticketType: "Full Access Pass",
    ticketHolder: "John Doe",
    email: "john.doe@example.com",
    eventDate: "May 10-12, 2025",
    eventTime: "9:00 AM - 5:00 PM",
    venue: "Julius Nyerere International Conference Centre",
    qrCode: "/images/qr-code-sample.png",
    price: "200.00",
    currency: "USD",
    status: "valid",
    additionalInfo:
      "Includes access to all keynotes, panels, workshops, and networking events.",
  },
  {
    id: "FRS2025-005678",
    eventName: "Future Ready Summit 2025 - Opening Gala",
    ticketType: "VIP Access",
    ticketHolder: "John Doe",
    email: "john.doe@example.com",
    eventDate: "May 9, 2025",
    eventTime: "7:00 PM - 10:00 PM",
    venue: "Serena Hotel - Grand Ballroom",
    qrCode: "/images/qr-code-sample.png",
    price: "150.00",
    currency: "USD",
    status: "valid",
    seatInfo: "Table 5, Seat 3",
    additionalInfo: "Includes welcome drink, dinner, and entertainment.",
  },
  {
    id: "FRS2025-009012",
    eventName: "Digital Transformation Workshop",
    ticketType: "Workshop Pass",
    ticketHolder: "John Doe",
    email: "john.doe@example.com",
    eventDate: "May 11, 2025",
    eventTime: "2:00 PM - 5:00 PM",
    venue: "Julius Nyerere ICC - Room B",
    qrCode: "/images/qr-code-sample.png",
    price: "75.00",
    currency: "USD",
    status: "valid",
    seatInfo: "Limited to 50 participants",
    additionalInfo: "Please bring your laptop for this interactive session.",
  },
];

export default function TicketsPage() {
  const [activeTicket, setActiveTicket] = useState<EventTicket | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Handle ticket download
  const handleDownload = (ticket: EventTicket) => {
    // In a real app, you would generate a PDF ticket and trigger download
    console.log("Downloading ticket:", ticket.id);
    setShowSuccessMessage(true);

    // Hide success message after a delay
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Handle ticket sharing
  const handleShare = (ticket: EventTicket) => {
    // In a real app, you would implement actual sharing functionality
    if (navigator.share) {
      navigator
        .share({
          title: `${ticket.eventName} Ticket`,
          text: `My ticket for ${ticket.eventName}`,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Could not share the ticket:", err);
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Sharing is not supported in this browser.");
    }
  };

  // Handle QR code display
  const toggleQRCode = (ticket: EventTicket) => {
    setActiveTicket(ticket);
    setShowQRCode(true);
  };

  // Close QR code modal
  const closeQRCode = () => {
    setShowQRCode(false);
    setActiveTicket(null);
  };

  // Render status badge
  const renderStatusBadge = (status: EventTicket["status"]) => {
    switch (status) {
      case "valid":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Valid
          </span>
        );
      case "used":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Used
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Expired
          </span>
        );
      case "canceled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Canceled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          My Event Tickets
        </h1>
        <p className="text-gray-600 mb-6">
          Access, download or share your tickets for the Future Ready Summit and
          related events.
        </p>

        {/* Ticket count summary */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
            <Ticket className="h-5 w-5 mr-2" />
            <span className="font-medium">{tickets.length} Active Tickets</span>
          </div>
          <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="font-medium">May 10-12, 2025</span>
          </div>
          <div className="flex items-center bg-purple-50 text-purple-700 px-4 py-2 rounded-lg">
            <MapPin className="h-5 w-5 mr-2" />
            <span className="font-medium">JNICC, Dar es Salaam</span>
          </div>
        </div>

        {/* Success message notification */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Ticket downloaded successfully!</span>
          </div>
        )}

        {/* Tickets list */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Left colored bar - visual indicator of ticket type */}
                <div className="w-full sm:w-2 bg-blue-600 sm:h-auto"></div>

                {/* Ticket content */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    {/* Ticket info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {ticket.eventName}
                        </h3>
                        {renderStatusBadge(ticket.status)}
                      </div>

                      <p className="text-blue-600 font-medium mb-4">
                        {ticket.ticketType}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{ticket.eventDate}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{ticket.eventTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{ticket.venue}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{ticket.ticketHolder}</span>
                        </div>
                      </div>

                      {ticket.seatInfo && (
                        <div className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700 mb-4">
                          <span className="font-medium">Seat Information:</span>{" "}
                          {ticket.seatInfo}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-auto">
                        <button
                          onClick={() => toggleQRCode(ticket)}
                          className="flex items-center text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <QrCode className="h-4 w-4 mr-1.5" />
                          <span>Show QR Code</span>
                        </button>
                        <button
                          onClick={() => handleDownload(ticket)}
                          className="flex items-center text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Download className="h-4 w-4 mr-1.5" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleShare(ticket)}
                          className="flex items-center text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Share2 className="h-4 w-4 mr-1.5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>

                    {/* Ticket ID section */}
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col items-center justify-center sm:min-w-[140px] p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-xs text-gray-500 mb-1">
                        Ticket ID
                      </div>
                      <div className="text-sm font-mono font-medium text-gray-800 mb-2">
                        {ticket.id}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        {ticket.price} {ticket.currency}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional information */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Important Information
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mr-1" />
              <span>
                Please bring a valid photo ID that matches the name on your
                ticket for verification.
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mr-1" />
              <span>
                Each QR code is unique and can only be scanned once for entry.
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mr-1" />
              <span>
                For questions or assistance with your tickets, please visit the
                help desk at the venue or contact{" "}
                <a
                  href="mailto:support@futurereadysummit.com"
                  className="text-blue-600 hover:underline"
                >
                  support@futurereadysummit.com
                </a>
                .
              </span>
            </li>
          </ul>
        </div>

        {/* CTA for buying more tickets */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/event/register"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register for More Events
          </Link>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && activeTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Ticket QR Code
              </h3>
              <p className="text-gray-600 mb-4">
                Present this QR code at the venue for entry
              </p>

              <div className="bg-white p-4 rounded-lg mb-4 inline-block border-2 border-gray-200">
                <div className="bg-gray-100 p-2 rounded">
                  <Image
                    src={activeTicket.qrCode}
                    alt="Ticket QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-xs text-gray-500 mb-1">Ticket ID</div>
                <div className="text-sm font-mono font-medium text-gray-800">
                  {activeTicket.id}
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-left mb-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Event</span>
                  <span className="font-medium text-gray-900">
                    {activeTicket.eventName}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">
                    {activeTicket.eventDate}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">
                    {activeTicket.eventTime}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Ticket Type</span>
                  <span className="font-medium text-gray-900">
                    {activeTicket.ticketType}
                  </span>
                </div>
                {activeTicket.seatInfo && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Seat</span>
                    <span className="font-medium text-gray-900">
                      {activeTicket.seatInfo}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeQRCode}
                className="flex-1 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(activeTicket);
                  closeQRCode();
                }}
                className="flex-1 py-2 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
