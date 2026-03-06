"use client";

import Image from "next/image";
import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type TabType = "all" | "pending" | "active" | "archived";
type FormTab = "identification" | "income" | "demographics" | "roi";

const participants = [
  {
    id: "PT-2001",
    name: "Sarah Johnson",
    phone: "(555) 111-2222",
    email: "s.johnson@email.com",
  },
  {
    id: "PT-2003",
    name: "Michael Roberts",
    phone: "(555) 333-4444",
    email: "m.roberts@email.com",
  },
];

const Participants = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formTab, setFormTab] = useState<FormTab>("identification");

  // Form state
  const [formData, setFormData] = useState({
    // Identification
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    maidenName: "",
    nickname: "",
    dateOfBirth: "",
    ssn: { part1: "", part2: "", part3: "" },
    isHeadOfHousehold: false,
    streetAddress: {
      address: "",
      apt: "",
      city: "",
      state: "CA",
      zip: "",
      county: "",
    },
    mailingAddress: {
      address: "",
      apt: "",
      city: "",
      state: "CA",
      zip: "",
      county: "",
    },
    phoneNumbers: [
      { description: "", number: { part1: "", part2: "", part3: "" }, ext: "" },
    ],
    idNumbers: [{ description: "", number: "" }],
    email: "",
    // Income & Expenses
    incomeSources: [] as Array<{
      source: string;
      phone: string;
      amount: string;
      interval: string;
    }>,
    expenses: [] as Array<{ category: string; amount: string }>,
    // Demographics
    gender: "",
    ethnicity: "",
    education: "",
    employment: "",
    maritalStatus: "",
    governmentAssistance: [] as string[],
    criticalStatus: [] as string[],
  });

  const handleCopyAddress = () => {
    setFormData({
      ...formData,
      mailingAddress: { ...formData.streetAddress },
    });
  };

  const addPhoneNumber = () => {
    setFormData({
      ...formData,
      phoneNumbers: [
        ...formData.phoneNumbers,
        {
          description: "",
          number: { part1: "", part2: "", part3: "" },
          ext: "",
        },
      ],
    });
  };

  const addIdNumber = () => {
    setFormData({
      ...formData,
      idNumbers: [...formData.idNumbers, { description: "", number: "" }],
    });
  };

  const addIncomeSource = () => {
    setFormData({
      ...formData,
      incomeSources: [
        ...formData.incomeSources,
        { source: "", phone: "", amount: "", interval: "" },
      ],
    });
  };

  const removeIncomeSource = (index: number) => {
    setFormData({
      ...formData,
      incomeSources: formData.incomeSources.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="h-full bg-card-foreground rounded-2xl p-3 md:p-6">
      <ScreenHeader
        title="Participant Management"
        description="HUD HMIS compliant registration with privacy controls"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Image
                src="/icons/total-p.svg"
                alt="Total Participants"
                width={22}
                height={22}
              />
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Total Participants
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                2
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-500/10 text-gray-500 flex items-center justify-center">
              <Image
                src="/icons/anonymous.svg"
                alt="Total Participants"
                width={22}
                height={22}
              />
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Anonymous
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                0
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
              <Image
                src="/icons/active.svg"
                alt="Total Participants"
                width={22}
                height={22}
              />
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
      </div>

      {/* Tabs and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-1 md:gap-2 bg-card rounded-xl p-1 border border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all whitespace-nowrap ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Participants
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all whitespace-nowrap ${
              activeTab === "pending"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending
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
            <span className="inline">Archived</span>
          </button>
        </div>
        <button
          onClick={() => setIsAddDialogOpen(true)}
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
          Add Participant
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
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
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, alias, ID..."
            className="flex-1 bg-transparent border-none outline-none text-sm 2xl:text-base text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Participant ID
              </th>
              <th className="text-left px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Name / Alias
              </th>
              <th className="text-left px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Contact
              </th>
              <th className="text-left px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr
                key={participant.id}
                className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-sm 2xl:text-base font-medium text-primary dark:text-blue-400">
                    {participant.id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
                    <span className="text-sm 2xl:text-base font-medium text-foreground">
                      {participant.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm 2xl:text-base text-muted-foreground">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {participant.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm 2xl:text-base text-muted-foreground">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {participant.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={"/participants/1"}>
                      <button className="p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </Link>

                    <button className="p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-card rounded-2xl border border-border p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {participant.name}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {participant.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href={"/participants/1"}>
                  <button className="p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </Link>

                <button className="p-2 rounded-lg hover:bg-background transition-colors text-muted-foreground">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-2 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {participant.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {participant.email}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Participant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="md:max-w-7xl p-0 md:p-0 max-h-[90vh] overflow-y-auto">
          {/* Header with Title and Actions */}
          <div className="flex items-center justify-between bg-card p-4 md:p-6 md:px-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  New Participant Registration
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Coordinated Entry Network
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Register
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center border-b border-border  px-4 md:px-9  gap-6">
            <button
              onClick={() => setFormTab("identification")}
              className={`px-6 py-3 text-sm  transition-colors relative ${
                formTab === "identification"
                  ? "font-bold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              IDENTIFICATION
              {formTab === "identification" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setFormTab("income")}
              className={`px-6 py-3 text-sm  transition-colors relative ${
                formTab === "income"
                  ? "font-bold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              INCOME & EXPENSES
              {formTab === "income" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setFormTab("demographics")}
              className={`px-6 py-3 text-sm  transition-colors relative ${
                formTab === "demographics"
                  ? "font-bold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DEMOGRAPHICS
              {formTab === "demographics" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setFormTab("roi")}
              className={`px-6 py-3 text-sm  transition-colors relative ${
                formTab === "roi"
                  ? "font-bold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ROI
              {formTab === "roi" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 pb-16 md:px-9">
            {/* IDENTIFICATION TAB */}
            {formTab === "identification" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Personal Identification
                  </h2>
                  <span className="text-sm text-primary font-medium">
                    SECTION 1 OF 4
                  </span>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      FIRST NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      MIDDLE NAME
                    </label>
                    <input
                      type="text"
                      value={formData.middleName}
                      onChange={(e) =>
                        setFormData({ ...formData, middleName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      LAST NAME <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      SUFFIX
                    </label>
                    <input
                      type="text"
                      placeholder="Jr., Sr., III"
                      value={formData.suffix}
                      onChange={(e) =>
                        setFormData({ ...formData, suffix: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Maiden Name & Nickname */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      MAIDEN NAME
                    </label>
                    <input
                      type="text"
                      value={formData.maidenName}
                      onChange={(e) =>
                        setFormData({ ...formData, maidenName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      NICKNAME
                    </label>
                    <input
                      type="text"
                      value={formData.nickname}
                      onChange={(e) =>
                        setFormData({ ...formData, nickname: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* DOB & SSN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      DATE OF BIRTH (MM-DD-YYYY)
                    </label>
                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      SOCIAL SECURITY NUMBER
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="XXX"
                        maxLength={3}
                        value={formData.ssn.part1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ssn: { ...formData.ssn, part1: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="text"
                        placeholder="XX"
                        maxLength={2}
                        value={formData.ssn.part2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ssn: { ...formData.ssn, part2: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-muted-foreground">-</span>
                      <input
                        type="text"
                        placeholder="XXXX"
                        maxLength={4}
                        value={formData.ssn.part3}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ssn: { ...formData.ssn, part3: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Head of Household */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isHeadOfHousehold}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isHeadOfHousehold: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-foreground">
                    This individual is the Head Of Household
                  </span>
                </label>

                {/* Street Address */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded" />
                    Street Address
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ADDRESS
                        </label>
                        <input
                          type="text"
                          value={formData.streetAddress.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              streetAddress: {
                                ...formData.streetAddress,
                                address: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          APT #
                        </label>
                        <input
                          type="text"
                          value={formData.streetAddress.apt}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              streetAddress: {
                                ...formData.streetAddress,
                                apt: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          CITY
                        </label>
                        <input
                          type="text"
                          value={formData.streetAddress.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              streetAddress: {
                                ...formData.streetAddress,
                                city: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          STATE
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                            {formData.streetAddress.state}
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
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  streetAddress: {
                                    ...formData.streetAddress,
                                    state: "CA",
                                  },
                                })
                              }
                            >
                              CA
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  streetAddress: {
                                    ...formData.streetAddress,
                                    state: "NY",
                                  },
                                })
                              }
                            >
                              NY
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  streetAddress: {
                                    ...formData.streetAddress,
                                    state: "TX",
                                  },
                                })
                              }
                            >
                              TX
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ZIP
                        </label>
                        <input
                          type="text"
                          value={formData.streetAddress.zip}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              streetAddress: {
                                ...formData.streetAddress,
                                zip: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          COUNTY
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center justify-between">
                            ----------
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
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  streetAddress: {
                                    ...formData.streetAddress,
                                    county: "Los Angeles",
                                  },
                                })
                              }
                            >
                              Los Angeles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  streetAddress: {
                                    ...formData.streetAddress,
                                    county: "Orange",
                                  },
                                })
                              }
                            >
                              Orange
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mailing Address */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <div className="w-1 h-5 bg-primary rounded" />
                      Mailing Address
                    </h3>
                    <button
                      onClick={handleCopyAddress}
                      className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
                    >
                      COPY FROM STREET
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ADDRESS
                        </label>
                        <input
                          type="text"
                          value={formData.mailingAddress.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mailingAddress: {
                                ...formData.mailingAddress,
                                address: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          APT #
                        </label>
                        <input
                          type="text"
                          value={formData.mailingAddress.apt}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mailingAddress: {
                                ...formData.mailingAddress,
                                apt: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          CITY
                        </label>
                        <input
                          type="text"
                          value={formData.mailingAddress.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mailingAddress: {
                                ...formData.mailingAddress,
                                city: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          STATE
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                            {formData.mailingAddress.state}
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
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  mailingAddress: {
                                    ...formData.mailingAddress,
                                    state: "CA",
                                  },
                                })
                              }
                            >
                              CA
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  mailingAddress: {
                                    ...formData.mailingAddress,
                                    state: "NY",
                                  },
                                })
                              }
                            >
                              NY
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  mailingAddress: {
                                    ...formData.mailingAddress,
                                    state: "TX",
                                  },
                                })
                              }
                            >
                              TX
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ZIP
                        </label>
                        <input
                          type="text"
                          value={formData.mailingAddress.zip}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mailingAddress: {
                                ...formData.mailingAddress,
                                zip: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          COUNTY
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center justify-between">
                            ----------
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
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  mailingAddress: {
                                    ...formData.mailingAddress,
                                    county: "Los Angeles",
                                  },
                                })
                              }
                            >
                              Los Angeles
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  mailingAddress: {
                                    ...formData.mailingAddress,
                                    county: "Orange",
                                  },
                                })
                              }
                            >
                              Orange
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded" />
                    Phone Numbers
                  </h3>
                  <div className="space-y-3">
                    {formData.phoneNumbers.map((phone, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4"
                      >
                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            DESCRIPTION
                          </label>
                          <input
                            type="text"
                            placeholder="(ex. Home or Cell)"
                            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="md:col-span-7">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            NUMBER
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="XXX"
                              maxLength={3}
                              className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <span className="text-muted-foreground">-</span>
                            <input
                              type="text"
                              placeholder="XXX"
                              maxLength={3}
                              className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <span className="text-muted-foreground">-</span>
                            <input
                              type="text"
                              placeholder="XXXX"
                              maxLength={4}
                              className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-2">
                            EXT
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addPhoneNumber}
                    className="mt-3 flex items-center gap-2 text-primary font-medium text-sm hover:underline"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    ADD ANOTHER PHONE NUMBER
                  </button>
                </div>

                {/* Identification Numbers */}
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded" />
                    Identification Numbers
                  </h3>
                  <div className="space-y-3">
                    {formData.idNumbers.map((id, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            DESCRIPTION
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Driver's License, Passport"
                            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            NUMBER
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addIdNumber}
                    className="mt-3 flex items-center gap-2 text-primary font-medium text-sm hover:underline"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    ADD ANOTHER ID NUMBER
                  </button>
                </div>

                {/* Primary Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2 uppercase">
                    Primary Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* INCOME & EXPENSES TAB */}
            {formTab === "income" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Financial Assessment
                  </h2>
                  <span className="text-sm text-primary font-medium">
                    SECTION 2 OF 4
                  </span>
                </div>

                {/* Income Sources */}
                <div className="bg-card p-4 rounded-lg md:px-6">
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded" />
                    Income Sources
                  </h3>

                  {formData.incomeSources.length > 0 && (
                    <div className="space-y-3 mb-3">
                      {formData.incomeSources.map((source, index) => (
                        <div
                          key={index}
                          className="bg-muted/30 rounded-xl p-4 border border-border"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-3">
                              <label className="block text-sm font-medium text-foreground mb-2">
                                SOURCE NAME
                              </label>
                              <input
                                type="text"
                                value={source.source}
                                onChange={(e) => {
                                  const newSources = [
                                    ...formData.incomeSources,
                                  ];
                                  newSources[index].source = e.target.value;
                                  setFormData({
                                    ...formData,
                                    incomeSources: newSources,
                                  });
                                }}
                                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div className="md:col-span-3">
                              <label className="block text-sm font-medium text-foreground mb-2">
                                CONTACT PHONE
                              </label>
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  placeholder="XXX"
                                  maxLength={3}
                                  className="w-full px-2 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <span className="text-muted-foreground">-</span>
                                <input
                                  type="text"
                                  placeholder="XXX"
                                  maxLength={3}
                                  className="w-full px-2 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <span className="text-muted-foreground">-</span>
                                <input
                                  type="text"
                                  placeholder="XXXX"
                                  maxLength={4}
                                  className="w-full px-2 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                            <div className="md:col-span-3">
                              <label className="block text-sm font-medium text-foreground mb-2">
                                AMOUNT
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  $
                                </span>
                                <input
                                  type="number"
                                  placeholder="0.00"
                                  value={source.amount}
                                  onChange={(e) => {
                                    const newSources = [
                                      ...formData.incomeSources,
                                    ];
                                    newSources[index].amount = e.target.value;
                                    setFormData({
                                      ...formData,
                                      incomeSources: newSources,
                                    });
                                  }}
                                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-foreground mb-2">
                                INTERVAL
                              </label>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:bg-muted transition-colors flex items-center justify-between">
                                  <span className="text-sm">
                                    Select Frequency
                                  </span>
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
                                <DropdownMenuContent>
                                  <DropdownMenuItem>Weekly</DropdownMenuItem>
                                  <DropdownMenuItem>Bi-Weekly</DropdownMenuItem>
                                  <DropdownMenuItem>Monthly</DropdownMenuItem>
                                  <DropdownMenuItem>Annually</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="md:col-span-1 flex items-end">
                              <button
                                onClick={() => removeIncomeSource(index)}
                                className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
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
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={addIncomeSource}
                    className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    ADD INCOME SOURCE
                  </button>
                </div>

                {/* Monthly Expenses */}
                <div className="bg-card p-4 rounded-lg md:px-6">
                  <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                    <div className="w-1 h-5 bg-primary rounded" />
                    Monthly Expenses
                  </h3>

                  <button className="flex items-center gap-2 text-primary font-medium text-sm hover:underline">
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    ADD EXPENSE ITEM
                  </button>
                </div>
              </div>
            )}

            {/* DEMOGRAPHICS TAB */}
            {formTab === "demographics" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Participant Demographics
                    </h2>
                    {/* <p className="text-sm text-muted-foreground">
                      Configure and complete demographic details
                    </p> */}
                  </div>
                  <span className="text-sm text-primary font-medium">
                    SECTION 3 OF 4
                  </span>
                </div>

                {/* Gender Identity */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Gender Identity
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Female", "Male", "Non-Binary", "Other"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center bg-card gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={formData.gender === option}
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className="w-4 bg-card h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ethnicity */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Ethnicity (HUD Compliance)
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full px-4 py-3 rounded-xl bg-card  text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Select Ethnicity (HUD Compliance)
                      </span>
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
                    <DropdownMenuContent className="w-full min-w-100">
                      <DropdownMenuItem>Hispanic/Latino</DropdownMenuItem>
                      <DropdownMenuItem>Not Hispanic/Latino</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Highest Education Level */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Highest Education Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      "College",
                      "High school-Incomplete",
                      "High school/GED",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex bg-card items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <input
                          type="radio"
                          name="education"
                          value={option}
                          checked={formData.education === option}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              education: e.target.value,
                            })
                          }
                          className="w-4 bg-card h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Employment Status */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Employment Status
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Full time", "Part time", "Unemployed"].map((option) => (
                      <label
                        key={option}
                        className="flex bg-card items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <input
                          type="radio"
                          name="employment"
                          value={option}
                          checked={formData.employment === option}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employment: e.target.value,
                            })
                          }
                          className="w-4 bg-card h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marital Status */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Marital Status
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Divorced", "Married", "Single"].map((option) => (
                      <label
                        key={option}
                        className="flex bg-card items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <input
                          type="radio"
                          name="marital"
                          value={option}
                          checked={formData.maritalStatus === option}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              maritalStatus: e.target.value,
                            })
                          }
                          className="w-4 bg-card h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Current Government Assistance */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    Current Government Assistance
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    (SELECT ALL THAT APPLY)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      "Receives Food Stamps",
                      "Receives Medicaid",
                      "Receives Medicare",
                      "Receives Social Security",
                      "Receives Veterans Benefits",
                      "Receives WIC",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex bg-card items-center gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.governmentAssistance.includes(
                            option,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                governmentAssistance: [
                                  ...formData.governmentAssistance,
                                  option,
                                ],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                governmentAssistance:
                                  formData.governmentAssistance.filter(
                                    (item) => item !== option,
                                  ),
                              });
                            }
                          }}
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Critical Status Markers */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    Critical Status Markers
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    (SELECT ALL THAT APPLY)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["At Risk of Being Homeless", "Disabled", "Homeless"].map(
                      (option) => (
                        <label
                          key={option}
                          className="flex items-center bg-card gap-2 p-3 rounded-xl border border-border cursor-pointer hover:bg-muted/30 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.criticalStatus.includes(option)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  criticalStatus: [
                                    ...formData.criticalStatus,
                                    option,
                                  ],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  criticalStatus:
                                    formData.criticalStatus.filter(
                                      (item) => item !== option,
                                    ),
                                });
                              }
                            }}
                            className="w-4 h-4 rounded text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-foreground">
                            {option}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ROI TAB */}
            {formTab === "roi" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Release of Information (ROI)
                  </h2>
                  <span className="text-sm text-primary font-medium">
                    SECTION 4 OF 4
                  </span>
                </div>

                <div className="max-w-3xl mx-auto text-center py-12 bg-card p-5 rounded-xl xl:px-8">
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#d1fae5] dark:bg-[#065f46]/20 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-[#10b981]"
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
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Authorize Information Sharing
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    To provide coordinated assistance, we need your permission
                    to share relevant data with participating partner agencies.
                  </p>

                  {/* Info Box */}
                  <div className="bg-[#dbeafe] dark:bg-[#1e3a8a]/20 rounded-xl p-6 border border-[#93c5fd] dark:border-[#1e40af] text-left mb-8">
                    <div className="flex items-start gap-3 mb-3">
                      <svg
                        className="w-5 h-5 text-[#1e40af] dark:text-[#93c5fd] mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1e40af] dark:text-[#93c5fd] mb-3">
                          What this means:
                        </h4>
                        <ul className="space-y-2 text-sm text-[#1e3a8a] dark:text-[#dbeafe]">
                          <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>
                              Your data is protected and only shared with
                              authorized partners.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>
                              You can revoke this consent at any time from your
                              settings.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-1">•</span>
                            <span>
                              This release is valid for 12 months from the date
                              of signing.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity">
                      Open Digital Consent Form
                    </button>
                    <button className="px-6 py-3 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors">
                      Download Paper ROI
                    </button>
                  </div>

                  {/* Footer Note */}
                  <p className="text-xs text-muted-foreground mt-6">
                    * HUD Coordinated Entry System Requirement
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Participants;
