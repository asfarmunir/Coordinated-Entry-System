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

interface Appointment {
  id: string;
  dateTime: {
    date: string;
    timeStart: string;
    timeEnd: string;
  };
  type: {
    name: string;
    color: string;
  };
  participant: {
    name: string;
    id: string;
  };
  staff: {
    name: string;
    id: string;
  };
  location: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "No-Show";
  notes?: string;
  reminderSent?: boolean;
}

interface AppointmentType {
  id: string;
  name: string;
  color: string;
  duration: number;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      dateTime: {
        date: "10/02/2026",
        timeStart: "14:00",
        timeEnd: "14:30",
      },
      type: {
        name: "Case Review",
        color: "#10b981",
      },
      participant: {
        name: "Michael Roberts",
        id: "P-001",
      },
      staff: {
        name: "Jessica Brown",
        id: "S-001",
      },
      location: "Office - Room 102",
      status: "Scheduled",
      reminderSent: false,
    },
    {
      id: "2",
      dateTime: {
        date: "06/02/2026",
        timeStart: "15:00",
        timeEnd: "16:00",
      },
      type: {
        name: "Initial Intake",
        color: "#3b82f6",
      },
      participant: {
        name: "David Kim",
        id: "P-002",
      },
      staff: {
        name: "Jessica Brown",
        id: "S-001",
      },
      location: "N/A",
      status: "Scheduled",
      reminderSent: true,
    },
  ]);

  const [appointmentTypes] = useState<AppointmentType[]>([
    { id: "1", name: "Initial Intake", color: "#3b82f6", duration: 60 },
    { id: "2", name: "Case Review", color: "#10b981", duration: 30 },
    { id: "3", name: "Follow-up", color: "#f59e0b", duration: 30 },
    { id: "4", name: "Assessment", color: "#8b5cf6", duration: 45 },
  ]);

  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isManageTypesOpen, setIsManageTypesOpen] = useState(false);
  const [showAvailableSlots, setShowAvailableSlots] = useState(false);
  const [filterType, setFilterType] = useState("All Appointment Types");
  const [filterDate, setFilterDate] = useState("All Upcoming Dates");
  const [viewMode, setViewMode] = useState("List");

  const [newAppointment, setNewAppointment] = useState({
    type: "",
    participantName: "",
    phoneNumber: "",
    email: "",
    date: "",
    startTime: "",
    staffMember: "",
    location: "",
    notes: "",
  });

  const smsCredits = 100;
  const smsCreditCost = 150;

  const stats = {
    upcoming: appointments.filter((a) => a.status === "Scheduled").length,
    today: appointments.filter(
      (a) =>
        a.status === "Scheduled" &&
        a.dateTime.date === new Date().toLocaleDateString("en-US"),
    ).length,
    thisWeek: appointments.filter((a) => {
      const appointmentDate = new Date(a.dateTime.date);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return a.status === "Scheduled" && appointmentDate <= weekFromNow;
    }).length,
    completed: appointments.filter((a) => a.status === "Completed").length,
  };

  const handleScheduleAppointment = () => {
    // Implementation would go here
    console.log("Scheduling appointment:", newAppointment);
    setIsNewAppointmentOpen(false);
    setNewAppointment({
      type: "",
      participantName: "",
      phoneNumber: "",
      email: "",
      date: "",
      startTime: "",
      staffMember: "",
      location: "",
      notes: "",
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-[#3b82f6]/10 text-[#3b82f6] dark:bg-[#3b82f6]/20";
      case "Completed":
        return "bg-[#10b981]/10 text-[#10b981] dark:bg-[#10b981]/20";
      case "Cancelled":
        return "bg-[#ef4444]/10 text-[#ef4444] dark:bg-[#ef4444]/20";
      case "No-Show":
        return "bg-[#f59e0b]/10 text-[#f59e0b] dark:bg-[#f59e0b]/20";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="h-full max-w-full bg-card-foreground rounded-2xl p-3 md:p-6 overflow-x-hidden">
      <ScreenHeader
        title="Appointments"
        description="Schedule and manage participant appointments"
      />

      {/* SMS Credits Banner */}
      <div className="mb-6 bg-[#e0f2fe] dark:bg-[#0c4a6e] rounded-2xl p-4 border border-[#bae6fd] dark:border-[#075985]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#3b82f6]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#0c4a6e] dark:text-[#e0f2fe]">
                Available SMS Reminder Balance:{" "}
                <span className="font-bold">{smsCredits} credits</span>{" "}
                <span className="text-muted-foreground">
                  (${smsCreditCost})
                </span>
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
            Purchase Messaging Credits
          </button>
        </div>
      </div>

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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.upcoming}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Today</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.today}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">This Week</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.thisWeek}
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
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="hidden md:flex  flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
          {/* Filter by Type */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Filter by Type:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                {filterType}
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
              <DropdownMenuContent className="min-w-[200px]">
                <DropdownMenuItem
                  onClick={() => setFilterType("All Appointment Types")}
                >
                  All Appointment Types
                </DropdownMenuItem>
                {appointmentTypes.map((type) => (
                  <DropdownMenuItem
                    key={type.id}
                    onClick={() => setFilterType(type.name)}
                  >
                    {type.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filter by Date */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Filter by Date:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
                {filterDate}
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
              <DropdownMenuContent className="min-w-[180px]">
                <DropdownMenuItem
                  onClick={() => setFilterDate("All Upcoming Dates")}
                >
                  All Upcoming Dates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterDate("Today")}>
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterDate("This Week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterDate("This Month")}>
                  This Month
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Show Available Slots */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAvailableSlots}
              onChange={(e) => setShowAvailableSlots(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground">
              Show Available Slots
            </span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsManageTypesOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors"
          >
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Manage Appointment Types
          </button>

          <button
            onClick={() => setIsNewAppointmentOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Appointment
          </button>
        </div>
      </div>

      {/* View Selector */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2">
              {viewMode}
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
            <DropdownMenuContent className="min-w-[120px]">
              <DropdownMenuItem onClick={() => setViewMode("List")}>
                List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("Calendar")}>
                Calendar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted/50">
                <TableHead className="text-muted-foreground font-semibold py-4">
                  DATE & TIME
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">
                  TYPE
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">
                  PARTICIPANT
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">
                  STAFF
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">
                  LOCATION
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">
                  STATUS
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {appointment.dateTime.date}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {appointment.dateTime.timeStart} -{" "}
                        {appointment.dateTime.timeEnd}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: appointment.type.color }}
                      />
                      <span className="text-foreground">
                        {appointment.type.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {appointment.participant.name}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {appointment.staff.name}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {appointment.location}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit appointment"
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
                      {appointment.status === "Scheduled" &&
                        !appointment.reminderSent && (
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Send reminder"
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
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                          </button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {appointments.length === 0 && (
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No appointments found
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by scheduling your first appointment
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          {appointments.length} Appointment
          {appointments.length !== 1 ? "s" : ""}
        </p>
        <button className="text-sm text-primary hover:underline">
          Print / CSV
        </button>
      </div>

      {/* Schedule New Appointment Dialog */}
      <Dialog
        open={isNewAppointmentOpen}
        onOpenChange={setIsNewAppointmentOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Schedule New Appointment
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create a new appointment for a participant
            </p>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Appointment Type <span className="text-red-500">*</span>
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                    {newAppointment.type || "Select type"}
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
                  <DropdownMenuContent className="w-full min-w-[250px]">
                    {appointmentTypes.map((type) => (
                      <DropdownMenuItem
                        key={type.id}
                        onClick={() =>
                          setNewAppointment({
                            ...newAppointment,
                            type: type.name,
                          })
                        }
                      >
                        {type.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Participant Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Participant Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter participant name"
                  value={newAppointment.participantName}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      participantName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={newAppointment.phoneNumber}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="participant@email.com"
                  value={newAppointment.email}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={newAppointment.date}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="--:-- --"
                  value={newAppointment.startTime}
                  onChange={(e) =>
                    setNewAppointment({
                      ...newAppointment,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Staff Member */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Staff Member
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                    {newAppointment.staffMember || "Select staff"}
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
                    <DropdownMenuItem
                      onClick={() =>
                        setNewAppointment({
                          ...newAppointment,
                          staffMember: "Jessica Brown",
                        })
                      }
                    >
                      Jessica Brown
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setNewAppointment({
                          ...newAppointment,
                          staffMember: "Michael Chen",
                        })
                      }
                    >
                      Michael Chen
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setNewAppointment({
                          ...newAppointment,
                          staffMember: "Sarah Johnson",
                        })
                      }
                    >
                      Sarah Johnson
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., Office - Room 101"
                value={newAppointment.location}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    location: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes
              </label>
              <textarea
                placeholder="Add any additional notes"
                value={newAppointment.notes}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    notes: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <button
              onClick={() => setIsNewAppointmentOpen(false)}
              className="px-5 py-2.5 bg-card border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleScheduleAppointment}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Schedule Appointment
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Appointment Types Dialog */}
      <Dialog open={isManageTypesOpen} onOpenChange={setIsManageTypesOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Manage Appointment Types
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Configure appointment types and their settings
            </p>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-3">
              {appointmentTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <div>
                      <p className="font-medium text-foreground">{type.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {type.duration} minutes
                      </p>
                    </div>
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

            <button className="w-full mt-4 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium">
              + Add New Type
            </button>
          </div>

          <DialogFooter>
            <button
              onClick={() => setIsManageTypesOpen(false)}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
