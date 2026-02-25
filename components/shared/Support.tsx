"use client";

import { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface SupportTicket {
  id: string;
  number: string;
  title: string;
  description: string;
  status: "In Progress" | "Resolved" | "Open" | "Closed";
  priority: "High" | "Medium" | "Low";
  createdDate: string;
}

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    priority: "Medium",
    category: "",
    description: "",
  });

  const popularSearches = [
    "Add participant",
    "Referrals",
    "Consent management",
    "Reports",
    "HMIS compliance",
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: "1",
      number: "TKT-7842",
      title: "Issue with referral status not updating",
      description:
        'The referral I sent to Family Support Services still shows as "Pending" even though they confirmed receipt.',
      status: "In Progress",
      priority: "High",
      createdDate: "Feb 2, 2026",
    },
    {
      id: "2",
      number: "TKT-7839",
      title: "How to export HMIS compliance report?",
      description:
        "I need to know the specific steps to generate the monthly HUD report.",
      status: "Resolved",
      priority: "Medium",
      createdDate: "Jan 28, 2026",
    },
  ];

  const popularArticles = [
    {
      id: "1",
      title: "How to register a new participant",
      category: "Participants",
      views: "1.2k",
      updated: "2 days ago",
    },
    {
      id: "2",
      title: "Managing data sharing consents",
      category: "Compliance",
      views: "987",
      updated: "1 week ago",
    },
    {
      id: "3",
      title: "Creating and tracking referrals",
      category: "Referrals",
      views: "856",
      updated: "3 days ago",
    },
    {
      id: "4",
      title: "Understanding HUD HMIS requirements",
      category: "Compliance",
      views: "743",
      updated: "1 week ago",
    },
    {
      id: "5",
      title: "How to generate reports and analytics",
      category: "Reporting",
      views: "612",
      updated: "5 days ago",
    },
    {
      id: "6",
      title: "Setting up your agency profile",
      category: "Getting Started",
      views: "534",
      updated: "2 weeks ago",
    },
  ];

  const faqs = [
    "How do I add a new staff member to my agency?",
    "What data privacy regulations does the system comply with?",
    "How can participants control what data is shared?",
    "Can participants remain anonymous?",
    "How do I track service outcomes for reporting?",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log("Searching for:", searchQuery);
  };

  const handlePopularSearchClick = (search: string) => {
    setSearchQuery(search);
    // Handle search logic
    console.log("Searching for:", search);
  };

  const handleCreateTicket = () => {
    // Handle ticket creation logic
    console.log("Creating ticket:", ticketForm);
    setShowCreateTicketModal(false);
    // Reset form
    setTicketForm({
      subject: "",
      priority: "Medium",
      category: "",
      description: "",
    });
  };

  const handleTicketFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50";
      case "Resolved":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50";
      case "Open":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50";
      case "Closed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800/50";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800/50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50";
      case "Medium":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800/50";
      case "Low":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800/50";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800/50";
    }
  };

  return (
    <div className="h-full bg-card-foreground rounded-2xl p-3 md:p-6">
      <ScreenHeader
        title="Help Center"
        description="Find answers, browse documentation, and get support"
      />

      {/* Search Section */}
      <div className="bg-muted/30 rounded-2xl p-4 md:p-8 mb-6 border border-border/50">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, guides, and FAQs..."
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </form>

        {/* Popular Searches */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Popular searches:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {popularSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handlePopularSearchClick(search)}
                className="px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-background hover:border-primary transition-all"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* My Support Tickets */}
      <div>
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground ">
            My Support Tickets
          </h2>
          <Button
            onClick={() => setShowCreateTicketModal(true)}
            className="px-5 py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity text-sm whitespace-nowrap flex items-center gap-2"
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
            Create Support Ticket
          </Button>
        </div>
        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-card rounded-2xl border border-border p-4 md:p-6  transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-primary">
                      {ticket.number}
                    </span>
                    <span className="text-xl font-semibold text-foreground">
                      {ticket.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {ticket.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
                      <span>Created {ticket.createdDate}</span>
                    </div>
                    <span>•</span>
                    <button className="text-primary hover:underline font-medium">
                      View Conversation
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusColor(
                      ticket.status,
                    )}`}
                  >
                    {ticket.status}
                  </span>
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getPriorityColor(
                      ticket.priority,
                    )}`}
                  >
                    {ticket.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Popular Articles
        </h2>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          {popularArticles.map((article, index) => (
            <button
              key={article.id}
              className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-muted/30 transition-colors text-left group"
            >
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-sm md:text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                    {article.category}
                  </span>
                  <span>{article.views} views</span>
                  <span>•</span>
                  <span>Updated {article.updated}</span>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Contact Support & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Contact Support Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            Contact Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email Support */}
            <div className="bg-card rounded-2xl border border-border p-5 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
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
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Email Support
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get help via email within 24 hours
              </p>
              <p className="text-sm font-medium text-foreground mb-1">
                support@ces-portal.org
              </p>
              <p className="text-xs text-muted-foreground mb-4">24/7</p>
              <Button className="mt-auto w-full bg-primary text-primary-foreground hover:opacity-90 rounded-xl">
                Send Email
              </Button>
            </div>

            {/* Phone Support */}
            <div className="bg-card rounded-2xl border border-border p-5 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-500"
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
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Phone Support
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Speak with our support team
              </p>
              <p className="text-sm font-medium text-foreground mb-1">
                1-800-CES-HELP
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Mon-Fri 8AM-6PM PST
              </p>
              <Button className="mt-auto w-full bg-primary text-primary-foreground hover:opacity-90 rounded-xl">
                Call Now
              </Button>
            </div>

            {/* Live Chat */}
            <div className="bg-card rounded-2xl border border-border p-5 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                Live Chat
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Chat with a support representative
              </p>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                Available now
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Mon-Fri 8AM-5PM PST
              </p>
              <Button className="mt-auto w-full bg-primary text-primary-foreground hover:opacity-90 rounded-xl">
                Start Chat
              </Button>
            </div>
          </div>
        </div>

        {/* System Status Section */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            System Status
          </h2>
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-foreground">
                All Systems Operational
              </span>
            </div>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-semibold text-foreground">
                  99.9%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Response Time
                </span>
                <span className="text-sm font-semibold text-foreground">
                  &lt;200ms
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full rounded-xl border-border hover:bg-muted/50 text-sm flex items-center justify-center gap-2"
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View Status Page
            </Button>
          </div>

          {/* Need More Help */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-base font-semibold text-foreground mb-2">
              Need More Help?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule a one-on-one training session with our team.
            </p>
            <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-xl">
              Book Training Session
            </Button>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mt-8 pb-9">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          {faqs.map((faq, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 md:p-5 hover:bg-muted/30 transition-colors text-left group"
            >
              <span className="text-sm md:text-base text-foreground group-hover:text-primary transition-colors pr-4">
                {faq}
              </span>
              <svg
                className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Create Ticket Modal */}
      <Dialog
        open={showCreateTicketModal}
        onOpenChange={setShowCreateTicketModal}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Create Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and we will get back to you as soon as
              possible
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={ticketForm.subject}
                onChange={handleTicketFormChange}
                placeholder="Brief description of your issue"
                className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={ticketForm.priority}
                  onChange={handleTicketFormChange}
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={ticketForm.category}
                  onChange={handleTicketFormChange}
                  className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  <option>Technical Issue</option>
                  <option>Feature Request</option>
                  <option>Account</option>
                  <option>Billing</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={ticketForm.description}
                onChange={handleTicketFormChange}
                rows={6}
                placeholder="Please provide detailed information about your issue..."
                className="w-full px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateTicketModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTicket}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
