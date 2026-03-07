"use client";

import { useState } from "react";

// ─── Mock data ───────────────────────────────────────────────────────────────

const caseManagementTeam = [
  {
    agency: "Hope Housing Services",
    members: [
      {
        initials: "SJ",
        name: "Sarah Johnson",
        role: "Case Manager",
        roleColor: "bg-primary/15 text-primary",
        phone: "(555) 123-4567",
        email: "sarah@hopehousing.org",
      },
      {
        initials: "DM",
        name: "David Miller",
        role: "Housing Navigator",
        roleColor:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        phone: "(555) 234-5678",
        email: "d.miller@hopehousing.org",
      },
    ],
  },
  {
    agency: "Community Outreach Center",
    members: [
      {
        initials: "MC",
        name: "Michael Chen",
        role: "Outreach Specialist",
        roleColor:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
        phone: "(555) 345-6789",
        email: "michael.chen@outreach.org",
      },
    ],
  },
];

const informationRequests = [
  {
    id: 1,
    title: "Housing Application Status",
    agency: "Hope Housing Services",
    description:
      "We need additional documentation to complete your housing application. Please provide proof of income and recent bank statements.",
    status: "Pending Response",
    received: "Nov 10, 2025",
  },
  {
    id: 2,
    title: "Update Contact Information",
    agency: "Community Outreach Services",
    description:
      "Please confirm your current mailing address and phone number for our records.",
    status: "Pending Response",
    received: "Nov 16, 2025",
  },
];

const serviceHistory = [
  {
    id: 1,
    title: "Emergency Shelter",
    agency: "Hope Housing Services",
    date: "2024-11-09",
    category: "Housing",
    status: "Completed",
  },
  {
    id: 2,
    title: "Case Management Session",
    agency: "Hope Housing Services",
    date: "2024-11-20",
    category: "Support Services",
    status: "Completed",
  },
  {
    id: 3,
    title: "Job Training Workshop",
    agency: "Community Outreach Center",
    date: "2024-11-25",
    category: "Employment",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Housing Assessment",
    agency: "Hope Housing Services",
    date: "2024-11-30",
    category: "Housing",
    status: "Scheduled",
  },
];

const appointments = [
  {
    id: 1,
    title: "Housing Assessment Follow-up",
    agency: "Hope Housing Services",
    date: "2024-12-05",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Job Readiness Coaching",
    agency: "Community Outreach Center",
    date: "2024-12-10",
    time: "2:00 PM",
    status: "Upcoming",
  },
];

const quickActions = [
  {
    label: "Update Profile",
    icon: (
      <svg
        className="w-4 h-4"
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
    ),
  },
  {
    label: "View Calendar",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Messages",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h8M8 14h5m9 1a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h11a4 4 0 014 4z"
        />
      </svg>
    ),
  },
  {
    label: "Upload Documents",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12"
        />
      </svg>
    ),
  },
  {
    label: "Manage Consent",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

// ─── Status badge helpers ────────────────────────────────────────────────────

const statusStyles: Record<string, string> = {
  Completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Scheduled: "bg-primary/10 text-primary",
  Upcoming: "bg-primary/10 text-primary",
  "Pending Response":
    "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

// ─── Component ───────────────────────────────────────────────────────────────

const ParticipantPortal = () => {
  const [historyTab, setHistoryTab] = useState<"services" | "appointments">(
    "services",
  );

  return (
    <div className="min-h-screen bg-background px-4 md:px-6 2xl:px-8 py-6 2xl:py-8">
      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl 2xl:text-3xl font-semibold text-foreground">
          Welcome, Sarah
        </h1>
        <p className="text-sm 2xl:text-base text-muted-foreground mt-0.5">
          Track your services, appointments, and support journey
        </p>
      </div>

      {/* ── Main grid ── */}
      <div className="flex flex-col lg:flex-row gap-4 2xl:gap-6">
        {/* ── Left column ── */}
        <div className="flex-1 min-w-0 space-y-4 2xl:space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl 2xl:text-3xl font-bold text-foreground">
                  2
                </p>
                <p className="text-xs 2xl:text-sm text-muted-foreground">
                  Services Enrolled
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl 2xl:text-3xl font-bold text-foreground">
                  2
                </p>
                <p className="text-xs 2xl:text-sm text-muted-foreground">
                  Upcoming Appointments
                </p>
              </div>
            </div>
          </div>

          {/* Case Management Team */}
          <div className="bg-card border border-border rounded-2xl p-5 2xl:p-6">
            <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
              Your Case Management Team
            </p>
            <div className="space-y-5">
              {caseManagementTeam.map((group) => (
                <div key={group.agency}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <svg
                        className="w-3.5 h-3.5"
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
                    <p className="text-sm 2xl:text-base font-medium text-foreground">
                      {group.agency}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {group.members.map((member) => (
                      <div
                        key={member.name}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-8"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 2xl:w-9 2xl:h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                            {member.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm 2xl:text-base font-medium text-foreground">
                                {member.name}
                              </p>
                              <span
                                className={`text-[10px] 2xl:text-xs px-2 py-0.5 rounded-full font-medium ${member.roleColor}`}
                              >
                                {member.role}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                              <span className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                                {member.phone}
                              </span>
                              <span className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                                {member.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pl-11 sm:pl-0 shrink-0">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs 2xl:text-sm text-muted-foreground hover:bg-background transition-colors">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 10h8M8 14h5m9 1a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h11a4 4 0 014 4z"
                              />
                            </svg>
                            Message
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs 2xl:text-sm text-muted-foreground hover:bg-background transition-colors">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Book Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Requests */}
          <div className="bg-card border border-border rounded-2xl p-5 2xl:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm 2xl:text-base font-semibold text-foreground">
                Information Requests
              </p>
              <span className="text-xs 2xl:text-sm px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 font-medium">
                {informationRequests.length} Pending
              </span>
            </div>
            <div className="space-y-3">
              {informationRequests.map((req) => (
                <div
                  key={req.id}
                  className="border border-border rounded-xl p-4 2xl:p-5"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <p className="text-sm 2xl:text-base font-medium text-foreground">
                        {req.title}
                      </p>
                      <p className="text-xs 2xl:text-sm text-muted-foreground">
                        {req.agency}
                      </p>
                    </div>
                    <span
                      className={`text-xs 2xl:text-sm px-2.5 py-0.5 rounded-full font-medium shrink-0 ${statusStyles[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs 2xl:text-sm text-muted-foreground mt-2">
                    {req.description}
                  </p>
                  <p className="text-[10px] 2xl:text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Received: {req.received}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Service History / Appointments tabs */}
          <div className="bg-card border border-border rounded-2xl p-5 2xl:p-6">
            <div className="flex bg-background border border-border rounded-xl p-1 mb-5 w-fit">
              <button
                onClick={() => setHistoryTab("services")}
                className={`px-4 py-1.5 rounded-lg text-sm 2xl:text-base font-medium transition-all ${
                  historyTab === "services"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Service History
              </button>
              <button
                onClick={() => setHistoryTab("appointments")}
                className={`px-4 py-1.5 rounded-lg text-sm 2xl:text-base font-medium transition-all ${
                  historyTab === "appointments"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Appointments
              </button>
            </div>

            {historyTab === "services" && (
              <div className="space-y-3">
                {serviceHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 py-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm 2xl:text-base font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs 2xl:text-sm text-muted-foreground">
                        {item.agency}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {item.date}
                        </span>
                        <span className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z"
                            />
                          </svg>
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs 2xl:text-sm px-2.5 py-0.5 rounded-full font-medium shrink-0 ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {historyTab === "appointments" && (
              <div className="space-y-3">
                {appointments.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 py-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm 2xl:text-base font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs 2xl:text-sm text-muted-foreground">
                        {item.agency}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {item.date}
                        </span>
                        <span className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {item.time}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs 2xl:text-sm px-2.5 py-0.5 rounded-full font-medium shrink-0 ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Help banner */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 2xl:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm 2xl:text-base font-semibold text-foreground">
                  Need Help Finding Services?
                </p>
                <p className="text-xs 2xl:text-sm text-muted-foreground mt-0.5">
                  Your case managers can provide personalised recommendations
                  and assistance with services. They can help you navigate
                  available resources and connect you with the services that
                  best meet your needs.
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm 2xl:text-base font-medium shrink-0 hover:bg-primary/90 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5m9 1a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h11a4 4 0 014 4z"
                />
              </svg>
              Contact Case Manager
            </button>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="lg:w-56 2xl:w-64 shrink-0 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 2xl:p-6">
            <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Quick Actions
            </p>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm 2xl:text-base text-muted-foreground hover:bg-background hover:text-foreground transition-colors text-left"
                >
                  <span className="text-primary shrink-0">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantPortal;
