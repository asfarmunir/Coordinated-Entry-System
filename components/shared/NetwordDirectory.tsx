"use client";

import React, { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Participant {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  lastAssistance: {
    date: string;
    daysAgo: number;
  };
  totalValue: number;
  totalRecords: number;
  networkAgencies: string[];
  dataSharing: "Full Access" | "Limited Access" | "Restricted";
  assistanceHistory: AssistanceRecord[];
}

interface AssistanceRecord {
  id: string;
  type: string;
  icon: string;
  category:
    | "Emergency Food"
    | "Utility Assistance"
    | "Rental Assistance"
    | "Transportation";
  provider: string;
  date: string;
  providedBy: string;
  amount: number;
  quantity?: string;
  fundingSource?: string;
  note?: string;
  status: "completed" | "pending" | "cancelled";
  riskLevel?: "HIGH RISK" | "MEDIUM RISK" | "LOW RISK";
  daysAgo?: number;
}

const NetwordDirectory = () => {
  const [activeTab, setActiveTab] = useState<"participants" | "agencies">(
    "participants",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("Name");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  // Mock data
  const [participants] = useState<Participant[]>([
    {
      id: "PT-2001",
      name: "Sarah Johnson",
      dateOfBirth: "Mar 15, 1985",
      ssn: "***-**-1234",
      lastAssistance: {
        date: "Dec 7, 2025",
        daysAgo: 61,
      },
      totalValue: 1820.0,
      totalRecords: 4,
      networkAgencies: [
        "Hope Housing Services",
        "Community Care Coalition",
        "Faith Community Services",
      ],
      dataSharing: "Full Access",
      assistanceHistory: [
        {
          id: "1",
          type: "Emergency Food",
          icon: "🍽️",
          category: "Emergency Food",
          provider: "Hope Housing Services",
          date: "Dec 7, 2025",
          providedBy: "Mike Davis",
          amount: 150.0,
          quantity: "3-day supply",
          fundingSource: "FEMA Emergency Food & Shelter Program",
          status: "completed",
          riskLevel: "HIGH RISK",
          daysAgo: 2,
        },
        {
          id: "2",
          type: "Utility Assistance",
          icon: "⚡",
          category: "Utility Assistance",
          provider: "Community Care Coalition",
          date: "Dec 5, 2025",
          providedBy: "Jessica Brown",
          amount: 350.0,
          fundingSource: "LIHEAP",
          note: "Electricity bill assistance",
          status: "completed",
          riskLevel: "MEDIUM RISK",
          daysAgo: 4,
        },
        {
          id: "3",
          type: "Emergency Food",
          icon: "🍽️",
          category: "Emergency Food",
          provider: "Faith Community Services",
          date: "Dec 1, 2025",
          providedBy: "Robert Wilson",
          amount: 120.0,
          quantity: "2-day supply",
          status: "completed",
        },
        {
          id: "4",
          type: "Rental Assistance",
          icon: "🏠",
          category: "Rental Assistance",
          provider: "Hope Housing Services",
          date: "Nov 28, 2025",
          providedBy: "Mike Davis",
          amount: 1200.0,
          fundingSource: "ESG Program",
          note: "One month rent support",
          status: "completed",
        },
      ],
    },
  ]);

  const categories = [
    { id: "all", name: "All Categories", icon: null },
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "housing", name: "Housing", icon: "🏠" },
    { id: "utilities", name: "Utilities", icon: "⚡" },
    { id: "transportation", name: "Transportation", icon: "🚌" },
  ];

  const searchByOptions = ["Name", "ID", "SSN", "Date of Birth"];

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch = participant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // Add category filtering logic here if needed
    return matchesSearch;
  });

  const stats = {
    participantsFound: filteredParticipants.length,
    totalAssistance: filteredParticipants.reduce(
      (sum, p) => sum + p.totalValue,
      0,
    ),
    totalRecords: filteredParticipants.reduce(
      (sum, p) => sum + p.totalRecords,
      0,
    ),
    averagePerPerson:
      filteredParticipants.length > 0
        ? filteredParticipants.reduce((sum, p) => sum + p.totalValue, 0) /
          filteredParticipants.length
        : 0,
  };

  const handleViewHistory = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsHistoryDialogOpen(true);
  };

  const duplicateAlerts =
    selectedParticipant?.assistanceHistory.filter(
      (record) => record.riskLevel,
    ) || [];

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Network Directory"
        description="Search participants and agencies across the coordinated entry network"
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("participants")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "participants"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-muted border border-border"
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Participants
        </button>
        <button
          onClick={() => setActiveTab("agencies")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "agencies"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-muted border border-border"
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Agencies
        </button>
      </div>

      {activeTab === "participants" && (
        <>
          {/* Search Section */}
          <div className="bg-card rounded-2xl p-4 md:p-6 border border-border mb-6">
            <div className="flex flex-row gap-2 md:gap-4 mb-4">
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search Participant
                </label>
                <input
                  type="text"
                  placeholder="Sarah"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="flex items-center gap-2 px-5 py-3 md:py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
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
                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    />
                  </svg>
                  <span className=" hidden md:block">Search</span>
                </button>
              </div>

              {/* Search By Dropdown */}
              <div className="flex-1 hidden md:block md:max-w-xs">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search By
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                    {searchBy}
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
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[200px]">
                    {searchByOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setSearchBy(option)}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {category.icon && <span>{category.icon}</span>}
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 flex items-center justify-center">
                  <svg
                    className="w-5 md:w-6 h-5 md:h-6 text-[#3b82f6]"
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
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Participants Found
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    {stats.participantsFound}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 dark:bg-[#10b981]/20 flex items-center justify-center">
                  <svg
                    className="w-5 md:w-6 h-5 md:h-6 text-[#10b981]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Total Assistance
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    ${stats.totalAssistance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 dark:bg-[#f59e0b]/20 flex items-center justify-center">
                  <svg
                    className="w-5 md:w-6 h-5 md:h-6 text-[#f59e0b]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Total Records
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    {stats.totalRecords}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/20 flex items-center justify-center">
                  <svg
                    className="w-5 md:w-6 h-5 md:h-6 text-[#8b5cf6]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Average/Person
                  </p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">
                    $
                    {stats.averagePerPerson.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="mb-4 ">
            <h3 className="text-lg font-semibold text-foreground">
              Search Results
            </h3>
          </div>

          {/* Results List */}
          <div className="space-y-4 pb-12 md:pb-0">
            {filteredParticipants.map((participant) => (
              <div
                key={participant.id}
                className="bg-card rounded-2xl p-4 md:p-6 border border-border"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#3b82f6]"
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

                    {/* Participant Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {participant.name}
                      </h4>
                      <div className="text-sm text-muted-foreground mb-3">
                        <span className="font-medium">ID:</span>{" "}
                        {participant.id} •{" "}
                        <span className="font-medium">DOB:</span>{" "}
                        {participant.dateOfBirth} •{" "}
                        <span className="font-medium">SSN:</span>{" "}
                        {participant.ssn}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Last Assistance */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Last Assistance
                          </p>
                          <div className="flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4 text-muted-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {participant.lastAssistance.date}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {participant.lastAssistance.daysAgo} days ago
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Total Value */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Total Value
                          </p>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              ${participant.totalValue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {participant.totalRecords} records
                            </p>
                          </div>
                        </div>

                        {/* Network Agencies */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Network Agencies
                          </p>
                          <div className="flex items-center gap-1.5">
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
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {participant.networkAgencies.length} agencies
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {participant.networkAgencies[0]} +
                                {participant.networkAgencies.length - 1}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Data Sharing */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Data Sharing
                          </p>
                          <div className="flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4 text-[#10b981]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 border border-[#10b981]/20">
                              {participant.dataSharing}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View History Button */}
                  <button
                    onClick={() => handleViewHistory(participant)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View History
                  </button>
                </div>
              </div>
            ))}

            {filteredParticipants.length === 0 && (
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No participants found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "agencies" && (
        <div className="text-center py-12 bg-card rounded-2xl border border-border">
          <p className="text-muted-foreground">Agencies view coming soon</p>
        </div>
      )}

      {/* Network Assistance History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Network Assistance History
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Complete assistance history for {selectedParticipant?.name} across
              all network agencies
            </p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Participant Info Header */}
            {selectedParticipant && (
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Participant ID
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedParticipant.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedParticipant.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Assistance
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      ${selectedParticipant.totalValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Data Sharing Level
                    </p>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 border border-[#10b981]/20">
                      {selectedParticipant.dataSharing}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Duplicate Assistance Alerts */}
            {duplicateAlerts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-base font-semibold text-foreground">
                    Recent Duplicate Assistance Alerts
                  </h3>
                </div>

                <div className="space-y-3">
                  {duplicateAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border-2 ${
                        alert.riskLevel === "HIGH RISK"
                          ? "bg-red-50 dark:bg-red-950/20 border-red-300 dark:border-red-800"
                          : "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-300 dark:border-yellow-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">
                              {alert.category}
                            </h4>
                            <span className="text-sm text-muted-foreground">
                              already received {alert.daysAgo} days ago
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Provider: {alert.provider} • Amount: $
                            {alert.amount.toLocaleString()} • Date: {alert.date}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            alert.riskLevel === "HIGH RISK"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700"
                          }`}
                        >
                          {alert.riskLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Assistance History */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Complete Assistance History
              </h3>

              <div className="space-y-3">
                {selectedParticipant?.assistanceHistory.map((record) => (
                  <div
                    key={record.id}
                    className="bg-card rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                        {record.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h4 className="font-semibold text-foreground">
                            {record.category}
                          </h4>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20 border border-[#10b981]/20">
                            ✓ {record.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
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
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                              <span className="text-xs">{record.provider}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
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
                              <span className="text-xs">{record.date}</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
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
                              <span className="text-xs">
                                {record.providedBy}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Amount/Value
                            </p>
                            <p className="font-medium text-foreground">
                              ${record.amount.toLocaleString()}
                            </p>
                          </div>

                          {record.quantity && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Quantity
                              </p>
                              <p className="font-medium text-foreground">
                                {record.quantity}
                              </p>
                            </div>
                          )}

                          {record.fundingSource && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                Funding Source
                              </p>
                              <p className="font-medium text-foreground">
                                {record.fundingSource}
                              </p>
                            </div>
                          )}
                        </div>

                        {record.note && (
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-1">
                              Note:
                            </p>
                            <p className="text-sm text-foreground">
                              {record.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Agencies Involved */}
            {selectedParticipant && (
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Network Agencies Involved
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedParticipant.networkAgencies.map((agency, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm font-medium text-foreground"
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {agency}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-3">
            <button
              onClick={() => setIsHistoryDialogOpen(false)}
              className="px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
            >
              Close
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export History
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NetwordDirectory;
