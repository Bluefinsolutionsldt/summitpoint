"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  CheckCircle,
  AlertTriangle,
  ThumbsUp,
  Info,
  Clock,
} from "lucide-react";

// Define suggestion types
interface Suggestion {
  id: string;
  topic: string;
  message: string;
  date: string;
  status: "pending" | "acknowledged" | "implemented";
}

// Sample suggestions
const initialSuggestions: Suggestion[] = [
  {
    id: "sug-001",
    topic: "Wi-Fi Connection",
    message:
      "The Wi-Fi in the main conference hall was spotty during the morning sessions. Could we have more access points for tomorrow?",
    date: "May 10, 2025",
    status: "acknowledged",
  },
  {
    id: "sug-002",
    topic: "Session Recording",
    message:
      "Would it be possible to have recordings of the parallel sessions available? I couldn't attend all the ones I was interested in.",
    date: "May 10, 2025",
    status: "implemented",
  },
  {
    id: "sug-003",
    topic: "Vegetarian Options",
    message:
      "More vegetarian food options would be appreciated for lunch tomorrow.",
    date: "May 11, 2025",
    status: "pending",
  },
];

export default function SuggestionsPage() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!topic.trim()) {
      setSubmitError("Please enter a topic");
      return;
    }

    if (!message.trim()) {
      setSubmitError("Please enter your suggestion");
      return;
    }

    // Clear any previous errors
    setSubmitError("");

    // Create new suggestion
    const newSuggestion: Suggestion = {
      id: `sug-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      topic: topic.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "pending",
    };

    // Add to suggestions list
    setSuggestions([newSuggestion, ...suggestions]);

    // Reset form
    setTopic("");
    setMessage("");

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Get status icon and color
  const getStatusDetails = (status: Suggestion["status"]) => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "Pending Review",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      case "acknowledged":
        return {
          icon: <ThumbsUp className="h-4 w-4" />,
          text: "Acknowledged",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
        };
      case "implemented":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Implemented",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "Pending",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Event Suggestions
        </h1>
        <p className="text-gray-600 mb-6">
          Share your suggestions and feedback privately with the event
          organizers. Your input helps us make improvements in real-time.
        </p>

        {/* Success message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Your suggestion has been submitted!</span>
          </div>
        )}

        {/* Suggestion form */}
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
            Submit a new suggestion
          </h2>

          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <p>{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Topic
              </label>
              <input
                type="text"
                id="topic"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Schedule, Facilities, Content"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Suggestion
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please provide specific details about your suggestion..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Suggestion
              </button>
            </div>
          </form>
        </div>

        {/* Your suggestions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Previous Suggestions
          </h2>

          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion) => {
                const statusDetails = getStatusDetails(suggestion.status);

                return (
                  <div
                    key={suggestion.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {suggestion.topic}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {suggestion.date}
                        </p>
                      </div>

                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusDetails.bgColor} ${statusDetails.textColor}`}
                      >
                        {statusDetails.icon}
                        <span className="ml-1">{statusDetails.text}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mt-3 text-sm">
                      {suggestion.message}
                    </p>

                    {suggestion.status === "acknowledged" && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Response:</span> Thank
                          you for your feedback. We're looking into this and
                          will implement improvements where possible.
                        </p>
                      </div>
                    )}

                    {suggestion.status === "implemented" && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Response:</span> Thank
                          you for your suggestion. We've implemented this change
                          and it should be available now.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No suggestions yet
              </h3>
              <p className="text-gray-600">
                You haven't submitted any suggestions yet.
              </p>
            </div>
          )}
        </div>

        {/* Information box */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            About Suggestions
          </h3>
          <p className="text-gray-700 mb-2">
            Your suggestions are private and will only be seen by event
            organizers. We review all suggestions regularly and implement
            changes when possible.
          </p>
          <p className="text-gray-700">
            For urgent matters during the event, please visit the information
            desk or contact our staff directly.
          </p>
        </div>
      </div>
    </div>
  );
}
