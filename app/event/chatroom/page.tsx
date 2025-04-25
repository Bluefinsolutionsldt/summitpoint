"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Send, User, Clock } from "lucide-react";

// Mock chat data
const initialMessages = [
  {
    id: 1,
    user: "Dr. James Mwangi",
    text: "Hello everyone! Looking forward to the Innovation Week Tanzania 2025!",
    timestamp: "09:30 AM",
    isCurrentUser: false,
  },
  {
    id: 2,
    user: "Sarah Kimani",
    text: "I'm excited about the panel discussion on digital transformation. Anyone else planning to attend?",
    timestamp: "09:32 AM",
    isCurrentUser: false,
  },
  {
    id: 3,
    user: "Emma Wilson",
    text: "Yes, I'll be there! Looking forward to sharing insights on sustainable innovation.",
    timestamp: "09:35 AM",
    isCurrentUser: false,
  },
  {
    id: 4,
    user: "Alice Johnson",
    text: "Don't forget the design thinking workshop on Day 2. It's going to be interactive!",
    timestamp: "09:40 AM",
    isCurrentUser: false,
  },
  {
    id: 5,
    user: "Bob Anderson",
    text: "Has anyone received the final agenda for tomorrow's sessions?",
    timestamp: "09:45 AM",
    isCurrentUser: false,
  },
];

export default function ChatroomPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState(127);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newMsg = {
      id: messages.length + 1,
      user: user?.name || "You",
      text: newMessage.trim(),
      timestamp: currentTime,
      isCurrentUser: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Event Chatroom</h1>
          <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <User size={16} className="mr-1" />
            <span className="font-medium">{participants} participants</span>
          </div>
        </div>
        <p className="text-gray-600">
          Join the conversation with speakers and other attendees
        </p>
      </div>

      {/* Chat container */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        {/* Messages area */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.isCurrentUser
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200"
                }`}
              >
                {!message.isCurrentUser && (
                  <div className="font-medium text-blue-600 mb-1">
                    {message.user}
                  </div>
                )}
                <div className="text-sm">{message.text}</div>
                <div
                  className={`text-xs mt-1 flex items-center ${
                    message.isCurrentUser ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  <Clock size={12} className="mr-1" />
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-4 flex"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-r-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center"
          >
            <Send size={18} className="mr-2" />
            Send
          </button>
        </form>
      </div>

      {/* Chat guidelines */}
      <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
        <h3 className="font-medium text-blue-800 mb-2">Chatroom Guidelines</h3>
        <ul className="space-y-1 text-sm text-blue-700 list-disc pl-5">
          <li>Be respectful and professional when interacting with others</li>
          <li>Avoid sharing personal information in the public chat</li>
          <li>Keep messages relevant to the event discussions</li>
          <li>Moderators may remove inappropriate content or users</li>
        </ul>
      </div>
    </div>
  );
}
