"use client";

import { useState, useMemo } from "react";
import ScreenHeader from "./ScreenHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type TabType = "all" | "active" | "scheduled" | "archived";

const bulletins = [
  {
    id: "BL-2001",
    title: "URGENT: Winter Shelter Opening Tonight",
    badge: "Event",
    description:
      "Due to freezing temperatures, our winter shelter will open tonight at 6 PM. Capacity for 50 individuals. Hot meals and blankets provided. Located at 123 Main Street.",
    organization: "Community Hope Services",
    organizationType: "Non-Profit Organization",
    isPinned: true,
    expiryDate: "25/11/2025",
    postedDate: "Nov 18, 2025",
  },
  {
    id: "BL-2002",
    title: "Job Fair - November 25th",
    badge: "Event",
    description:
      "Annual community job fair featuring 30+ employers. Free resume assistance and interview prep workshops. Participants welcome! 9 AM - 4 PM at the Community Center.",
    organization: "Employment First Initiative",
    organizationType: "Community Organization",
    isPinned: false,
    expiryDate: "26/11/2025",
    postedDate: "Nov 17, 2025",
  },
  {
    id: "BL-2003",
    title: "Updated HMIS Data Sharing Guidelines",
    badge: "Policy",
    description:
      "New HUD guidelines for HMIS data sharing are now in effect. All agencies must review and update their consent forms by December 1st. Training sessions available next week.",
    organization: "CES Coordinating Office",
    organizationType: "Government Agency",
    isPinned: false,
    expiryDate: "15/12/2025",
    postedDate: "Nov 17, 2025",
  },
  {
    id: "BL-2004",
    title: "Food Pantry Extended Hours",
    badge: "General",
    description:
      "Starting December 1st, our food pantry will be open Saturdays 10 AM - 2 PM in addition to weekday hours. Serving 200+ families weekly. Donations welcome.",
    organization: "Food Security Network",
    organizationType: "Community Organization",
    isPinned: false,
    expiryDate: "31/01/2026",
    postedDate: "Nov 16, 2025",
  },
];

const Bulletins = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [filterType, setFilterType] = useState<string>("All Types");

  const filteredBulletins = useMemo(() => {
    if (filterType === "All Types") return bulletins;
    return bulletins.filter((bulletin) => bulletin.badge === filterType);
  }, [filterType]);

  return (
    <div className="h-full bg-card-foreground rounded-2xl p-3 md:p-6">
      <ScreenHeader
        title="Bulletin Management"
        description="Manage announcements, notices, and community updates"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Total Bulletins
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                3
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Active
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                2
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <svg
                className="w-6 h-6"
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
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Scheduled
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                1
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 md:gap-2 bg-card rounded-xl p-1 border border-border overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Bulletins
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all whitespace-nowrap ${
                activeTab === "active"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("scheduled")}
              className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all whitespace-nowrap ${
                activeTab === "scheduled"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setActiveTab("archived")}
              className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all flex items-center gap-1 md:gap-2 whitespace-nowrap ${
                activeTab === "archived"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
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
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <span className="hidden sm:inline">Archived</span>
            </button>
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:bg-background transition-colors">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span className="hidden md:inline">{filterType}</span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem
                onClick={() => setFilterType("All Types")}
                className="cursor-pointer"
              >
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterType("Event")}
                className="cursor-pointer"
              >
                Event
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterType("Policy")}
                className="cursor-pointer"
              >
                Policy
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilterType("General")}
                className="cursor-pointer"
              >
                General
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm md:text-base"
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Post Bulletin
        </button>
      </div>

      {/* Bulletins Feed */}
      <div className="space-y-4 pb-4">
        {filteredBulletins.map((bulletin) => (
          <div
            key={bulletin.id}
            className="bg-card rounded-2xl border border-border p-4 md:p-6 "
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {bulletin.isPinned && (
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                  </svg>
                )}
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                    bulletin.badge === "Your Post"
                      ? "bg-primary/10 text-primary"
                      : bulletin.badge === "Event"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : bulletin.badge === "Policy"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }`}
                >
                  {bulletin.badge}
                </span>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              {bulletin.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              {bulletin.description}
            </p>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-foreground">
                    {bulletin.organization}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {bulletin.organizationType}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Expires: {bulletin.expiryDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
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
                  <span>{bulletin.postedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Bulletin Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Bulletin</DialogTitle>
            <DialogDescription>Complete bulletin information</DialogDescription>
          </DialogHeader>

          {/* Modal Content */}
          <div className="space-y-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bulletin Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bulletin title"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Select category</option>
                    <option>Event</option>
                    <option>Announcement</option>
                    <option>Notice</option>
                    <option>Update</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Priority
                  </label>
                  <select className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Author name"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bulletin Content *{" "}
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter bulletin description"
                    className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dialog Footer */}
          <DialogFooter className="gap-2 sm:gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className="bg-primary text-primary-foreground hover:opacity-90">
              Add Bulletin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bulletins;
