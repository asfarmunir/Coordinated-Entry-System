"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import { Button } from "../ui/button";

type TabType =
  | "reports"
  | "overview"
  | "referrals"
  | "housing"
  | "services"
  | "partners";

interface Report {
  title: string;
  description: string;
  lastGenerated: string;
}

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<TabType>("reports");
  const [dateRange, setDateRange] = useState("Last 30 Day");

  const stats = [
    {
      icon: (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      value: "1,847",
      label: "Total Individuals Served",
      change: "+24%",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
    {
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      value: "342",
      label: "Housing Placements",
      change: "+18%",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      value: "2,456",
      label: "Total Services Delivered",
      change: "+12%",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      icon: (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      value: "48",
      label: "Network Agencies",
      change: "+5%",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  const serviceActivityReports: Report[] = [
    {
      title: "Daily Service Log",
      description: "Track all services provided daily",
      lastGenerated: "2025-11-16",
    },
    {
      title: "Weekly Service Summary",
      description: "Aggregate service data by week",
      lastGenerated: "2025-11-10",
    },
    {
      title: "Monthly Service Report",
      description: "Comprehensive monthly service breakdown",
      lastGenerated: "2025-11-01",
    },
    {
      title: "Service by Category",
      description: "Services organized by type",
      lastGenerated: "2025-11-15",
    },
  ];

  const participantDemographics: Report[] = [
    {
      title: "Age Distribution Report",
      description: "Participant demographics by age group",
      lastGenerated: "2025-11-14",
    },
    {
      title: "Gender & Identity Report",
      description: "Demographics by gender identity",
      lastGenerated: "2025-11-14",
    },
    {
      title: "Race & Ethnicity Report",
      description: "Participant race/ethnic breakdown",
      lastGenerated: "2025-11-14",
    },
    {
      title: "Household Composition",
      description: "Family structure and household size",
      lastGenerated: "2025-11-12",
    },
  ];

  const outcomeTracking: Report[] = [
    {
      title: "Housing Outcomes Report",
      description: "Track housing placement success rates",
      lastGenerated: "2025-11-16",
    },
    {
      title: "Employment Outcomes",
      description: "Employment status and job placement tracking",
      lastGenerated: "2025-11-15",
    },
  ];

  const resourceUtilization: Report[] = [
    {
      title: "Bed Utilization Report",
      description: "Shelter bed capacity and usage",
      lastGenerated: "2025-11-18",
    },
    {
      title: "Resource Availability",
      description: "Current availability of all resources",
      lastGenerated: "2025-11-17",
    },
  ];

  const handleGenerate = (reportTitle: string) => {
    console.log("Generating report:", reportTitle);
  };

  const handleExportPDF = () => {
    console.log("Exporting PDF");
  };

  const handleExportCSV = () => {
    console.log("Exporting CSV");
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Reports & Analytics"
        description="HMIS-compliant reporting and data visualization"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} flex-shrink-0`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    className="w-4 h-4 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto flex-col md:flex-row items-start justify-between md:items-center gap-4 mb-6">
        <div className="flex  items-center gap-3 bg-card overflow-x-auto rounded-xl p-0.5 text-foreground hover:bg-card/80 border border-border">
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base whitespace-nowrap ${
              activeTab === "reports"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("referrals")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base whitespace-nowrap ${
              activeTab === "referrals"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            Referrals
          </button>
          <button
            onClick={() => setActiveTab("housing")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base whitespace-nowrap ${
              activeTab === "housing"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            Housing
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base whitespace-nowrap ${
              activeTab === "services"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base whitespace-nowrap ${
              activeTab === "partners"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            Partners
          </button>
        </div>
        <div className="hidden lg:flex items-center gap-3 flex-wrap">
          <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
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
            {dateRange}
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

          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export PDF
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Reports Content */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          {/* Service Activity Reports */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Service Activity Reports
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {serviceActivityReports.map((report, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {report.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleGenerate(report.title)}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Participant Demographics */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Participant Demographics
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {participantDemographics.map((report, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {report.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleGenerate(report.title)}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome Tracking */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400"
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
              <h3 className="text-lg font-semibold text-foreground">
                Outcome Tracking
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {outcomeTracking.map((report, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {report.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleGenerate(report.title)}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Utilization */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-orange-600 dark:text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Resource Utilization
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {resourceUtilization.map((report, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {report.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleGenerate(report.title)}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Generate
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Tabs Content */}
      {activeTab !== "reports" && (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <p className="text-foreground font-medium mb-1 capitalize">
            {activeTab} View
          </p>
          <p className="text-sm text-muted-foreground">
            Content for {activeTab} tab will be displayed here
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
