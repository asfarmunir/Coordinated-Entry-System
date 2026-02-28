"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";

type TabType = "messages" | "files";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  senderName?: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  type: "agency" | "participant" | "group";
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
  isParticipant?: boolean;
  messages: Message[];
}

const Messages = () => {
  const [activeTab, setActiveTab] = useState<TabType>("messages");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");

  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: "1",
      name: "Family Support Services",
      type: "agency",
      lastMessage: "Thank you for the referral update",
      timeAgo: "10 min ago",
      unreadCount: 2,
      messages: [
        {
          id: "m1",
          text: "Hi, I wanted to follow up on the housing referral we sent last week for Jane Smith.",
          sender: "other",
          senderName: "Family Support Services",
          timestamp: "9:30 AM",
        },
        {
          id: "m2",
          text: "Yes, we received it. The client has been scheduled for an intake appointment this Friday.",
          sender: "me",
          timestamp: "9:35 AM",
        },
        {
          id: "m3",
          text: "That's great news! Could you share the appointment details so I can inform the client?",
          sender: "other",
          senderName: "Family Support Services",
          timestamp: "9:40 AM",
        },
        {
          id: "m4",
          text: "Absolutely. The appointment is at 2:00 PM on Friday, November 10th at our main office.",
          sender: "me",
          timestamp: "9:45 AM",
        },
        {
          id: "m5",
          text: "Thank you for the referral update",
          sender: "other",
          senderName: "Family Support Services",
          timestamp: "9:50 AM",
        },
      ],
    },
    {
      id: "2",
      name: "Youth Outreach Program",
      type: "agency",
      lastMessage: "Can we schedule a meeting next week?",
      timeAgo: "1 hour ago",
      unreadCount: 0,
      messages: [
        {
          id: "m1",
          text: "Can we schedule a meeting next week?",
          sender: "other",
          senderName: "Youth Outreach Program",
          timestamp: "8:30 AM",
        },
      ],
    },
    {
      id: "3",
      name: "Housing Coalition",
      type: "agency",
      lastMessage: "New resource available for emergency housing",
      timeAgo: "2 hours ago",
      unreadCount: 5,
      messages: [
        {
          id: "m1",
          text: "New resource available for emergency housing",
          sender: "other",
          senderName: "Housing Coalition",
          timestamp: "Yesterday",
        },
      ],
    },
    {
      id: "4",
      name: "Medical Care Alliance",
      type: "agency",
      lastMessage: "Updated availability schedule attached",
      timeAgo: "Yesterday",
      unreadCount: 0,
      messages: [
        {
          id: "m1",
          text: "Updated availability schedule attached",
          sender: "other",
          senderName: "Medical Care Alliance",
          timestamp: "Yesterday",
        },
      ],
    },
    {
      id: "5",
      name: "Regional Network Updates",
      type: "group",
      lastMessage: "Monthly meeting minutes posted",
      timeAgo: "2 days ago",
      unreadCount: 1,
      messages: [
        {
          id: "m1",
          text: "Monthly meeting minutes posted",
          sender: "other",
          senderName: "Regional Network Updates",
          timestamp: "2 days ago",
        },
      ],
    },
    {
      id: "6",
      name: "Sarah Johnson",
      type: "participant",
      lastMessage: "Thank you for helping me with the housing application",
      timeAgo: "30 min ago",
      unreadCount: 1,
      isParticipant: true,
      messages: [
        {
          id: "m1",
          text: "Thank you for helping me with the housing application",
          sender: "other",
          senderName: "Sarah Johnson",
          timestamp: "30 min ago",
        },
      ],
    },
    {
      id: "7",
      name: "Michael Chen",
      type: "participant",
      lastMessage: "When is my next appointment?",
      timeAgo: "2 hours ago",
      unreadCount: 1,
      isParticipant: true,
      messages: [
        {
          id: "m1",
          text: "When is my next appointment?",
          sender: "other",
          senderName: "Michael Chen",
          timestamp: "2 hours ago",
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    // Add new message logic here
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case "agency":
        return (
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        );
      case "participant":
        return (
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        );
      case "group":
        return (
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Communication & File Sharing"
        description="Secure messaging with agencies and participants"
      />

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab("messages")}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base ${
            activeTab === "messages"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-card/80 border border-border"
          }`}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base ${
            activeTab === "files"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-card/80 border border-border"
          }`}
        >
          Shared Files
        </button>
      </div>

      {activeTab === "messages" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-16rem)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-card rounded-2xl border border-border p-4 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                Conversations
              </h3>
              <button className="p-2 hover:bg-background rounded-lg transition-colors">
                <svg
                  className="w-5 h-5 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${
                    selectedConversation?.id === conv.id
                      ? "bg-primary/10"
                      : "hover:bg-background"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getConversationIcon(conv.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {conv.name}
                        </h4>
                        {conv.unreadCount > 0 && (
                          <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex-shrink-0">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {conv.timeAgo}
                        </span>
                        {conv.isParticipant && (
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-md">
                            Participant
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      {selectedConversation.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Direct message
                    </p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-background rounded-lg transition-colors">
                    View Info
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col ${
                        message.sender === "me" ? "items-end" : "items-start"
                      }`}
                    >
                      {message.sender === "other" && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {message.senderName}
                        </p>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border border-border text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-background rounded-lg transition-colors flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                      <svg
                        className="w-5 h-5 rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-muted-foreground mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="text-foreground font-medium mb-1">
                    No conversation selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Choose a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-muted-foreground mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="text-foreground font-medium mb-1">Shared Files</p>
          <p className="text-sm text-muted-foreground">
            View and manage shared documents
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
