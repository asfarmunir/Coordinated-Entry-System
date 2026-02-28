"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TabType = "received" | "sent";

interface Referral {
  id: string;
  participantName: string;
  agency: string;
  serviceRequested: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "accepted" | "declined" | "completed";
  date: string;
  contactEmail?: string;
  contactPhone?: string;
}

const Referrals = () => {
  const [activeTab, setActiveTab] = useState<TabType>("received");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(
    null,
  );

  const [newReferral, setNewReferral] = useState({
    participantName: "",
    agency: "",
    serviceNeeded: "",
    priority: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Mock data - Received Referrals
  const receivedReferrals: Referral[] = [
    {
      id: "REF-1024",
      participantName: "Jane Smith",
      agency: "Family Support Services",
      serviceRequested: "Housing Assistance",
      description:
        "Single mother with two children seeking emergency housing after eviction.",
      priority: "high",
      status: "pending",
      date: "2025-11-07",
      contactEmail: "intake@familysupport.org",
    },
    {
      id: "REF-1023",
      participantName: "Alex Johnson",
      agency: "Youth Outreach Program",
      serviceRequested: "Mental Health Counseling",
      description:
        "Teen experiencing anxiety and depression, needs ongoing counseling support.",
      priority: "medium",
      status: "accepted",
      date: "2025-11-08",
      contactEmail: "referrals@youthoutreach.org",
    },
    {
      id: "REF-1020",
      participantName: "Robert Davis",
      agency: "Medical Care Alliance",
      serviceRequested: "Food Assistance",
      description:
        "Senior citizen with limited mobility needs food delivery services.",
      priority: "high",
      status: "pending",
      date: "2025-11-04",
      contactEmail: "intake@medicalcare.org",
    },
  ];

  // Mock data - Sent Referrals
  const sentReferrals: Referral[] = [
    {
      id: "REF-1025",
      participantName: "Maria Garcia",
      agency: "Education First",
      serviceRequested: "Tutoring Services",
      description: "Elementary student needs math and reading support.",
      priority: "medium",
      status: "pending",
      date: "2025-11-07",
    },
    {
      id: "REF-1022",
      participantName: "William Brown",
      agency: "Senior Care Network",
      serviceRequested: "Medical Transportation",
      description:
        "Elderly client needs regular transport to dialysis appointments.",
      priority: "high",
      status: "accepted",
      date: "2025-11-05",
    },
    {
      id: "REF-1019",
      participantName: "Sarah Wilson",
      agency: "Job Training Center",
      serviceRequested: "Career Counseling",
      description: "Recent graduate seeking career guidance and job placement.",
      priority: "low",
      status: "completed",
      date: "2025-11-03",
    },
  ];

  const currentReferrals =
    activeTab === "received" ? receivedReferrals : sentReferrals;

  const filteredReferrals = currentReferrals.filter(
    (ref) =>
      ref.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.serviceRequested.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateReferral = () => {
    // Handle create referral logic
    console.log("Creating referral:", newReferral);
    setShowCreateModal(false);
    setNewReferral({
      participantName: "",
      agency: "",
      serviceNeeded: "",
      priority: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    });
  };

  const handleAcceptReferral = () => {
    console.log("Accepting referral:", selectedReferral?.id);
    setShowResponseModal(false);
  };

  const handleDeclineReferral = () => {
    console.log("Declining referral:", selectedReferral?.id);
    setShowResponseModal(false);
  };

  const openResponseModal = (referral: Referral) => {
    setSelectedReferral(referral);
    setShowResponseModal(true);
  };

  const openDetailsModal = (referral: Referral) => {
    setSelectedReferral(referral);
    setShowDetailsModal(true);
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      medium:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      low: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    };
    return badges[priority as keyof typeof badges] || badges.low;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      accepted:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      declined: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      completed:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Referral Management"
        description="Send and receive client referrals with partner agencies"
      />

      {/* Create Referral Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm md:text-base"
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
          Create Referral
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
            placeholder="Search referrals by ID, participant name, or service..."
            className="flex-1 bg-transparent border-none outline-none text-sm 2xl:text-base text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base ${
            activeTab === "received"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-card/80 border border-border"
          }`}
        >
          Received Referrals
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-background/20">
            {receivedReferrals.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all text-sm md:text-base ${
            activeTab === "sent"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-card/80 border border-border"
          }`}
        >
          Sent Referrals
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-background/20">
            {sentReferrals.length}
          </span>
        </button>
      </div>

      {/* Referrals List */}
      <div className="space-y-4 pb-4">
        {filteredReferrals.map((referral) => (
          <div
            key={referral.id}
            className="bg-card rounded-2xl border border-border p-4 md:p-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base md:text-lg font-semibold text-foreground">
                  {referral.id}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium uppercase ${getPriorityBadge(
                    referral.priority,
                  )}`}
                >
                  {referral.priority}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getStatusBadge(
                    referral.status,
                  )}`}
                >
                  {referral.status}
                </span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                {referral.date}
              </span>
            </div>

            {/* Agency Info */}
            <p className="text-sm text-muted-foreground mb-3">
              {activeTab === "received" ? "From: " : "To: "}
              <span className="font-medium text-foreground">
                {referral.agency}
              </span>
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Participant Name
                </p>
                <p className="text-sm md:text-base font-medium text-foreground">
                  {referral.participantName}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Service Requested
                </p>
                <p className="text-sm md:text-base font-medium text-foreground">
                  {referral.serviceRequested}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">Description</p>
              <p className="text-sm md:text-base text-foreground">
                {referral.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              {activeTab === "received" ? (
                <button
                  onClick={() => openResponseModal(referral)}
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
                >
                  Respond
                </button>
              ) : (
                <button
                  onClick={() => openDetailsModal(referral)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-background transition-colors text-sm"
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
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredReferrals.length === 0 && (
          <div className="text-center py-12">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-foreground font-medium mb-1">
              No referrals found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>

      {/* Create Referral Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Referral</DialogTitle>
            <DialogDescription>
              Send a client referral to a partner agency
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Participant Name
                </label>
                <input
                  type="text"
                  placeholder="Enter participant name"
                  value={newReferral.participantName}
                  onChange={(e) =>
                    setNewReferral({
                      ...newReferral,
                      participantName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Referring To
                </label>
                <select
                  value={newReferral.agency}
                  onChange={(e) =>
                    setNewReferral({ ...newReferral, agency: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select agency...</option>
                  <option value="Family Support Services">
                    Family Support Services
                  </option>
                  <option value="Youth Outreach Program">
                    Youth Outreach Program
                  </option>
                  <option value="Medical Care Alliance">
                    Medical Care Alliance
                  </option>
                  <option value="Education First">Education First</option>
                  <option value="Senior Care Network">
                    Senior Care Network
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Needed
                </label>
                <input
                  type="text"
                  placeholder="e.g., Housing Assistance"
                  value={newReferral.serviceNeeded}
                  onChange={(e) =>
                    setNewReferral({
                      ...newReferral,
                      serviceNeeded: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Priority Level
                </label>
                <select
                  value={newReferral.priority}
                  onChange={(e) =>
                    setNewReferral({
                      ...newReferral,
                      priority: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Client Situation & Needs
              </label>
              <textarea
                rows={4}
                placeholder="Describe the client's situation and specific needs..."
                value={newReferral.description}
                onChange={(e) =>
                  setNewReferral({
                    ...newReferral,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  placeholder="client@email.com"
                  value={newReferral.contactEmail}
                  onChange={(e) =>
                    setNewReferral({
                      ...newReferral,
                      contactEmail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={newReferral.contactPhone}
                  onChange={(e) =>
                    setNewReferral({
                      ...newReferral,
                      contactPhone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateReferral}
              className="rounded-xl bg-primary text-primary-foreground hover:opacity-90"
            >
              Send Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Response Modal */}
      <Dialog open={showResponseModal} onOpenChange={setShowResponseModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Referral Response - {selectedReferral?.id}
            </DialogTitle>
            <DialogDescription>
              Respond to this incoming referral
            </DialogDescription>
          </DialogHeader>

          {selectedReferral && (
            <div className="space-y-6 mt-4">
              {/* Priority and Status */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium uppercase ${getPriorityBadge(
                    selectedReferral.priority,
                  )}`}
                >
                  {selectedReferral.priority} PRIORITY
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${getStatusBadge(
                    selectedReferral.status,
                  )}`}
                >
                  {selectedReferral.status}
                </span>
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Client Information */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Client Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Participant Name
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.participantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Contact Email
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.contactEmail || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Referral Details */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Referral Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Service Requested
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.serviceRequested}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Referring Agency
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.agency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Referral Date
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Priority Level
                    </p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {selectedReferral.priority}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Situation & Needs */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Client Situation & Needs
                </h3>
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-foreground">
                    {selectedReferral.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowResponseModal(false)}
              className="rounded-xl"
            >
              Close
            </Button>
            <Button
              variant="outline"
              onClick={handleDeclineReferral}
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Decline
            </Button>
            <Button
              onClick={handleAcceptReferral}
              className="rounded-xl bg-green-600 text-white hover:bg-green-700"
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Accept Referral
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Modal (for Sent Referrals) */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Referral Details - {selectedReferral?.id}
            </DialogTitle>
            <DialogDescription>
              Complete information about this referral
            </DialogDescription>
          </DialogHeader>

          {selectedReferral && (
            <div className="space-y-6 mt-4">
              {/* Priority and Status */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium uppercase ${getPriorityBadge(
                    selectedReferral.priority,
                  )}`}
                >
                  {selectedReferral.priority} PRIORITY
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium ${getStatusBadge(
                    selectedReferral.status,
                  )}`}
                >
                  {selectedReferral.status}
                </span>
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Client Information */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Client Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Participant Name
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.participantName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Contact Email
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.contactEmail || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Referral Details */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Referral Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Service Requested
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.serviceRequested}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Referring Agency
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.agency}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Referral Date
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedReferral.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Priority Level
                    </p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {selectedReferral.priority}
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Situation & Needs */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Client Situation & Needs
                </h3>
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-foreground">
                    {selectedReferral.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowDetailsModal(false)}
              className="rounded-xl"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Referrals;
