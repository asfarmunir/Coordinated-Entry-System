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

interface ServiceRequest {
  id: string;
  participant: {
    name: string;
    id: string;
    phone: string;
    email: string;
  };
  date: string;
  category: string;
  subcategory: string;
  message: string;
  status: "pending" | "urgent" | "completed";
  missingInfo: string[];
  preferredDate?: string;
}

const AssistanceRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null,
  );
  const [isRespondDialogOpen, setIsRespondDialogOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [responseAction, setResponseAction] = useState("Select action");
  const [responseNotes, setResponseNotes] = useState("");

  const [requests] = useState<ServiceRequest[]>([
    {
      id: "1",
      participant: {
        name: "Sarah Johnson",
        id: "PT-2001",
        phone: "(555) 111-2222",
        email: "s.johnson@email.com",
      },
      date: "02/02/2026",
      category: "Housing",
      subcategory: "Rental Assistance",
      message:
        "I need help with this month's rent. I lost my job last week and won't be able to pay rent on the 1st. Can you help?",
      status: "pending",
      missingInfo: ["Monthly Income", "Employment Status"],
      preferredDate: "05/02/2026",
    },
  ]);

  const stats = {
    pending: requests.filter((r) => r.status === "pending").length,
    urgent: requests.filter((r) => r.status === "urgent").length,
    completed: requests.filter((r) => r.status === "completed").length,
    total: requests.length,
  };

  const handleRespond = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsRespondDialogOpen(true);
  };

  const handleSubmitResponse = () => {
    // Handle response submission
    console.log("Response submitted:", { responseAction, responseNotes });
    setIsRespondDialogOpen(false);
    setResponseAction("Select action");
    setResponseNotes("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#fef3c7] text-[#92400e] dark:bg-[#854d0e]/20 dark:text-[#fbbf24]";
      case "urgent":
        return "bg-[#fee2e2] te dark:text-[#fca5a5]";
      case "completed":
        return "bg-[#d1fae5] text-[#065f46] dark:bg-[#065f46]/20 dark:text-[#6ee7b7]";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Service Requests"
        description="Manage incoming service requests from participants"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fef3c7] dark:bg-[#854d0e]/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#f59e0b]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.pending}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fca5a5]/30 dark:bg-[#991b1b]/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#dc2626]"
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
            </div>
            <div>
              <p className="text-sm text-[#991b1b] dark:text-[#fca5a5] mb-1">
                Urgent
              </p>
              <p className="text-2xl font-bold text-[#7f1d1d] dark:text-[#fca5a5]">
                {stats.urgent}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#d1fae5] dark:bg-[#065f46]/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#10b981]"
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
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.completed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 flex items-center justify-center">
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row w-full md:w-fit items-start sm:items-center gap-3 flex-1">
          {/* Filters Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-fit ">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm font-medium text-foreground">
              Filters:
            </span>
            <input
              type="text"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="px-3 py-2 w-full rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-w-[200px]"
            />
          </div>

          {/* Date Filter */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Date:</span>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border text-sm text-muted-foreground hover:bg-muted transition-colors">
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
              Pick a date
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {requests.length} of {stats.total} requests
        </p>
      </div>

      {/* Service Requests List */}
      <div className="space-y-4 pb-12 md:pb-0">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-card rounded-2xl p-4 md:p-6 border border-border"
          >
            {/* Request Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-semibold text-foreground">
                  Service Request
                </h3>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    request.status,
                  )}`}
                >
                  {request.status}
                </span>
                {request.missingInfo.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#fef3c7] text-[#92400e] dark:bg-[#854d0e]/20 dark:text-[#fbbf24] border border-[#fbbf24]/30">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {request.missingInfo.length} Info Missing
                  </span>
                )}
              </div>
              <button
                onClick={() => handleRespond(request)}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Respond
              </button>
            </div>

            {/* Participant Info */}
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
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
              <span className="font-medium text-foreground">
                {request.participant.name}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{request.date}</span>
            </div>

            {/* Category */}
            <div className="mb-3">
              <p className="text-sm">
                <span className="font-semibold text-foreground">
                  {request.category}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  - {request.subcategory}
                </span>
              </p>
            </div>

            {/* Message */}
            <p className="text-foreground mb-4">{request.message}</p>

            {/* Missing Info Warning */}
            {request.missingInfo.length > 0 && (
              <div className="bg-[#fef3c7] dark:bg-[#854d0e]/20 rounded-xl p-4 border border-[#fbbf24]/30 mb-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#92400e] dark:text-[#fbbf24] mt-0.5 flex-shrink-0"
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
                  <div className="flex-1">
                    <p className="font-semibold text-[#92400e] dark:text-[#fbbf24] mb-1">
                      Missing participant information (
                      {request.missingInfo.length}):
                    </p>
                    <p className="text-sm text-[#92400e] dark:text-[#fbbf24] mb-2">
                      {request.missingInfo.join(", ")}
                    </p>
                    <p className="text-sm text-[#92400e] dark:text-[#fbbf24] italic">
                      Click Respond to request this information from the
                      participant
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {request.preferredDate && (
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
                  <span>Preferred: {request.preferredDate}</span>
                </div>
              )}
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{request.participant.phone}</span>
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{request.participant.email}</span>
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No service requests
            </h3>
            <p className="text-muted-foreground">
              All requests have been processed
            </p>
          </div>
        )}
      </div>

      {/* Respond to Request Dialog */}
      <Dialog open={isRespondDialogOpen} onOpenChange={setIsRespondDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Respond to Request
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedRequest?.participant.name} - Service Request
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Participant Contact Information */}
            <div className="bg-[#dbeafe] dark:bg-[#1e3a8a]/20 rounded-xl p-4 border border-[#93c5fd] dark:border-[#1e40af]">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-[#1e40af] dark:text-[#93c5fd]"
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
                <h3 className="font-semibold text-[#1e40af] dark:text-[#93c5fd]">
                  Participant Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#1e40af] dark:text-[#93c5fd] mb-1">
                    Name
                  </p>
                  <p className="font-medium text-[#1e3a8a] dark:text-[#dbeafe]">
                    {selectedRequest?.participant.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#1e40af] dark:text-[#93c5fd] mb-1">
                    Participant ID
                  </p>
                  <p className="font-medium text-[#1e3a8a] dark:text-[#dbeafe]">
                    {selectedRequest?.participant.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#1e40af] dark:text-[#93c5fd] mb-1">
                    Phone
                  </p>
                  <p className="font-medium text-[#1e3a8a] dark:text-[#dbeafe]">
                    {selectedRequest?.participant.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#1e40af] dark:text-[#93c5fd] mb-1">
                    Email
                  </p>
                  <p className="font-medium text-[#1e3a8a] dark:text-[#dbeafe]">
                    {selectedRequest?.participant.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-foreground mb-2">
                {selectedRequest?.category} - {selectedRequest?.subcategory}
              </h4>
              <p className="text-foreground">{selectedRequest?.message}</p>
            </div>

            {/* Missing Information */}
            {selectedRequest && selectedRequest.missingInfo.length > 0 && (
              <div className="bg-[#fef3c7] dark:bg-[#854d0e]/20 rounded-xl p-4 border border-[#fbbf24]/30">
                <div className="flex items-start gap-3 mb-3">
                  <svg
                    className="w-5 h-5 text-[#92400e] dark:text-[#fbbf24] mt-0.5 flex-shrink-0"
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
                  <div className="flex-1">
                    <p className="font-semibold text-[#92400e] dark:text-[#fbbf24]">
                      Missing participant information (
                      {selectedRequest.missingInfo.length}):
                    </p>
                    <p className="text-sm text-[#92400e] dark:text-[#fbbf24]">
                      {selectedRequest.missingInfo.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center text-xs md:text-sm gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                    <svg
                      className="w-4 h-4 hidden md:block"
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
                    Request from Participant
                  </button>
                  <button className="flex items-center text-xs md:text-sm gap-2 px-4 py-2 bg-card border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                    <svg
                      className="w-4 h-4 hidden md:block"
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
                    Enter Manually
                  </button>
                </div>
              </div>
            )}

            {/* Action */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Action
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                  {responseAction}
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
                <DropdownMenuContent className="w-full min-w-[400px]">
                  <DropdownMenuItem
                    onClick={() => setResponseAction("Approve Request")}
                  >
                    Approve Request
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setResponseAction("Deny Request")}
                  >
                    Deny Request
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setResponseAction("Request More Information")
                    }
                  >
                    Request More Information
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setResponseAction("Schedule Follow-up")}
                  >
                    Schedule Follow-up
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Response Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Response Notes
              </label>
              <textarea
                placeholder="Add notes about your response or decision..."
                value={responseNotes}
                onChange={(e) => setResponseNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <button
              onClick={() => setIsRespondDialogOpen(false)}
              className="px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitResponse}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Submit Response
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssistanceRequests;
