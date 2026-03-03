"use client";

import React, { useState } from "react";
import OverviewTab from "./participant-tabs/OverviewTab";
import RelationshipsTab from "./participant-tabs/RelationshipsTab";
import AssistanceTab from "./participant-tabs/AssistanceTab";
import ReferralsTab from "./participant-tabs/ReferralsTab";
import AppointmentsTab from "./participant-tabs/AppointmentsTab";
import DocumentsTab from "./participant-tabs/DocumentsTab";
import NotesTab from "./participant-tabs/NotesTab";
import Link from "next/link";

const ParticipantsDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full h-full bg-background p-3 sm:p-4 md:p-6 overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </Link>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                Michael Roberts
              </h1>
              <span className="px-2 sm:px-3 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-semibold rounded-full w-fit">
                Full Sharing
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Participant ID: PT-0003 • Registered: 2026-01-05
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-card border border-border rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2">
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
                d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01"
              />
            </svg>
            Create Referral
          </button>
          <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center gap-2">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0 pb-12 md:pb-0">
          {activeTab === "overview" && (
            <OverviewTab>
              {/* Personal Information */}
              <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold text-foreground">
                    Personal Information
                  </h2>
                </div>

                {/* Name & Identification */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">
                    Name & Identification
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        First Name
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        Michael
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Middle Name
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        -
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Last Name
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        Roberts
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Suffix
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        -
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Maiden Name
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        -
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Nickname/Alias
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        -
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Date of Birth
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        1978-11-30
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        SSN
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        ***-**-9012
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-4 h-4 text-primary"
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
                    <h3 className="text-sm font-medium text-foreground">
                      Contact Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Phone
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        (555) 333-4444
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">
                        Email
                      </label>
                      <p className="text-sm font-medium text-foreground mt-1">
                        m.roberts@email.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3 className="text-sm font-medium text-foreground">
                      Address Information
                    </h3>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs text-muted-foreground">
                      Street Address
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="text-xs text-muted-foreground">
                          Address
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          Emergency Shelter
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Apt #
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                      <div>
                        <label className="text-xs text-muted-foreground">
                          City
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          State
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Zip Code
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          County
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Mailing Address
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                      <div className="sm:col-span-2 lg:col-span-3">
                        <label className="text-xs text-muted-foreground">
                          Address
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Apt #
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                      <div>
                        <label className="text-xs text-muted-foreground">
                          City
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          State
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          Zip Code
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          County
                        </label>
                        <p className="text-sm font-medium text-foreground mt-1">
                          -
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold text-foreground">
                    Demographics
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Gender
                    </label>
                    <p className="text-sm font-medium text-foreground mt-1">
                      -
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Ethnicity
                    </label>
                    <p className="text-sm font-medium text-foreground mt-1">
                      -
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Education Level
                    </label>
                    <p className="text-sm font-medium text-foreground mt-1">
                      -
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Employment Status
                    </label>
                    <p className="text-sm font-medium text-foreground mt-1">
                      -
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Marital Status
                    </label>
                    <p className="text-sm font-medium text-foreground mt-1">
                      -
                    </p>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-xs text-muted-foreground">
                    Government Benefits
                  </label>
                  <p className="text-sm font-medium text-foreground mt-1">
                    Not recorded
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Housing & Additional Information
                  </h3>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Housing Status
                    </label>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-[#fef3c7] text-[#92400e] text-xs font-semibold rounded-full">
                        In Shelter
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Management & Utilization Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Case Management */}
                <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-foreground">
                      Case Management
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    No assigned case managers
                  </p>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide">
                      Registration Date
                    </label>
                    <p className="text-sm font-medium text-foreground mt-1">
                      2026-01-05
                    </p>
                  </div>
                </div>

                {/* Utilization Snapshot */}
                <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-foreground">
                      Utilization Snapshot
                    </h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                        <span className="text-sm text-foreground">
                          Active Assistance
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-semibold rounded-full">
                        4
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                        <span className="text-sm text-foreground">
                          Total Service Records
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#dbeafe] text-[#1e40af] text-xs font-semibold rounded-full">
                        10
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                        <span className="text-sm text-foreground">
                          Pending Appointments
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#fef3c7] text-[#92400e] text-xs font-semibold rounded-full">
                        2
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sharing & Privacy */}
              <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold text-foreground">
                    Data Sharing & Privacy
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Data Sharing Consent
                    </label>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-[#d1fae5] text-[#065f46] text-xs font-semibold rounded-full">
                        Given
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Privacy Level
                    </label>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-[#dbeafe] text-[#1e40af] text-xs font-semibold rounded-full">
                        Full Sharing
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Agencies with Access
                    </label>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full">
                        12
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* History of Modifications */}
              <div className="bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-2 px-6 py-4 bg-[#1e293b] text-white rounded-t-2xl">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h2 className="text-sm font-semibold">
                    History of Modifications
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {/* Modification Entry 1 */}
                  <div className="pb-4 border-b border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Modified by{" "}
                          <span className="text-primary">Jason Scott</span> from{" "}
                          <span className="text-primary">
                            Nonprofit Resource Group
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Housing Status added: Emergency Shelter
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Tue, Dec 10, 2025 at 11:43 a.m.
                      </span>
                    </div>
                  </div>

                  {/* Modification Entry 2 */}
                  <div className="pb-4 border-b border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Modified by{" "}
                          <span className="text-primary">Jason Scott</span> from{" "}
                          <span className="text-primary">
                            Nonprofit Resource Group
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span className="text-[#10b981]">
                            Demographic added:
                          </span>{" "}
                          Government Benefits: Receives Social Security
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-[#10b981]">
                            Demographic added:
                          </span>{" "}
                          Government Benefits: Receives Veterans Benefits
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Tue, Dec 16, 2025 at 11:30 a.m.
                      </span>
                    </div>
                  </div>

                  {/* Modification Entry 3 */}
                  <div className="pb-4 border-b border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Modified by{" "}
                          <span className="text-primary">Jason Scott</span> from{" "}
                          <span className="text-primary">
                            Nonprofit Resource Group
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Location changed: Other: Homeless
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Tue, Dec 16, 2025 at 11:30 a.m.
                      </span>
                    </div>
                  </div>

                  {/* Modification Entry 4 */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Modified by{" "}
                          <span className="text-primary">Jason Scott</span> from{" "}
                          <span className="text-primary">
                            Nonprofit Resource Group
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          First Name changed:{" "}
                          <span className="text-red-500 line-through">
                            Johnto
                          </span>{" "}
                          <span className="text-[#10b981]">John</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last Name changed:{" "}
                          <span className="text-red-500 line-through">
                            Novato
                          </span>{" "}
                          <span className="text-[#10b981]">Doe</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Case Number changed:{" "}
                          <span className="text-red-500 line-through">
                            False10
                          </span>{" "}
                          <span className="text-[#10b981]">True</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Street State changed:{" "}
                          <span className="text-red-500 line-through">
                            Nevada
                          </span>{" "}
                          <span className="text-[#10b981]">CA</span>
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Mon, Dec 15, 2025 at 10:49 a.m.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Opened Footer */}
              <div className="bg-[#fef3c7] border border-[#fbbf24] rounded-xl p-4">
                <p className="text-sm text-[#92400e]">
                  Case opened by Case Manager{" "}
                  <span className="font-semibold">Jason Scott</span> from{" "}
                  <span className="font-semibold text-primary">
                    Nonprofit Team Abby Shaw
                  </span>{" "}
                  on <span className="font-semibold">2025 at 10:49 a.m.</span>
                </p>
              </div>
            </OverviewTab>
          )}

          {activeTab === "relationships" && <RelationshipsTab />}
          {activeTab === "assistance" && <AssistanceTab />}
          {activeTab === "referrals" && <ReferralsTab />}
          {activeTab === "appointments" && <AppointmentsTab />}
          {activeTab === "documents" && <DocumentsTab />}
          {activeTab === "notes" && <NotesTab />}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-4 order-first lg:order-last">
          {/* Quick Navigation */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Navigation
              </h3>
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
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </div>

            <button className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Participant
            </button>

            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeTab === "overview"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Overview
              </button>
              <button
                onClick={() => setActiveTab("relationships")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeTab === "relationships"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    activeTab === "relationships" ? "" : "text-muted-foreground"
                  }`}
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
                Relationships
              </button>

              <button
                onClick={() => setActiveTab("assistance")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 justify-between ${
                  activeTab === "assistance"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 ${
                      activeTab === "assistance" ? "" : "text-muted-foreground"
                    }`}
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
                  Assistance
                </div>
                {activeTab === "assistance" && (
                  <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                    1
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("referrals")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 justify-between ${
                  activeTab === "referrals"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 ${
                      activeTab === "referrals" ? "" : "text-muted-foreground"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01"
                    />
                  </svg>
                  Referrals
                </div>
                {activeTab === "referrals" && (
                  <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                    2
                  </span>
                )}
              </button>
              {/* <button className="w-full px-4 py-2.5 text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-3">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Outcomes
              </button> */}
              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 justify-between ${
                  activeTab === "appointments"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 ${
                      activeTab === "appointments"
                        ? ""
                        : "text-muted-foreground"
                    }`}
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
                  Appointments
                </div>
                {activeTab === "appointments" && (
                  <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                    2
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeTab === "documents"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    activeTab === "documents" ? "" : "text-muted-foreground"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Documents
                {activeTab === "documents" && (
                  <span className="ml-auto px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs font-semibold">
                    2
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                  activeTab === "notes"
                    ? "bg-muted/50 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    activeTab === "notes" ? "" : "text-muted-foreground"
                  }`}
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
                Notes
              </button>
              <button className="w-full px-4 py-2.5 text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-3">
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Merge Record
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Links
              </h3>
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
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-primary"
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
                New Assistance
              </button>
              <button className="w-full px-4 py-2.5 text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-primary"
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
                Process Referral
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsDetails;
