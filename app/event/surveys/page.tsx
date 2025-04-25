"use client";

import { useState } from "react";
import { BarChart3, CheckCircle } from "lucide-react";

// Mock survey data
const survey = {
  id: 122,
  name: "EVENT SURVEY",
  description:
    "Please take a few minutes to share your feedback about the event",
  questions: [
    {
      id: 882,
      question: "Do you believe Uganda can achieve Energy sufficiency?",
      questionType: "radio",
      answers: ["Yes", "No"],
      required: true,
    },
    {
      id: 883,
      question: "What is the primary challenge of the Electric grid of Uganda?",
      questionType: "radio",
      answers: [
        "Insufficient generation",
        "Seasonal fluctuations in capacity",
        "Rising demand",
        "Poor distribution infrastructure",
      ],
      required: true,
    },
    {
      id: 884,
      question: "Where do you wish the next Energy Summit should take place?",
      questionType: "radio",
      answers: ["Entebbe", "Kampala", "Hoima", "Mbarara"],
      required: true,
    },
    {
      id: 885,
      question:
        "Which topics would you like to see covered at future events? (Select all that apply)",
      questionType: "checkbox",
      answers: [
        "Renewable energy",
        "Energy policy",
        "Distribution networks",
        "Rural electrification",
        "Smart grid technology",
        "Energy financing",
      ],
      required: false,
    },
    {
      id: 886,
      question: "Please share any additional comments or suggestions",
      questionType: "text",
      required: false,
    },
  ],
};

export default function SurveysPage() {
  const [responses, setResponses] = useState<Record<number, string | string[]>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleRadioChange = (questionId: number, answer: string) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleCheckboxChange = (questionId: number, answer: string) => {
    const currentAnswers = (responses[questionId] as string[]) || [];
    const newAnswers = currentAnswers.includes(answer)
      ? currentAnswers.filter((a) => a !== answer)
      : [...currentAnswers, answer];

    setResponses({
      ...responses,
      [questionId]: newAnswers,
    });
  };

  const handleTextChange = (questionId: number, answer: string) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required questions
    const requiredQuestions = survey.questions.filter((q) => q.required);
    const unanswered = requiredQuestions.filter(
      (q) =>
        !responses[q.id] ||
        (Array.isArray(responses[q.id]) &&
          (responses[q.id] as string[]).length === 0)
    );

    if (unanswered.length > 0) {
      setError("Please answer all required questions");
      return;
    }

    // In a real app, you would submit the responses to an API here
    console.log("Submitting survey responses:", responses);
    setSubmitted(true);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Event Surveys</h1>
          <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <BarChart3 size={16} className="mr-1" />
            <span className="font-medium">1 Available</span>
          </div>
        </div>
        <p className="text-gray-600">
          Share your feedback to help improve future events
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-50 rounded-xl shadow-sm p-8 text-center">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your survey responses have been submitted successfully.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Surveys
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {survey.name}
          </h2>
          <p className="text-gray-600 mb-6">{survey.description}</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {survey.questions.map((question) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <h3 className="font-medium text-gray-800 mb-3 flex items-start">
                  <span>{question.question}</span>
                  {question.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h3>

                {question.questionType === "radio" && (
                  <div className="space-y-3">
                    {question.answers?.map((answer, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name={`question_${question.id}`}
                          value={answer}
                          checked={
                            (responses[question.id] as string) === answer
                          }
                          onChange={() =>
                            handleRadioChange(question.id, answer)
                          }
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">{answer}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.questionType === "checkbox" && (
                  <div className="space-y-3">
                    {question.answers?.map((answer, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          name={`question_${question.id}`}
                          value={answer}
                          checked={(
                            (responses[question.id] as string[]) || []
                          ).includes(answer)}
                          onChange={() =>
                            handleCheckboxChange(question.id, answer)
                          }
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">{answer}</span>
                      </label>
                    ))}
                  </div>
                )}

                {question.questionType === "text" && (
                  <textarea
                    name={`question_${question.id}`}
                    value={(responses[question.id] as string) || ""}
                    onChange={(e) =>
                      handleTextChange(question.id, e.target.value)
                    }
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your answer..."
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Survey
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
