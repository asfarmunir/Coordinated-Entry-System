"use client";

import { useState, useRef, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type ConvType = "case-manager" | "agency" | "group";

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
  role?: string;
  type: ConvType;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
  messages: Message[];
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Case Manager",
    type: "case-manager",
    lastMessage: "Your appointment is confirmed for Friday at 2 PM.",
    timeAgo: "10 min ago",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        text: "Hi Maria! I wanted to check in and see how things are going since your last visit.",
        sender: "other",
        senderName: "Sarah Johnson",
        timestamp: "9:20 AM",
      },
      {
        id: "m2",
        text: "Hi Sarah! Things are going well. I've been looking into the housing programs you mentioned.",
        sender: "me",
        timestamp: "9:28 AM",
      },
      {
        id: "m3",
        text: "That's great to hear! I've submitted your referral to Hope Housing Services. They should contact you within 2 business days.",
        sender: "other",
        senderName: "Sarah Johnson",
        timestamp: "9:35 AM",
      },
      {
        id: "m4",
        text: "Thank you so much! Do I need to bring any documents to the intake appointment?",
        sender: "me",
        timestamp: "9:42 AM",
      },
      {
        id: "m5",
        text: "Your appointment is confirmed for Friday at 2 PM.",
        sender: "other",
        senderName: "Sarah Johnson",
        timestamp: "9:50 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Hope Housing Services",
    type: "agency",
    lastMessage: "Please bring your ID and SSN card to the intake.",
    timeAgo: "1 hour ago",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        text: "Hello Maria, we received your referral from Sarah Johnson. Welcome!",
        sender: "other",
        senderName: "Hope Housing Services",
        timestamp: "8:00 AM",
      },
      {
        id: "m2",
        text: "Thank you! I'm looking forward to meeting with your team.",
        sender: "me",
        timestamp: "8:15 AM",
      },
      {
        id: "m3",
        text: "Please bring your ID and SSN card to the intake.",
        sender: "other",
        senderName: "Hope Housing Services",
        timestamp: "8:30 AM",
      },
    ],
  },
  {
    id: "3",
    name: "Community Outreach Center",
    type: "agency",
    lastMessage: "Food pantry hours have changed — now open Saturdays.",
    timeAgo: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "Food pantry hours have changed — now open Saturdays.",
        sender: "other",
        senderName: "Community Outreach Center",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "4",
    name: "Family Support Services",
    type: "agency",
    lastMessage: "Your case management session is scheduled.",
    timeAgo: "2 days ago",
    unreadCount: 0,
    messages: [
      {
        id: "m1",
        text: "Your case management session is scheduled.",
        sender: "other",
        senderName: "Family Support Services",
        timestamp: "2 days ago",
      },
    ],
  },
  {
    id: "5",
    name: "Participant Announcements",
    type: "group",
    lastMessage: "New rental assistance program now accepting applications.",
    timeAgo: "3 days ago",
    unreadCount: 3,
    messages: [
      {
        id: "m1",
        text: "New rental assistance program now accepting applications. Please speak with your case manager for more details.",
        sender: "other",
        senderName: "CES Network",
        timestamp: "3 days ago",
      },
    ],
  },
];

// ── Icon helpers ──────────────────────────────────────────────────────────────
const ConvIcon = ({ type, name }: { type: ConvType; name: string }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  if (type === "case-manager") {
    return (
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
        {initials}
      </div>
    );
  }
  if (type === "agency") {
    return (
      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
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
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
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
};

const typeBadge: Record<ConvType, { label: string; cls: string }> = {
  "case-manager": { label: "Case Manager", cls: "bg-primary/10 text-primary" },
  agency: {
    label: "Agency",
    cls: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  group: {
    label: "Broadcast",
    cls: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(
    INITIAL_CONVERSATIONS,
  );
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages.length]);

  const filtered = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (conv: Conversation) => {
    // Clear unread count on open
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c)),
    );
    setSelected({ ...conv, unreadCount: 0 });
  };

  const handleSend = () => {
    if (!input.trim() || !selected) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: input.trim(),
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const updated = conversations.map((c) =>
      c.id === selected.id
        ? {
            ...c,
            messages: [...c.messages, newMsg],
            lastMessage: newMsg.text,
            timeAgo: "Just now",
          }
        : c,
    );
    setConversations(updated);
    setSelected(updated.find((c) => c.id === selected.id) ?? null);
    setInput("");
  };

  return (
    <div className="h-full max-w-full bg-background px-4 md:px-6 2xl:px-8 py-5 2xl:py-7 flex flex-col">
      {/* ── Header ── */}
      <div className="mb-5">
        <h1 className="text-xl 2xl:text-2xl font-bold text-foreground">
          Messages
        </h1>
        <p className="text-xs 2xl:text-sm text-muted-foreground mt-0.5">
          Secure messaging with your case managers and service providers
        </p>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0 h-[calc(100vh-14rem)]">
        {/* ── Sidebar: conversation list ── */}
        <div className="lg:col-span-1 bg-card rounded-2xl px-4  border border-border flex flex-col overflow-hidden">
          {/* List header */}
          <div className="flex items-center justify-between mb-4  py-4  border-b border-border shrink-0">
            <h3 className="text-sm 2xl:text-base font-semibold text-foreground">
              Conversations
            </h3>
            <button
              className="p-1.5 hover:bg-background rounded-lg transition-colors"
              title="New message"
            >
              <svg
                className="w-4 h-4 text-muted-foreground"
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
          <div className="px-4 bg-background mb-1 border border-border rounded-lg">
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2  focus:border-0 text-xs 2xl:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-8">
                No conversations found
              </p>
            ) : (
              filtered.map((conv) => {
                const badge = typeBadge[conv.type];
                return (
                  <button
                    key={conv.id}
                    onClick={() => handleSelect(conv)}
                    className={`w-full text-left py-3 transition-colors flex items-start gap-3 ${
                      selected?.id === conv.id
                        ? "bg-primary/10"
                        : "hover:bg-background"
                    }`}
                  >
                    <ConvIcon type={conv.type} name={conv.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p className="text-xs 2xl:text-sm font-semibold text-foreground truncate">
                          {conv.name}
                        </p>
                        {conv.unreadCount > 0 && (
                          <div className="shrink-0 w-4.5 px-2 py-1 h-4.5  bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] 2xl:text-xs text-muted-foreground truncate mb-1">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] 2xl:text-[11px] text-muted-foreground">
                          {conv.timeAgo}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${badge.cls}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── Chat area ── */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border flex flex-col overflow-hidden">
          {selected ? (
            <>
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <ConvIcon type={selected.type} name={selected.name} />
                  <div>
                    <p className="text-sm 2xl:text-base font-semibold text-foreground leading-tight">
                      {selected.name}
                    </p>
                    <p className="text-[11px] 2xl:text-xs text-muted-foreground">
                      {selected.role ?? typeBadge[selected.type].label}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selected.type === "group" && (
                    <span className="text-[10px] text-muted-foreground italic">
                      Read-only broadcast channel
                    </span>
                  )}
                  <button className="px-3 py-1.5 text-xs 2xl:text-sm font-medium text-muted-foreground hover:bg-background rounded-lg transition-colors border border-border">
                    View Info
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {selected.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                  >
                    {msg.sender === "other" && (
                      <p className="text-[11px] text-muted-foreground mb-1">
                        {msg.senderName}
                      </p>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-background border border-border text-foreground rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm 2xl:text-base leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {msg.timestamp}
                    </p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-4 border-t border-border shrink-0">
                {selected.type === "group" ? (
                  <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-4 py-3">
                    <svg
                      className="w-4 h-4 text-muted-foreground shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    <p className="text-xs text-muted-foreground">
                      This is a broadcast channel. You cannot reply here.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-background rounded-lg transition-colors shrink-0"
                      title="Attach file"
                    >
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
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
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
                )}
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
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
                </div>
                <p className="text-sm 2xl:text-base font-semibold text-foreground mb-1">
                  No conversation selected
                </p>
                <p className="text-xs 2xl:text-sm text-muted-foreground">
                  Select a conversation to start messaging your case manager or
                  service provider
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
