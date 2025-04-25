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
} from "lucide-react";

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
  {
    id: 4,
    title: "Overall Event Satisfaction",
    description:
      "This comprehensive survey will help us improve future editions of the Future Ready Summit.",
    deadline: "May 20, 2025 - 23:59 EAT",
    status: "upcoming",
    questions: [
      {
        id: 1,
        question: "How would you rate your overall experience at the summit?",
        questionType: "rating",
        isRequired: true,
      },
      {
        id: 2,
        question: "Which aspects of the summit did you find most valuable?",
        questionType: "multiple-choice",
        options: [
          "Keynote presentations",
          "Panel discussions",
          "Networking opportunities",
          "Workshops",
          "Exhibition area",
          "Other",
        ],
        isRequired: true,
      },
      {
        id: 3,
        question: "Would you recommend this summit to colleagues?",
        questionType: "boolean",
        isRequired: true,
      },
      {
        id: 4,
        question: "How did you hear about this summit?",
        questionType: "multiple-choice",
        options: [
          "Email invitation",
          "Social media",
          "Colleague recommendation",
          "Organization website",
          "Professional network",
          "Other",
        ],
        isRequired: true,
      },
      {
        id: 5,
        question:
          "Please share any additional feedback or suggestions for future summits.",
        questionType: "text",
        isRequired: false,
      },
    ],
  },
];

export default function SurveysPage() {
  const [activeSurvey, setActiveSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed" | "upcoming"
  >("active");

  // Filter surveys based on active filter
  const filteredSurveys = surveys.filter((survey) => {
    if (activeFilter === "all") return true;
    return survey.status === activeFilter;
  });

  // Start survey handler
  const startSurvey = (survey: Survey) => {
    setActiveSurvey(survey);
    setCurrentStep(0);
    setAnswers({});
    setShowSuccess(false);
  };

  // Close survey handler
  const closeSurvey = () => {
    setActiveSurvey(null);
    setCurrentStep(0);
    setAnswers({});
    setShowSuccess(false);
  };

  // Handle answer changes
  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Navigation handlers
  const nextQuestion = () => {
    if (!activeSurvey) return;

    const currentQuestion = activeSurvey.questions[currentStep];

    // Validate required questions have answers
    if (
      currentQuestion.isRequired &&
      (answers[currentQuestion.id] === undefined ||
        answers[currentQuestion.id] === "" ||
        (Array.isArray(answers[currentQuestion.id]) &&
          answers[currentQuestion.id].length === 0))
    ) {
      // Highlight error (in a real app, you would show validation messages)
      return;
    }

    if (currentStep < activeSurvey.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit survey
      submitSurvey();
    }
  };

  const prevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit survey
  const submitSurvey = () => {
    // In a real application, you would send the answers to an API
    console.log("Survey submitted:", { surveyId: activeSurvey?.id, answers });
    setShowSuccess(true);

    // Reset after a delay
    setTimeout(() => {
      setActiveSurvey(null);
      setCurrentStep(0);
      setAnswers({});
      setShowSuccess(false);
    }, 3000);
  };

  // Render question based on type
  const renderQuestion = (question: SurveyQuestion) => {
    switch (question.questionType) {
      case "rating":
        return (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Poor</span>
              <span className="text-sm text-gray-500">Excellent</span>
            </div>
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
          </div>
        );

      case "multiple-choice":
        return (
          <div className="mt-4 space-y-3">
            {question.options?.map((option, idx) => (
              <div
                key={idx}
                onClick={() => handleAnswerChange(question.id, option)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors
                  ${
                    answers[question.id] === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                    ${
                      answers[question.id] === option
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {answers[question.id] === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "boolean":
        return (
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => handleAnswerChange(question.id, true)}
              className={`flex-1 py-3 px-6 rounded-lg transition-colors
                ${
                  answers[question.id] === true
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswerChange(question.id, false)}
              className={`flex-1 py-3 px-6 rounded-lg transition-colors
                ${
                  answers[question.id] === false
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              No
            </button>
          </div>
        );

      case "text":
        return (
          <div className="mt-4">
            <textarea
              value={answers[question.id] || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Event Surveys</h1>
        <p className="text-gray-600 mb-6">
          Your feedback helps us improve future events. Please complete the
          available surveys below.
        </p>

        {/* Filter tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveFilter("all")}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeFilter === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            All Surveys
          </button>
          <button
            onClick={() => setActiveFilter("active")}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeFilter === "active"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeFilter === "completed"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveFilter("upcoming")}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeFilter === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Survey cards */}
        {filteredSurveys.length > 0 ? (
          <div className="space-y-4">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {survey.status === "active" && (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                    {survey.status === "completed" && (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    {survey.status === "upcoming" && (
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {survey.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {survey.description}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <span className="text-gray-500">
                        {survey.questions.length} questions
                      </span>
                      {survey.deadline && (
                        <span className="text-gray-500">
                          Deadline: {survey.deadline}
                        </span>
                      )}
                      <span
                        className={`font-medium ${
                          survey.status === "active"
                            ? "text-green-600"
                            : survey.status === "completed"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {survey.status === "active" && "Active"}
                        {survey.status === "completed" && "Completed"}
                        {survey.status === "upcoming" && "Upcoming"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {survey.status === "active" && (
                      <button
                        onClick={() => startSurvey(survey)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Start Survey
                      </button>
                    )}
                    {survey.status === "completed" && (
                      <span className="text-blue-600 text-sm font-medium">
                        Thank you for your feedback
                      </span>
                    )}
                    {survey.status === "upcoming" && (
                      <span className="text-gray-500 text-sm">
                        Available soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No surveys found
            </h3>
            <p className="text-gray-500">
              There are no surveys in this category at the moment.
            </p>
          </div>
        )}

        {/* Survey benefits */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Why Your Feedback Matters
          </h3>
          <p className="text-gray-700 mb-2">
            Your responses help us improve future events by identifying what
            worked well and what could be better. All feedback is anonymous and
            confidential.
          </p>
          <p className="text-gray-700">
            Complete at least 3 surveys to receive a certificate of
            participation after the summit.
          </p>
        </div>
      </div>

      {/* Active Survey Modal */}
      {activeSurvey && !showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{activeSurvey.title}</h2>
              <button
                onClick={closeSurvey}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">
                    Question {currentStep + 1} of{" "}
                    {activeSurvey.questions.length}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round(
                      ((currentStep + 1) / activeSurvey.questions.length) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        ((currentStep + 1) / activeSurvey.questions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Current question */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {activeSurvey.questions[currentStep].question}
                </h3>

                {activeSurvey.questions[currentStep].isRequired && (
                  <span className="text-red-500 text-sm">* Required</span>
                )}

                {renderQuestion(activeSurvey.questions[currentStep])}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevQuestion}
                  disabled={currentStep === 0}
                  className={`px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium
                    ${
                      currentStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  Previous
                </button>

                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {currentStep < activeSurvey.questions.length - 1
                    ? "Next"
                    : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {activeSurvey && showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate your
              contribution to improving our events.
            </p>
            <button
              onClick={closeSurvey}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
