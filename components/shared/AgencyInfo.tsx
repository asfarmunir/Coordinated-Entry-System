"use client";

import React, { useState } from "react";
import ScreenHeader from "./ScreenHeader";
import { Button } from "@/components/ui/button";

const AgencyInfo = () => {
  // Mock data - replace with actual data from API/database
  const initialData = {
    organizationName: "Community Hope Agency",
    description:
      "A non-profit organization dedicated to providing comprehensive support services to underserved communities. We specialize in housing assistance, food security, and mental health support.",
    establishedYear: "2015",
    caseManagers: "45",
    servicesOffered:
      "Housing Assistance, Food Bank, Mental Health Counseling, Job Training",
    contact: {
      address: "123 Main Street, Springfield, IL 62701",
      phone: "(555) 123-4567",
      email: "contact@communityhope.org",
      website: "www.communityhope.org",
    },
    operatingHours: [
      { day: "MONDAY", open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "TUESDAY", open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "WEDNESDAY", open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "THURSDAY", open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "FRIDAY", open: "9:00 AM", close: "5:00 PM", closed: false },
      { day: "SATURDAY", open: "", close: "", closed: true },
      { day: "SUNDAY", open: "", close: "", closed: true },
    ],
    holidayHours: "Closed on all federal holidays.",
    emergencyContact: {
      phone: "(555) 999-0000",
      description: "24/7 Crisis Line",
    },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Handle save logic here - send to API
    console.log("Saving data:", formData);
    setIsEditing(false);
    // You can add API call here to save the data
  };

  const handleCancel = () => {
    // Reset form data to initial values
    setFormData(initialData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }));
  };

  const handleOperatingHoursChange = (
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: prev.operatingHours.map((hour, i) =>
        i === index ? { ...hour, [field]: value } : hour,
      ),
    }));
  };

  return (
    <div className="min-h-full bg-card-foreground rounded-2xl p-3 md:p-6">
      {/* Header with Edit Button */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground mb-1">
            Agency Profile
          </h1>
          <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
            View and manage your organization&apos;s information
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="rounded-xl px-4 py-2 text-sm 2xl:text-base w-fit"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="rounded-xl px-4 py-2 text-sm 2xl:text-base w-fit"
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
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEditProfile}
              className="rounded-xl px-4 py-2 text-sm 2xl:text-base w-fit"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-10 md:pb-0">
        {/* Organization Details Section */}
        <div className="bg-[#F8FAFC] dark:bg-[#1f2937] rounded-xl p-4 md:p-6 space-y-6">
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Organization Details
          </h2>

          {/* Organization Name */}
          <div>
            <label className="text-xs md:text-sm text-muted-foreground font-medium mb-1 block">
              Organization Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) =>
                  handleInputChange("organizationName", e.target.value)
                }
                className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                {formData.organizationName}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs md:text-sm text-muted-foreground font-medium mb-1 block">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none leading-relaxed"
              />
            ) : (
              <p className="text-sm md:text-base text-foreground leading-relaxed bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3 ">
                {formData.description}
              </p>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs md:text-sm text-muted-foreground font-medium mb-1 block">
                Established Year
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.establishedYear}
                  onChange={(e) =>
                    handleInputChange("establishedYear", e.target.value)
                  }
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.establishedYear}
                </p>
              )}
            </div>
            <div>
              <label className="text-xs md:text-sm text-muted-foreground font-medium mb-1 block">
                Case Managers
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.caseManagers}
                  onChange={(e) =>
                    handleInputChange("caseManagers", e.target.value)
                  }
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.caseManagers} case managers
                </p>
              )}
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <label className="text-xs md:text-sm text-muted-foreground font-medium mb-2 block">
              Services Offered
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.servicesOffered}
                onChange={(e) =>
                  handleInputChange("servicesOffered", e.target.value)
                }
                placeholder="Separate services with commas"
                className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                {formData.servicesOffered}
              </p>
            )}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-[#F8FAFC] dark:bg-[#1f2937] rounded-xl p-4 md:p-6 space-y-6">
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Contact Information
          </h2>

          {/* Address */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-muted-foreground font-medium block mb-1">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.contact.address}
                  onChange={(e) =>
                    handleContactChange("address", e.target.value)
                  }
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.contact.address}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-muted-foreground font-medium block mb-1">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) => handleContactChange("phone", e.target.value)}
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.contact.phone}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-muted-foreground font-medium block mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.contact.email}
                </p>
              )}
            </div>
          </div>

          {/* Website */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-muted-foreground font-medium block mb-1">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.contact.website}
                  onChange={(e) =>
                    handleContactChange("website", e.target.value)
                  }
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.contact.website}
                </p>
              )}
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-muted-foreground font-medium block mb-3">
                Operating Hours
              </label>
              <div className="space-y-2">
                {formData.operatingHours.map((schedule, index) => (
                  <div
                    key={schedule.day}
                    className="flex items-center justify-between text-sm gap-2"
                  >
                    <span className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide min-w-[80px]">
                      {schedule.day}
                    </span>
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={schedule.closed}
                          onChange={(e) =>
                            handleOperatingHoursChange(
                              index,
                              "closed",
                              e.target.checked,
                            )
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-xs">Closed</span>
                        {!schedule.closed && (
                          <>
                            <input
                              type="text"
                              value={schedule.open}
                              onChange={(e) =>
                                handleOperatingHoursChange(
                                  index,
                                  "open",
                                  e.target.value,
                                )
                              }
                              placeholder="9:00 AM"
                              className="w-20 text-xs text-foreground bg-card dark:bg-card-foreground px-2 py-1 rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <span className="text-xs">-</span>
                            <input
                              type="text"
                              value={schedule.close}
                              onChange={(e) =>
                                handleOperatingHoursChange(
                                  index,
                                  "close",
                                  e.target.value,
                                )
                              }
                              placeholder="5:00 PM"
                              className="w-20 text-xs text-foreground bg-card dark:bg-card-foreground px-2 py-1 rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </>
                        )}
                      </div>
                    ) : schedule.closed ? (
                      <span className="text-xs md:text-sm font-semibold text-destructive">
                        CLOSED
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="text-xs md:text-sm">
                          {schedule.open}
                        </span>
                        <svg
                          className="w-3 h-3 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <circle cx="12" cy="12" r="1" fill="currentColor" />
                        </svg>
                        <span className="text-xs md:text-sm">
                          {schedule.close}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holiday Hours */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-muted-foreground font-medium block mb-1">
                Holiday Hours
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.holidayHours}
                  onChange={(e) =>
                    handleInputChange("holidayHours", e.target.value)
                  }
                  className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <p className="text-sm md:text-base text-foreground bg-card px-3 md:px-4 py-2.5 rounded-lg md:py-3">
                  {formData.holidayHours}
                </p>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <div className="flex-shrink-0 mt-0.5">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <label className="text-xs md:text-sm text-primary font-semibold block mb-1">
                Emergency Contact
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) =>
                      handleEmergencyContactChange("phone", e.target.value)
                    }
                    placeholder="Phone number"
                    className="w-full text-sm md:text-base text-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
                  />
                  <input
                    type="text"
                    value={formData.emergencyContact.description}
                    onChange={(e) =>
                      handleEmergencyContactChange(
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Description"
                    className="w-full text-sm md:text-base text-muted-foreground bg-card dark:bg-card-foreground px-3 md:px-4 py-2 xl:py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ) : (
                <p className="text-sm md:text-base text-foreground font-semibold">
                  {formData.emergencyContact.phone}{" "}
                  <span className="text-muted-foreground font-normal">
                    ({formData.emergencyContact.description})
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyInfo;
