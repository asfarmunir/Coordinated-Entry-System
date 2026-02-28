"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScreenHeader from "./ScreenHeader";

interface Resource {
  id: string;
  name: string;
  resourceId: string;
  type: string;
  typeCategory: string;
  description?: string;
  totalCapacity: number;
  availableNow: number;
  unitValue?: string;
  eligibility: string;
  restrictions?: string;
  validityPeriod?: number;
  status: "Available" | "Limited";
  contact: {
    name: string;
    phone: string;
  };
  lastUpdated: string;
  updatedBy: string;
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Mock data
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      name: "Emergency Rental Assistance Fund",
      resourceId: "RES-001",
      type: "Rental Assistance Funds",
      typeCategory: "Rental",
      totalCapacity: 50000,
      availableNow: 48500,
      unitValue: "Up to $2,000 per household",
      eligibility:
        "Income at or below 50% AMI, facing eviction or rent burden >50%",
      status: "Available",
      contact: {
        name: "Michael Chen",
        phone: "(555) 234-5678",
      },
      lastUpdated: "3/1/2026, 2:11:46 AM",
      updatedBy: "Sarah Johnson",
    },
    {
      id: "2",
      name: "Emergency Shelter Beds",
      resourceId: "RES-002",
      type: "Available Beds",
      typeCategory: "Beds",
      totalCapacity: 45,
      availableNow: 58,
      eligibility: "Adults 18+ experiencing homelessness",
      status: "Available",
      contact: {
        name: "David Thompson",
        phone: "(555) 345-6789",
      },
      lastUpdated: "3/1/2026, 2:11:53 AM",
      updatedBy: "Jennifer Martinez",
    },
    {
      id: "3",
      name: "Clothing Vouchers",
      resourceId: "RES-003",
      type: "Clothing Vouchers",
      typeCategory: "Clothing",
      totalCapacity: 200,
      availableNow: 156,
      unitValue: "$75 per voucher",
      eligibility: "All individuals and families in need",
      status: "Available",
      contact: {
        name: "Emily Rodriguez",
        phone: "(555) 456-7890",
      },
      lastUpdated: "2025-11-09 11:00 AM",
      updatedBy: "Sarah Johnson",
    },
    {
      id: "4",
      name: "Hotel Emergency Vouchers",
      resourceId: "RES-004",
      type: "Hotel Vouchers",
      typeCategory: "Hotels",
      totalCapacity: 30,
      availableNow: 4,
      unitValue: "Up to 3 nights",
      eligibility:
        "Families with children under 18, domestic violence survivors, severe weather emergencies",
      status: "Limited",
      contact: {
        name: "Sarah Johnson",
        phone: "(555) 123-4567",
      },
      lastUpdated: "2025-11-10 09:45 AM",
      updatedBy: "Michael Chen",
    },
    {
      id: "5",
      name: "Public Transportation Vouchers",
      resourceId: "RES-005",
      type: "Transportation Vouchers",
      typeCategory: "Transport",
      totalCapacity: 500,
      availableNow: 342,
      unitValue: "$25 transit card",
      eligibility: "Job seekers, medical appointments, social service access",
      status: "Available",
      contact: {
        name: "Michael Chen",
        phone: "(555) 234-5678",
      },
      lastUpdated: "2025-11-09 04:20 PM",
      updatedBy: "Jennifer Martinez",
    },
    {
      id: "6",
      name: "Mental Health Counseling Sessions",
      resourceId: "RES-006",
      type: "Mental Health Services",
      typeCategory: "Mental Health",
      totalCapacity: 80,
      availableNow: 23,
      unitValue: "Up to 12 sessions per client",
      eligibility:
        "Adults 18+, priority for trauma survivors and unhoused individuals",
      status: "Limited",
      contact: {
        name: "Dr. Amanda Foster",
        phone: "(555) 567-8901",
      },
      lastUpdated: "2025-11-10 10:00 AM",
      updatedBy: "Dr. Amanda Foster",
    },
    {
      id: "7",
      name: "Primary Health Services",
      resourceId: "RES-007",
      type: "Health Services",
      typeCategory: "Health",
      totalCapacity: 120,
      availableNow: 67,
      eligibility: "Uninsured or underinsured individuals",
      status: "Available",
      contact: {
        name: "Nurse Patricia Williams",
        phone: "(555) 678-9012",
      },
      lastUpdated: "2025-11-09 03:15 PM",
      updatedBy: "Nurse Patricia Williams",
    },
    {
      id: "8",
      name: "Rapid Re-housing Rental Assistance",
      resourceId: "RES-008",
      type: "Rental Assistance Funds",
      typeCategory: "Rental",
      totalCapacity: 75000,
      availableNow: 12000,
      unitValue: "Up to 6 months rent + deposit",
      eligibility:
        "Literally homeless, able to maintain housing with time-limited assistance",
      status: "Limited",
      contact: {
        name: "Robert Martinez",
        phone: "(555) 789-0123",
      },
      lastUpdated: "2025-11-10 02:30 AM",
      updatedBy: "Robert Martinez",
    },
  ]);

  const [newResource, setNewResource] = useState({
    name: "",
    type: "",
    description: "",
    totalCapacity: "",
    availableNow: "",
    unitValue: "",
    eligibility: "",
    restrictions: "",
    validityPeriod: "",
  });

  const resourceTypes = [
    { value: "Rental Assistance Funds", category: "Rental" },
    { value: "Available Beds", category: "Beds" },
    { value: "Clothing Vouchers", category: "Clothing" },
    { value: "Hotel Vouchers", category: "Hotels" },
    { value: "Transportation Vouchers", category: "Transport" },
    { value: "Counseling Services", category: "Mental Health" },
    { value: "Mental Health Services", category: "Mental Health" },
    { value: "Health Services", category: "Health" },
  ];

  const filters = [
    "All",
    "Rental",
    "Beds",
    "Clothing",
    "Hotels",
    "Transport",
    "Mental Health",
    "Health",
  ];

  const handleAddResource = () => {
    const selectedType = resourceTypes.find(
      (t) => t.value === newResource.type,
    );
    const newResourceItem: Resource = {
      id: String(resources.length + 1),
      name: newResource.name,
      resourceId: `RES-${String(resources.length + 1).padStart(3, "0")}`,
      type: newResource.type,
      typeCategory: selectedType?.category || "",
      description: newResource.description,
      totalCapacity: Number(newResource.totalCapacity),
      availableNow: Number(newResource.availableNow),
      unitValue: newResource.unitValue,
      eligibility: newResource.eligibility,
      restrictions: newResource.restrictions,
      validityPeriod: newResource.validityPeriod
        ? Number(newResource.validityPeriod)
        : undefined,
      status:
        Number(newResource.availableNow) / Number(newResource.totalCapacity) >
        0.3
          ? "Available"
          : "Limited",
      contact: {
        name: "New Contact",
        phone: "(555) 000-0000",
      },
      lastUpdated: new Date().toLocaleString(),
      updatedBy: "Current User",
    };

    setResources([...resources, newResourceItem]);
    setIsAddDialogOpen(false);
    setNewResource({
      name: "",
      type: "",
      description: "",
      totalCapacity: "",
      availableNow: "",
      unitValue: "",
      eligibility: "",
      restrictions: "",
      validityPeriod: "",
    });
  };

  const handleEditResource = () => {
    if (!editingResource) return;

    const updatedResources = resources.map((r) =>
      r.id === editingResource.id ? editingResource : r,
    );
    setResources(updatedResources);
    setIsEditDialogOpen(false);
    setEditingResource(null);
  };

  const handleDeleteResource = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  const openEditDialog = (resource: Resource) => {
    setEditingResource(resource);
    setIsEditDialogOpen(true);
  };

  const filteredResources = resources.filter((resource) => {
    const matchesFilter =
      activeFilter === "All" || resource.typeCategory === activeFilter;
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.eligibility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    categories: new Set(resources.map((r) => r.typeCategory)).size,
    highAvailability: resources.filter(
      (r) => r.availableNow / r.totalCapacity > 0.5,
    ).length,
    lowAvailability: resources.filter(
      (r) => r.availableNow / r.totalCapacity <= 0.3,
    ).length,
    recentlyUpdated: resources.filter((r) => r.lastUpdated.includes("2026"))
      .length,
  };

  const getAvailabilityPercentage = (available: number, total: number) => {
    return Math.min(Math.round((available / total) * 100), 100);
  };

  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 60) return "bg-[#10b981]";
    if (percentage >= 30) return "bg-[#f59e0b]";
    return "bg-[#ef4444]";
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case "Rental":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#3b82f6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        );
      case "Beds":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#f97316]/10 dark:bg-[#f97316]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#f97316]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </div>
        );
      case "Clothing":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#8b5cf6]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        );
      case "Hotels":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#ec4899]/10 dark:bg-[#ec4899]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#ec4899]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        );
      case "Transport":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 dark:bg-[#06b6d4]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#06b6d4]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        );
      case "Mental Health":
      case "Health":
        return (
          <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 dark:bg-[#10b981]/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#10b981]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Resource Management"
        description="Manage and update service offerings in real-time"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
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
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Resource Categories
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                {stats.categories}
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
                High Availability
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                {stats.highAvailability}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
                Low Availability
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                {stats.lowAvailability}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
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
                Updated Categories
              </p>
              <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground">
                {stats.recentlyUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 md:gap-2 bg-card rounded-xl p-1 border border-border overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 md:px-6 py-2 rounded-lg text-xs md:text-sm 2xl:text-base font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative hidden md:block w-64 lg:w-80">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
          Add Resource
        </button>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mb-6">
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
            placeholder="Search resources..."
            className="flex-1 bg-transparent border-none outline-none text-sm 2xl:text-base text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Resource
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Type
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Availability
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Unit Value
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Eligibility
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Last Updated
                </TableHead>
                <TableHead className="px-6 py-4 text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => {
                const percentage = getAvailabilityPercentage(
                  resource.availableNow,
                  resource.totalCapacity,
                );
                return (
                  <TableRow
                    key={resource.id}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getIconForCategory(resource.typeCategory)}
                        <div>
                          <p className="text-sm 2xl:text-base font-medium text-foreground">
                            {resource.name}
                          </p>
                          <p className="text-xs 2xl:text-sm text-muted-foreground">
                            {resource.resourceId}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-sm 2xl:text-base text-foreground">
                        {resource.type}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground">
                            {percentage}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {resource.availableNow} / {resource.totalCapacity}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getAvailabilityColor(
                              percentage,
                            )}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <p className="text-sm 2xl:text-base text-foreground">
                        {resource.unitValue || "-"}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 max-w-xs">
                      <p className="text-sm 2xl:text-base text-foreground line-clamp-2">
                        {resource.eligibility}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          resource.status === "Available"
                            ? "bg-[#10b981]/10 text-[#10b981]"
                            : "bg-[#f59e0b]/10 text-[#f59e0b]"
                        }`}
                      >
                        {resource.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div>
                        <p className="text-sm 2xl:text-base text-foreground">
                          {resource.contact.name}
                        </p>
                        <p className="text-xs 2xl:text-sm text-muted-foreground">
                          {resource.contact.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div>
                        <p className="text-sm 2xl:text-base text-foreground">
                          {resource.lastUpdated}
                        </p>
                        <p className="text-xs 2xl:text-sm text-muted-foreground">
                          by {resource.updatedBy}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditDialog(resource)}
                          className="p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteResource(resource.id)}
                          className="p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                          title="Delete"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredResources.length === 0 && (
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-foreground font-medium mb-1">
              No resources found
            </p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      {/* Add Resource Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add New Resource
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Create a new service offering or resource for your agency
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Resource Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Emergency Rental Assistance"
                  value={newResource.name}
                  onChange={(e) =>
                    setNewResource({ ...newResource, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Resource Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={newResource.type}
                  onChange={(e) =>
                    setNewResource({ ...newResource, type: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select type</option>
                  {resourceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Describe the resource and what it provides"
                value={newResource.description}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Total Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 100"
                  value={newResource.totalCapacity}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      totalCapacity: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Available Now <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 75"
                  value={newResource.availableNow}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      availableNow: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Unit Value
                </label>
                <input
                  type="text"
                  placeholder="e.g., $50 per voucher"
                  value={newResource.unitValue}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      unitValue: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Eligibility Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Who is eligible for this resource?"
                value={newResource.eligibility}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    eligibility: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Restrictions
              </label>
              <textarea
                placeholder="Any limitations or restrictions on this resource"
                value={newResource.restrictions}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    restrictions: e.target.value,
                  })
                }
                rows={2}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Validity Period (Days)
              </label>
              <input
                type="number"
                placeholder="e.g., 90"
                value={newResource.validityPeriod}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    validityPeriod: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                setNewResource({
                  name: "",
                  type: "",
                  description: "",
                  totalCapacity: "",
                  availableNow: "",
                  unitValue: "",
                  eligibility: "",
                  restrictions: "",
                  validityPeriod: "",
                });
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddResource}
              disabled={
                !newResource.name ||
                !newResource.type ||
                !newResource.totalCapacity ||
                !newResource.availableNow ||
                !newResource.eligibility
              }
              className="rounded-lg"
            >
              Add Resource
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Resource Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Resource
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Update resource information
            </p>
          </DialogHeader>

          {editingResource && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Resource Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingResource.name}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Resource Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editingResource.type}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {resourceTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Total Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={editingResource.totalCapacity}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        totalCapacity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Available Now <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={editingResource.availableNow}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        availableNow: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Unit Value
                  </label>
                  <input
                    type="text"
                    value={editingResource.unitValue || ""}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        unitValue: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Eligibility Requirements{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={editingResource.eligibility}
                  onChange={(e) =>
                    setEditingResource({
                      ...editingResource,
                      eligibility: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditingResource(null);
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button onClick={handleEditResource} className="rounded-lg">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
