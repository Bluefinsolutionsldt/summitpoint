"use client";

import { useState } from "react";
import {
  CheckSquare,
  MessageSquare,
  FileText,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
  Info,
  Clock,
  Send,
  ThumbsUp,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

// Define types
interface SurveyQuestion {
  id: number;
  question: string;
  questionType: "multiple-choice" | "rating" | "text" | "boolean";
  options?: string[];
  isRequired: boolean;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  status: "active" | "completed" | "upcoming";
  questions: SurveyQuestion[];
}

// Define suggestion types
interface Suggestion {
  id: string;
  topic: string;
  message: string;
  date: string;
  status: "pending" | "acknowledged" | "implemented";
}

// Sample surveys data
const surveys: Survey[] = [
  {
    id: 1,
    title: "Opening Ceremony Feedback",
    description:
      "Please share your feedback on the Opening Ceremony of Future Ready Summit 2025.",
    deadline: "May 12, 2025 - 22:00 EAT",
    status: "active",
    questions: [
      {
        id: 1,
        question: "How would you rate the Opening Ceremony overall?",
        questionType: "rating",
        isRequired: true,
      },
      {
        id: 2,
        question:
          "Which part of the Opening Ceremony did you find most valuable?",
        questionType: "multiple-choice",
        options: [
          "Keynote address",
          "Panel discussion",
          "Networking opportunity",
          "Event facilities and setup",
          "Other",
        ],
        isRequired: true,
      },
      {
        id: 3,
        question: "Did the Opening Ceremony meet your expectations?",
        questionType: "boolean",
        isRequired: true,
      },
      {
        id: 4,
        question:
          "Please provide any additional comments or suggestions for improvement.",
        questionType: "text",
        isRequired: false,
      },
    ],
  },
  {
    id: 2,
    title: "Digital Inclusion Panel Feedback",
    description:
      "Share your thoughts on the Digital Inclusion Panel discussion.",
    deadline: "May 12, 2025 - 18:00 EAT",
    status: "active",
    questions: [
      {
        id: 1,
        question:
          "How would you rate the relevance of the Digital Inclusion Panel to your work?",
        questionType: "rating",
        isRequired: true,
      },
      {
        id: 2,
        question: "How knowledgeable were the panel speakers?",
        questionType: "rating",
        isRequired: true,
      },
      {
        id: 3,
        question: "Which topic discussed by the panel was most insightful?",
        questionType: "multiple-choice",
        options: [
          "Bridging the digital divide",
          "Inclusive design for all users",
          "Policy recommendations",
          "Implementation challenges",
          "Future trends",
        ],
        isRequired: true,
      },
      {
        id: 4,
        question:
          "What topics would you like to see covered in future panel discussions?",
        questionType: "text",
        isRequired: false,
      },
    ],
  },
  {
    id: 3,
    title: "Event Venue and Facilities",
    description:
      "Help us improve the event logistics and venue setup for future summits.",
    deadline: "May 16, 2025 - 23:59 EAT",
    status: "active",
    questions: [
      {
        id: 1,
        question: "How would you rate the overall venue facilities?",
        questionType: "rating",
        isRequired: true,
      },
      {
        id: 2,
        question: "Which aspects of the venue were most satisfactory?",
        questionType: "multiple-choice",
        options: [
          "Accessibility",
          "Seating arrangements",
          "Audiovisual equipment",
          "Wi-Fi connectivity",
          "Catering services",
          "Signage and directions",
        ],
        isRequired: true,
      },
      {
        id: 3,
        question: "Did you experience any difficulties navigating the venue?",
        questionType: "boolean",
        isRequired: true,
      },
      {
        id: 4,
        question:
          "Please share any suggestions to improve the venue experience.",
        questionType: "text",
        isRequired: false,
      },
    ],
  },
];

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

export default function FeedbackPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<"surveys" | "suggestions">(
    "surveys"
  );

  // Surveys state
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Suggestions state
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Survey functions
  const startSurvey = (survey: Survey) => {
    setSelectedSurvey(survey);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSurveySubmitted(false);
  };

  const closeSurvey = () => {
    setSelectedSurvey(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSurveySubmitted(false);
  };

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const nextQuestion = () => {
    if (!selectedSurvey) return;

    const currentQuestion = selectedSurvey.questions[currentQuestionIndex];

    // Check if required question is answered
    if (
      currentQuestion.isRequired &&
      answers[currentQuestion.id] === undefined
    ) {
      return; // Don't proceed if required question is not answered
    }

    if (currentQuestionIndex < selectedSurvey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit survey
      submitSurvey();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitSurvey = () => {
    // In a real app, you would send the answers to an API here
    console.log("Survey answers:", answers);
    setSurveySubmitted(true);

    // Show success for 3 seconds then close
    setTimeout(() => {
      closeSurvey();
    }, 3000);
  };

  const renderQuestion = (question: SurveyQuestion) => {
    switch (question.questionType) {
      case "rating":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              {question.question}
            </h3>
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleAnswerChange(question.id, rating)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-colors
                    ${
                      answers[question.id] === rating
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 px-2">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>
        );

      case "multiple-choice":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              {question.question}
            </h3>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerChange(question.id, option)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors
                    ${
                      answers[question.id] === option
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                        ${
                          answers[question.id] === option
                            ? "border-blue-600 bg-blue-600"
                            : "border-gray-400"
                        }`}
                    >
                      {answers[question.id] === option && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "boolean":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              {question.question}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswerChange(question.id, true)}
                className={`flex-1 py-3 px-6 rounded-lg border font-medium transition-colors
                  ${
                    answers[question.id] === true
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-700 hover:border-blue-400"
                  }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswerChange(question.id, false)}
                className={`flex-1 py-3 px-6 rounded-lg border font-medium transition-colors
                  ${
                    answers[question.id] === false
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 text-gray-700 hover:border-blue-400"
                  }`}
              >
                No
              </button>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">
              {question.question}
            </h3>
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Type your answer here..."
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Suggestions functions
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

  // Get status icon and color for suggestions
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
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Survey & Suggestions
            </h1>
            <p className="text-gray-600">
              Share your thoughts and help us improve the Summit experience
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("surveys")}
              className={`pb-3 font-medium text-sm px-1 -mb-px ${
                activeTab === "surveys"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Surveys
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`pb-3 font-medium text-sm px-1 -mb-px ${
                activeTab === "suggestions"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Suggestions
            </button>
          </div>
        </div>

        {/* Content for each tab */}
        <div className="mt-6">
          {/* Surveys Tab Content */}
          {activeTab === "surveys" && (
            <div className="space-y-6">
              {!selectedSurvey ? (
                <>
                  {/* List of available surveys */}
                  <p className="text-gray-600 mb-4">
                    The following surveys are available for you to complete.
                    Your feedback is valuable to us!
                  </p>
                  <div className="space-y-4">
                    {surveys.map((survey) => (
                      <div
                        key={survey.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {survey.title}
                          </h2>
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                              survey.status === "active"
                                ? "bg-green-100 text-green-800"
                                : survey.status === "upcoming"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {survey.status === "active"
                              ? "Active"
                              : survey.status === "upcoming"
                              ? "Upcoming"
                              : "Completed"}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          {survey.description}
                        </p>
                        {survey.deadline && (
                          <div className="flex items-center text-gray-500 mb-4 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Deadline: {survey.deadline}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {survey.questions.length} questions
                          </div>
                          <button
                            onClick={() => startSurvey(survey)}
                            disabled={survey.status !== "active"}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              survey.status === "active"
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {survey.status === "active"
                              ? "Start Survey"
                              : survey.status === "upcoming"
                              ? "Coming Soon"
                              : "Completed"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* Survey taking interface */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    {surveySubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                          Thank You!
                        </h2>
                        <p className="text-gray-600 mb-6">
                          Your feedback has been submitted successfully.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">
                            {selectedSurvey.title}
                          </h2>
                          <button
                            onClick={closeSurvey}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mb-6">
                          <div className="bg-gray-100 h-2 rounded-full">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{
                                width: `${
                                  ((currentQuestionIndex + 1) /
                                    selectedSurvey.questions.length) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-sm text-gray-500">
                            <span>
                              Question {currentQuestionIndex + 1} of{" "}
                              {selectedSurvey.questions.length}
                            </span>
                            <span>
                              {Math.round(
                                ((currentQuestionIndex + 1) /
                                  selectedSurvey.questions.length) *
                                  100
                              )}
                              % complete
                            </span>
                          </div>
                        </div>

                        <div className="mb-8">
                          {renderQuestion(
                            selectedSurvey.questions[currentQuestionIndex]
                          )}
                        </div>

                        <div className="flex justify-between">
                          <button
                            onClick={prevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              currentQuestionIndex === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            Previous
                          </button>
                          <button
                            onClick={nextQuestion}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                          >
                            {currentQuestionIndex ===
                            selectedSurvey.questions.length - 1
                              ? "Submit"
                              : "Next"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Suggestions Tab Content */}
          {activeTab === "suggestions" && (
            <div className="space-y-6">
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
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Suggestion
                    </button>
                  </div>
                </form>
              </div>

              {/* Submitted suggestions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Suggestions
                </h2>

                {suggestions.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-gray-500">
                      You haven't submitted any suggestions yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {suggestions.map((suggestion) => {
                      const statusDetails = getStatusDetails(suggestion.status);
                      return (
                        <div
                          key={suggestion.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-800">
                              {suggestion.topic}
                            </h3>
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${statusDetails.bgColor} ${statusDetails.textColor}`}
                            >
                              {statusDetails.icon}
                              <span className="ml-1">{statusDetails.text}</span>
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3 text-sm">
                            {suggestion.message}
                          </p>
                          <div className="text-xs text-gray-500">
                            Submitted on {suggestion.date}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
