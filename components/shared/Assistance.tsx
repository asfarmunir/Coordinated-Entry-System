"use client";

import React, { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface AssistanceRecord {
  id: string;
  dateTime: string;
  participant: {
    name: string;
    id: string;
  };
  amount: number;
  unit: string;
  category: string;
  description: string;
  providedBy: string;
  visibleTo: string[];
  attachments?: string[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

const Assistance = () => {
  const [activeTab, setActiveTab] = useState<"records" | "categories">(
    "records",
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Feb 01, 2026 - Mar 03, 2026");

  const [assistanceRecords, setAssistanceRecords] = useState<
    AssistanceRecord[]
  >([]);

  const [categories] = useState<Category[]>([
    {
      id: "1",
      name: "Housing Assistance",
      description: "Rent, utilities, deposits",
    },
    {
      id: "2",
      name: "Transportation",
      description: "Bus passes, gas vouchers",
    },
    {
      id: "3",
      name: "Food Assistance",
      description: "Food vouchers, groceries",
    },
    {
      id: "4",
      name: "Medical",
      description: "Medical expenses, prescriptions",
    },
    { id: "5", name: "Clothing", description: "Clothing vouchers" },
  ]);

  const [newAssistance, setNewAssistance] = useState({
    participantName: "",
    participantId: "",
    amount: "",
    unit: "Dollars",
    category: "",
    description: "",
    dateTime: new Date().toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    visibleTo: [] as string[],
    file: null as File | null,
  });

  const units = ["Dollars", "Hours", "Items", "Sessions"];

  const stats = {
    totalRecords: assistanceRecords.length,
    totalAmount: assistanceRecords.reduce((sum, record) => {
      if (record.unit === "Dollars") {
        return sum + record.amount;
      }
      return sum;
    }, 0),
    thisMonth: assistanceRecords.filter((record) => {
      const recordDate = new Date(record.dateTime);
      const now = new Date();
      return (
        recordDate.getMonth() === now.getMonth() &&
        recordDate.getFullYear() === now.getFullYear()
      );
    }).length,
    participants: new Set(assistanceRecords.map((r) => r.participant.id)).size,
  };

  const handleSaveAssistance = () => {
    if (
      !newAssistance.participantName ||
      !newAssistance.amount ||
      !newAssistance.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newRecord: AssistanceRecord = {
      id: String(assistanceRecords.length + 1),
      dateTime: newAssistance.dateTime,
      participant: {
        name: newAssistance.participantName,
        id:
          newAssistance.participantId ||
          `P-${String(assistanceRecords.length + 1).padStart(3, "0")}`,
      },
      amount: parseFloat(newAssistance.amount),
      unit: newAssistance.unit,
      category: newAssistance.category,
      description: newAssistance.description,
      providedBy: "Current User",
      visibleTo: newAssistance.visibleTo,
      attachments: newAssistance.file ? [newAssistance.file.name] : undefined,
    };

    setAssistanceRecords([...assistanceRecords, newRecord]);
    setIsAddDialogOpen(false);
    setNewAssistance({
      participantName: "",
      participantId: "",
      amount: "",
      unit: "Dollars",
      category: "",
      description: "",
      dateTime: new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      visibleTo: [],
      file: null,
    });
  };

  const filteredRecords = assistanceRecords.filter((record) => {
    const matchesSearch =
      record.participant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      record.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Assistance Tracking"
        description="Track assistance provided to participants"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Records
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stats.totalRecords}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 dark:bg-[#10b981]/20 flex items-center justify-center">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">
                ${stats.totalAmount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 dark:bg-[#f59e0b]/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#f59e0b]"
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
              <p className="text-sm text-muted-foreground mb-1">This Month</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.thisMonth}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 md:p-6 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#8b5cf6]"
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
              <p className="text-sm text-muted-foreground mb-1">Participants</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.participants}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("records")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "records"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-muted border border-border"
          }`}
        >
          Assistance Records
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
            activeTab === "categories"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground hover:bg-muted border border-border"
          }`}
        >
          Categories
        </button>
      </div>

      {activeTab === "records" ? (
        <>
          {/* Search and Date Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 w-full md:max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
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
                placeholder="Search by participant, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <button className="flex  w-full md:w-auto items-center justify-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors">
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
              </button>

              <button
                onClick={() => setIsAddDialogOpen(true)}
                className="flex w-full md:w-fit justify-center items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
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
                Add Assistance
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/50">
                    <TableHead className="text-muted-foreground font-semibold py-4">
                      DATE/TIME
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      PARTICIPANT
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      AMOUNT
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      CATEGORY
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      DESCRIPTION
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      PROVIDED BY
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      VISIBLE TO
                    </TableHead>
                    <TableHead className="text-muted-foreground font-semibold">
                      ACTIONS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow
                      key={record.id}
                      className="border-b border-border hover:bg-muted/30"
                    >
                      <TableCell className="py-4 text-foreground">
                        {record.dateTime}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {record.participant.name}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {record.unit === "Dollars" && "$"}
                        {record.amount}{" "}
                        {record.unit !== "Dollars" && record.unit}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {record.category}
                      </TableCell>
                      <TableCell className="text-foreground max-w-xs truncate">
                        {record.description}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {record.providedBy}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {record.visibleTo.length > 0
                          ? record.visibleTo.join(", ")
                          : "Everyone"}
                      </TableCell>
                      <TableCell>
                        <button
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Edit record"
                        >
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No assistance records found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start tracking assistance by adding your first record
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Categories Tab */
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Assistance Categories
            </h3>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
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
              Add Category
            </button>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border"
              >
                <div>
                  <p className="font-medium text-foreground">{category.name}</p>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <svg
                      className="w-4 h-4 text-red-500"
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
            ))}
          </div>
        </div>
      )}

      {/* Add Assistance Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Add Assistance
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Record new assistance provided to a participant
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Participant Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Participant Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
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
                  placeholder="Search by ID, Name, or SSN..."
                  value={newAssistance.participantName}
                  onChange={(e) =>
                    setNewAssistance({
                      ...newAssistance,
                      participantName: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newAssistance.amount}
                  onChange={(e) =>
                    setNewAssistance({
                      ...newAssistance,
                      amount: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Unit
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                    {newAssistance.unit}
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
                    {units.map((unit) => (
                      <DropdownMenuItem
                        key={unit}
                        onClick={() =>
                          setNewAssistance({ ...newAssistance, unit })
                        }
                      >
                        {unit}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Category */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Category <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setActiveTab("categories");
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Manage Categories
                </button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                  {newAssistance.category || "Select category"}
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
                <DropdownMenuContent className="w-full min-w-[300px]">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() =>
                        setNewAssistance({
                          ...newAssistance,
                          category: category.name,
                        })
                      }
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                placeholder="Describe the assistance provided"
                value={newAssistance.description}
                onChange={(e) =>
                  setNewAssistance({
                    ...newAssistance,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Edit Date/Time */}
            <div>
              <button className="text-sm text-primary hover:underline">
                Edit Date/Time
              </button>
              <p className="text-sm text-muted-foreground mt-1">
                {newAssistance.dateTime}
              </p>
            </div>

            {/* Attach a File */}
            <div className="bg-muted/30 rounded-xl p-4 border border-border">
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                Attach a File
              </label>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors cursor-pointer">
                  Choose file
                  <input
                    type="file"
                    onChange={(e) =>
                      setNewAssistance({
                        ...newAssistance,
                        file: e.target.files?.[0] || null,
                      })
                    }
                    className="hidden"
                  />
                </label>
                <span className="text-sm text-muted-foreground">
                  {newAssistance.file
                    ? newAssistance.file.name
                    : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Visible to */}
            <div className="bg-[#fef3c7] dark:bg-[#854d0e]/20 rounded-xl p-4 border border-[#fbbf24] dark:border-[#a16207]">
              <label className="block text-sm font-semibold text-foreground">
                Visible to
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Configure who can view this assistance record
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <button
              onClick={() => setIsAddDialogOpen(false)}
              className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
            <button
              onClick={handleSaveAssistance}
              className="px-5 py-2.5 bg-[#10b981] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assistance;
