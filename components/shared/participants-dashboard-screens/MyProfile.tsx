"use client";

import React, { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type ProfileForm = {
  firstName: string;
  lastName: string;
  preferredName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  race: string;
  ethnicity: string;
  veteranStatus: string;
  householdType: string;
  householdSize: string;
  dependents: string;
  chronicHealth: string;
  mentalHealth: string;
  substanceUse: string;
  currentLiving: string;
  homelessnessDuration: string;
  priorResidence: string;
  monthlyIncome: string;
  incomeSources: string; // comma-separated
  benefits: string; // comma-separated
};

// ── Initial data ──────────────────────────────────────────────────────────────
const INITIAL_FORM: ProfileForm = {
  firstName: "Maria",
  lastName: "Lopez",
  preferredName: "Mari",
  dateOfBirth: "1985-05-15",
  phone: "(555) 234-5678",
  email: "maria.l@email.com",
  address: "123 Temporary St, Los Angeles, CA 90012",
  gender: "Female",
  race: "Hispanic/Latino",
  ethnicity: "Hispanic",
  veteranStatus: "No",
  householdType: "Family with Children",
  householdSize: "4",
  dependents: "2",
  chronicHealth: "Diabetes Type 2",
  mentalHealth: "Anxiety",
  substanceUse: "None",
  currentLiving: "Emergency Shelter",
  homelessnessDuration: "3 months",
  priorResidence: "Living with family/friends",
  monthlyIncome: "$0 (minimum)",
  incomeSources: "TANF, Child Support",
  benefits: "SNAP, Medi-Cal, WIC",
};

const staticData = {
  ssn: "***-**-4332",
  membersInHousehold: [
    {
      name: "Brown Doe",
      relation: "Brother",
      dob: "1980-11-15",
      ssn: "111-22-3333",
      enrolled: false,
    },
  ],
  otherRelationships: [
    {
      name: "Sammy Doe",
      relation: "Brother",
      dob: "1990-06-20",
      ssn: "444-55-6666",
      enrolled: true,
    },
  ],
};

const enrolledServices = [
  {
    org: "Hope Housing Services",
    program: "Emergency Shelter Program",
    enrolled: "Sep 15, 2025",
    caseManager: "Sarah Johnson",
    color: "bg-primary",
  },
  {
    org: "Community Outreach Center",
    program: "Food Assistance Program",
    enrolled: "Oct 8, 2025",
    caseManager: "Michael Chen",
    color: "bg-emerald-500",
  },
  {
    org: "Family Support Services",
    program: "Case Management Services",
    enrolled: "Nov 12, 2025",
    caseManager: "Jennifer Martinez",
    color: "bg-orange-500",
  },
];

// ── Helper components ─────────────────────────────────────────────────────────

// Shared input class
const inputCls =
  "w-full text-sm 2xl:text-base text-foreground bg-background border border-border rounded-lg px-3 py-1.5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors placeholder:text-muted-foreground/50";

const Section = ({
  icon,
  title,
  children,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    className={`rounded-2xl border border-border overflow-hidden ${dark ? "" : "bg-card"}`}
  >
    <div
      className={`flex items-center gap-2 px-5 py-4 ${dark ? "bg-foreground text-background" : ""}`}
    >
      <span className={dark ? "text-background/70" : "text-primary"}>
        {icon}
      </span>
      <h2
        className={`text-sm 2xl:text-base font-semibold ${dark ? "text-background" : "text-foreground"}`}
      >
        {title}
      </h2>
    </div>
    <div className={`px-5 py-4 ${dark ? "bg-card" : ""}`}>{children}</div>
  </div>
);

const Field = ({
  label,
  name,
  value,
  type = "text",
  isEditing = false,
  onChange,
  locked,
}: {
  label: string;
  name?: string;
  value?: string | number;
  type?: string;
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  locked?: boolean;
}) => (
  <div>
    <p className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
      {label}
      {isEditing && locked && (
        <svg
          className="w-3 h-3 text-muted-foreground/60"
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
      )}
    </p>
    {isEditing && !locked && name && onChange ? (
      <input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className={inputCls}
      />
    ) : (
      <p className="text-sm 2xl:text-base font-medium text-foreground mt-0.5">
        {value ?? "—"}
      </p>
    )}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  options,
  isEditing = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div>
    <p className="text-xs 2xl:text-sm text-muted-foreground">{label}</p>
    {isEditing && onChange ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputCls}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    ) : (
      <p className="text-sm 2xl:text-base font-medium text-foreground mt-0.5">
        {value || "—"}
      </p>
    )}
  </div>
);

const TextAreaField = ({
  label,
  name,
  value,
  isEditing = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div>
    <p className="text-xs 2xl:text-sm text-muted-foreground">{label}</p>
    {isEditing && onChange ? (
      <textarea
        name={name}
        value={value}
        rows={2}
        onChange={onChange}
        className={inputCls + " resize-none"}
      />
    ) : (
      <p className="text-sm 2xl:text-base font-medium text-foreground mt-0.5">
        {value || "—"}
      </p>
    )}
  </div>
);

const Grid = ({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: number;
}) => (
  <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-4 2xl:gap-5`}>
    {children}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileForm>(INITIAL_FORM);
  const [snapshot, setSnapshot] = useState<ProfileForm>(INITIAL_FORM);
  const [ssnVisible, setSsnVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setSnapshot(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(snapshot);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSnapshot(formData);
    setIsEditing(false);
    // TODO: persist to API
  };

  const pillList = (csv: string) =>
    csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  return (
    <div className="w-full bg-background px-4 md:px-6 2xl:px-8 py-5 2xl:py-7">
      <div className="flex flex-col sm:flex-row sm:items-center border border-border justify-between gap-3 mb-3 bg-card p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl 2xl:text-3xl font-bold text-foreground">
              {formData.firstName} {formData.lastName}{" "}
              <span className="text-muted-foreground font-normal text-base 2xl:text-lg">
                &ldquo;{formData.preferredName}&rdquo;
              </span>
            </h1>
          </div>
          <p className="text-xs 2xl:text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
            <span>ID: PT-2047</span>
            <span className="text-border">•</span>
            <span>Emergency Shelter</span>
            <span className="text-border">•</span>
            <span>Case Manager: Sarah Johnson</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs 2xl:text-sm text-muted-foreground hover:bg-muted transition-colors"
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
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs 2xl:text-sm font-medium hover:bg-primary/90 transition-colors"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs 2xl:text-sm text-muted-foreground hover:bg-muted transition-colors">
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
                Edit History
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs 2xl:text-sm font-medium hover:bg-primary/90 transition-colors"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      {/* ── Edit mode banner ── */}
      {isEditing ? (
        <div className="hidden md:flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 mb-4 text-xs 2xl:text-sm text-amber-700 dark:text-amber-400">
          <svg
            className="w-4 h-4 shrink-0"
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
          You are currently editing your profile. Click{" "}
          <span className="font-semibold mx-0.5">Save Changes</span> to apply
          updates or <span className="font-semibold mx-0.5">Cancel</span> to
          discard.
        </div>
      ) : (
        <div className="hidden md:flex  md:items-center gap-2 justify-between mb-5">
          <p className="text-[11px] 2xl:text-xs text-muted-foreground flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5"
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
            Last updated: 11/28/2025, 2:30:00 PM by Sarah Johnson
          </p>
          <p className="text-[11px] 2xl:text-xs text-primary flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
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
            7 fields consented
          </p>
        </div>
      )}

      {/* Last updated */}

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-4 2xl:gap-6">
        {/* ── Left: profile sections ── */}
        <div className="flex-1 min-w-0 space-y-4 2xl:space-y-5">
          {/* Basic Information */}
          <Section
            icon={
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
            }
            title="Basic Information"
          >
            <Grid cols={2}>
              <Field
                label="First Name"
                name="firstName"
                value={formData.firstName}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Preferred Name"
                name="preferredName"
                value={formData.preferredName}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                type="date"
                isEditing={isEditing}
                onChange={handleChange}
              />
            </Grid>
            {/* SSN — always read-only */}
            <div className="mt-4">
              <p className="text-xs 2xl:text-sm text-muted-foreground flex items-center gap-1">
                Social Security Number
                <svg
                  className="w-3 h-3 text-muted-foreground/60"
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
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-sm 2xl:text-base font-medium text-foreground">
                  {ssnVisible ? staticData.ssn : "***-**-4332"}
                </p>
                <button
                  onClick={() => setSsnVisible(!ssnVisible)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {ssnVisible ? (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.88 9.88l-3.29-3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5"
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
                  )}
                </button>
                {isEditing && (
                  <span className="text-[10px] text-muted-foreground/60">
                    managed by case manager
                  </span>
                )}
              </div>
            </div>
          </Section>

          {/* Contact Information */}
          <Section
            icon={
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
            }
            title="Contact Information"
          >
            <Grid cols={2}>
              <Field
                label="Phone Number"
                name="phone"
                value={formData.phone}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Email Address"
                name="email"
                value={formData.email}
                type="email"
                isEditing={isEditing}
                onChange={handleChange}
              />
            </Grid>
            <div className="mt-4">
              <TextAreaField
                label="Current Address"
                name="address"
                value={formData.address}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* Demographics */}
          <Section
            icon={
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
                  d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H2v-2a4 4 0 014-4h1m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 10-6 0"
                />
              </svg>
            }
            title="Demographics"
          >
            <Grid cols={2}>
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                options={[
                  "Female",
                  "Male",
                  "Non-binary",
                  "Transgender",
                  "Prefer not to say",
                  "Other",
                ]}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <SelectField
                label="Race"
                name="race"
                value={formData.race}
                options={[
                  "Hispanic/Latino",
                  "White",
                  "Black or African American",
                  "Asian",
                  "Native American",
                  "Pacific Islander",
                  "Multiracial",
                  "Other",
                ]}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <SelectField
                label="Ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                options={["Hispanic", "Non-Hispanic", "Prefer not to say"]}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <SelectField
                label="Veteran Status"
                name="veteranStatus"
                value={formData.veteranStatus}
                options={["No", "Yes", "Prefer not to say"]}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* Household Information */}
          <Section
            dark
            icon={
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
                  d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21V12h6v9"
                />
              </svg>
            }
            title="Household Information"
          >
            <Grid cols={2}>
              <SelectField
                label="Household Type"
                name="householdType"
                value={formData.householdType}
                options={[
                  "Family with Children",
                  "Single Adult",
                  "Adult Couple",
                  "Youth (Under 25)",
                  "Senior (62+)",
                  "Other",
                ]}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Household Size"
                name="householdSize"
                value={formData.householdSize}
                type="number"
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Number of Dependents"
                name="dependents"
                value={formData.dependents}
                type="number"
                isEditing={isEditing}
                onChange={handleChange}
              />
            </Grid>

            {/* Members in household */}
            <div className="mt-5">
              <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
                Members Living in Household
              </p>
              <div className="space-y-2">
                {staticData.membersInHousehold.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between gap-3 bg-background rounded-xl px-4 py-3 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm 2xl:text-base font-medium text-foreground">
                            {m.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {m.relation}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${m.enrolled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}
                          >
                            {m.enrolled ? "Enrolled" : "Not Enrolled"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          DOB: {m.dob} &nbsp;•&nbsp; SSN: {m.ssn}
                        </p>
                      </div>
                    </div>
                    <button className="text-xs 2xl:text-sm text-primary font-medium hover:underline shrink-0">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Other family relationships */}
            <div className="mt-5">
              <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
                Other Family Relationships
              </p>
              <div className="space-y-2">
                {staticData.otherRelationships.map((m) => (
                  <div
                    key={m.name}
                    className="flex items-center justify-between gap-3 bg-background rounded-xl px-4 py-3 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {m.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm 2xl:text-base font-medium text-foreground">
                            {m.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {m.relation}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${m.enrolled ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}
                          >
                            {m.enrolled ? "Enrolled" : "Not Enrolled"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          DOB: {m.dob} &nbsp;•&nbsp; SSN: {m.ssn}
                        </p>
                      </div>
                    </div>
                    <button className="text-xs 2xl:text-sm text-primary font-medium hover:underline shrink-0">
                      View
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[10px] 2xl:text-xs text-muted-foreground mt-3 flex items-start gap-1.5">
                <svg
                  className="w-3 h-3 mt-0.5 shrink-0"
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
                These records are managed by your Case Management tool. For
                privacy and data integrity, any updates to your household or
                family members must be processed by your assigned Case Manager.
              </p>
            </div>
          </Section>

          {/* Health Information */}
          <Section
            icon={
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            }
            title="Health Information"
          >
            <Grid cols={2}>
              <Field
                label="Chronic Health Condition"
                name="chronicHealth"
                value={formData.chronicHealth}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Mental Health Status"
                name="mentalHealth"
                value={formData.mentalHealth}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Substance Use History"
                name="substanceUse"
                value={formData.substanceUse}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* Housing History */}
          <Section
            icon={
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
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
            }
            title="Housing History"
          >
            <Grid cols={2}>
              <SelectField
                label="Current Living Situation"
                name="currentLiving"
                value={formData.currentLiving}
                options={[
                  "Emergency Shelter",
                  "Transitional Housing",
                  "Permanent Housing",
                  "Hotel/Motel",
                  "Unsheltered",
                  "Living with Family",
                  "Other",
                ]}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Length of Homelessness"
                name="homelessnessDuration"
                value={formData.homelessnessDuration}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <Field
                label="Prior Residence"
                name="priorResidence"
                value={formData.priorResidence}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* Income & Benefits */}
          <Section
            icon={
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Income & Benefits"
          >
            <Grid cols={2}>
              <Field
                label="Monthly Income"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <div>
                <p className="text-xs 2xl:text-sm text-muted-foreground">
                  Income Sources
                </p>
                {isEditing ? (
                  <input
                    name="incomeSources"
                    value={formData.incomeSources}
                    onChange={handleChange}
                    placeholder="e.g. TANF, Child Support"
                    className={inputCls}
                  />
                ) : (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {pillList(formData.incomeSources).map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Grid>
            <div className="mt-4">
              <p className="text-xs 2xl:text-sm text-muted-foreground">
                Benefits
              </p>
              {isEditing ? (
                <input
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  placeholder="e.g. SNAP, Medi-Cal, WIC"
                  className={inputCls}
                />
              ) : (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {pillList(formData.benefits).map((b) => (
                    <span
                      key={b}
                      className="text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground font-medium"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Section>
        </div>

        {/* ── Right sidebar ── */}
        <div className="lg:w-64 2xl:w-72 shrink-0 space-y-4 pb-12">
          {/* Enrolled Services */}
          <div className="bg-card border border-border rounded-2xl p-4 2xl:p-5">
            <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Enrolled Services &amp; Programs
            </p>
            <div className="space-y-3">
              {enrolledServices.map((s) => (
                <div key={s.org} className="flex items-start gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${s.color} mt-1.5 shrink-0`}
                  />
                  <div>
                    <p className="text-sm 2xl:text-base font-medium text-foreground leading-tight">
                      {s.org}
                    </p>
                    <p className="text-xs 2xl:text-sm text-muted-foreground">
                      {s.program}
                    </p>
                    <p className="text-[10px] 2xl:text-xs text-muted-foreground mt-0.5">
                      Enrolled: {s.enrolled}
                    </p>
                    <p className="text-[10px] 2xl:text-xs text-muted-foreground">
                      Case Manager: {s.caseManager}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Consent */}
          <div className="bg-card border border-border rounded-2xl p-4 2xl:p-5">
            <div className="flex items-center gap-2 mb-2">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <p className="text-sm 2xl:text-base font-semibold text-foreground">
                Privacy &amp; Consent
              </p>
            </div>
            <p className="text-xs 2xl:text-sm text-muted-foreground mb-3">
              You control which information agencies can access. Update your
              consent preferences to manage data sharing.
            </p>
            <button className="w-full px-3 py-2 border border-border rounded-xl text-xs 2xl:text-sm text-foreground font-medium hover:bg-background transition-colors">
              Manage Consent Settings
            </button>
          </div>

          {/* Privacy Protected notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 2xl:p-5">
            <div className="flex items-center gap-2 mb-1">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p className="text-xs 2xl:text-sm font-semibold text-primary">
                Privacy Protected
              </p>
            </div>
            <p className="text-[11px] 2xl:text-xs text-muted-foreground">
              Sensitive fields marked with{" "}
              <span className="font-semibold">⊙</span> require explicit consent
              before editing. All changes are logged for HIPAA audit compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
