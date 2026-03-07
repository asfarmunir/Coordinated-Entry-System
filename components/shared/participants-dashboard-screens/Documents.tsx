"use client";

import { useState, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// ── Types ─────────────────────────────────────────────────────────────────────
type DocCategory =
  | "Identification"
  | "Financial"
  | "Housing"
  | "Medical"
  | "Employment"
  | "Other";
type DocStatus = "Verified" | "Pending Review" | "Rejected";

interface Doc {
  id: string;
  name: string;
  category: DocCategory;
  size: string;
  uploadedOn: string;
  status: DocStatus;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_DOCS: Doc[] = [
  {
    id: "1",
    name: "Social Security Card.pdf",
    category: "Identification",
    size: "245 KB",
    uploadedOn: "11/1/2025",
    status: "Verified",
  },
  {
    id: "2",
    name: "Proof of Income.pdf",
    category: "Financial",
    size: "180 KB",
    uploadedOn: "11/5/2025",
    status: "Verified",
  },
  {
    id: "3",
    name: "Housing Application.pdf",
    category: "Housing",
    size: "320 KB",
    uploadedOn: "11/8/2025",
    status: "Pending Review",
  },
  {
    id: "4",
    name: "Medical Records.pdf",
    category: "Medical",
    size: "1.2 MB",
    uploadedOn: "11/10/2025",
    status: "Verified",
  },
  {
    id: "5",
    name: "Birth Certificate.jpg",
    category: "Identification",
    size: "990 KB",
    uploadedOn: "11/12/2025",
    status: "Pending Review",
  },
];

const CATEGORIES: DocCategory[] = [
  "Identification",
  "Financial",
  "Housing",
  "Medical",
  "Employment",
  "Other",
];

// ── Style maps ────────────────────────────────────────────────────────────────
const categoryColor: Record<DocCategory, string> = {
  Identification:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Financial:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Housing:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Medical: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  Employment:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Other: "bg-muted text-muted-foreground",
};

const statusStyle: Record<
  DocStatus,
  { cls: string; dot: string; label: string }
> = {
  Verified: {
    cls: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    label: "Verified",
  },
  "Pending Review": {
    cls: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    label: "Pending Review",
  },
  Rejected: {
    cls: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
    label: "Rejected",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const Documents = () => {
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<"All" | DocCategory>("All");
  const [docType, setDocType] = useState<DocCategory | "">("");

  const [step, setStep] = useState<1 | 2>(1);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = docs.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCat === "All" || d.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const stats = {
    total: docs.length,
    verified: docs.filter((d) => d.status === "Verified").length,
    review: docs.filter((d) => d.status === "Pending Review").length,
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (!docType || !uploadedFile) return;
    const newDoc: Doc = {
      id: Date.now().toString(),
      name: uploadedFile.name,
      category: docType,
      size:
        uploadedFile.size > 1_000_000
          ? `${(uploadedFile.size / 1_048_576).toFixed(1)} MB`
          : `${Math.round(uploadedFile.size / 1024)} KB`,
      uploadedOn: new Date().toLocaleDateString("en-US"),
      status: "Pending Review",
    };
    setDocs((prev) => [newDoc, ...prev]);
    setDocType("");
    setUploadedFile(null);
    setStep(1);
  };

  const handleDelete = (id: string) =>
    setDocs((prev) => prev.filter((d) => d.id !== id));

  return (
    <div className="w-full bg-background px-4 md:px-6 2xl:px-8 py-5 2xl:py-7">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl 2xl:text-2xl font-bold text-foreground">
            Documentation
          </h1>
          <p className="text-xs 2xl:text-sm text-muted-foreground mt-0.5">
            Manage documents required for your housing assistance
          </p>
        </div>
        <button
          onClick={() => {
            setStep(1);
            fileInputRef.current?.click();
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs 2xl:text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Add New Document
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 2xl:gap-4 mb-6">
        {/* Total */}
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
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
          </div>
          <div>
            <p className="text-2xl 2xl:text-3xl font-bold text-foreground">
              {stats.total}
            </p>
            <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Total Documents
            </p>
          </div>
        </div>
        {/* Verified */}
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
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
            <p className="text-2xl 2xl:text-3xl font-bold text-foreground">
              {stats.verified}
            </p>
            <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Verified Items
            </p>
          </div>
        </div>
        {/* In Review */}
        <div className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400"
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
            <p className="text-2xl 2xl:text-3xl font-bold text-foreground">
              {stats.review}
            </p>
            <p className="text-[10px] 2xl:text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              In Review
            </p>
          </div>
        </div>
      </div>

      {/* ── New Document Submission ── */}
      <div className="bg-card border border-border rounded-2xl mb-5 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <p className="text-sm 2xl:text-base font-semibold text-foreground">
            New Document Submission
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Step 1: Select type */}
          <div className="p-5 2xl:p-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                1
              </span>
              <p className="text-sm 2xl:text-base font-semibold text-foreground">
                Select Document Type
              </p>
            </div>
            <p className="text-xs 2xl:text-sm text-muted-foreground mb-4 ml-8">
              Choose the category that best fits your document to ensure faster
              processing by the case management team.
            </p>

            {/* Document Type Dropdown */}
            <div className="ml-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center justify-between px-3 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <span
                      className={
                        docType ? "text-foreground" : "text-muted-foreground"
                      }
                    >
                      {docType || "Choose a document type..."}
                    </span>
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
                  {CATEGORIES.map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => {
                        setDocType(cat);
                        setStep(2);
                      }}
                      className={
                        docType === cat
                          ? "text-primary font-medium bg-primary/10 focus:bg-primary/10 focus:text-primary"
                          : ""
                      }
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Step 2: Upload */}
          <div className="p-5 2xl:p-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                2
              </span>
              <p
                className={`text-sm 2xl:text-base font-semibold ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}
              >
                Upload Document
              </p>
            </div>

            <div className="ml-8 mt-3">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />

              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  if (docType) setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  if (!docType) return;
                  handleFileChange(e.dataTransfer.files[0] ?? null);
                }}
                onClick={() => {
                  if (docType) fileInputRef.current?.click();
                }}
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-8 transition-colors
                  ${!docType ? "opacity-50 cursor-not-allowed border-border" : dragOver ? "border-primary bg-primary/5 cursor-pointer" : "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"}`}
              >
                {uploadedFile ? (
                  <>
                    <svg
                      className="w-8 h-8 text-emerald-500 mb-2"
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
                    <p className="text-sm font-medium text-foreground">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 text-muted-foreground mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <p className="text-sm font-medium text-foreground">
                      {docType
                        ? "Click or drag to upload"
                        : "Select a type to enable upload"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      PDF, PNG, or JPG (Max 10MB)
                    </p>
                  </>
                )}
              </div>

              {/* Submit */}
              {uploadedFile && docType && (
                <button
                  onClick={handleSubmit}
                  className="mt-3 w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Submit Document
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Review Timeline banner ── */}
      <div className="border border-amber-200 dark:border-amber-800 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/10 rounded-2xl px-5 py-4 mb-5">
        <div className="flex items-center gap-2 mb-1">
          <svg
            className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0"
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
          <p className="text-[10px] 2xl:text-xs font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400">
            Review Timeline
          </p>
        </div>
        <p className="text-xs 2xl:text-sm text-amber-700/80 dark:text-amber-400/80 mb-3">
          Documents marked as &quot;Pending Review&quot; are being verified by
          staff for HUD compliance. This typically takes 1–2 business days.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="flex items-center gap-1.5 text-[10px] 2xl:text-xs font-semibold text-amber-600 dark:text-amber-400">
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
            PENDING: UNDER REVIEW
          </span>
          <span className="flex items-center gap-1.5 text-[10px] 2xl:text-xs font-semibold text-emerald-600 dark:text-emerald-400">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            VERIFIED: READY TO USE
          </span>
          <span className="flex items-center gap-1.5 text-[10px] 2xl:text-xs font-semibold text-red-600 dark:text-red-400">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            REJECTED: RE-UPLOAD NEEDED
          </span>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <div className="relative flex-1 bg-card pl-8  border border-border rounded-xl">
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
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
            placeholder="Search documents by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-4 py-2.5  text-xs 2xl:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2.5 bg-card border border-border rounded-xl text-xs 2xl:text-sm text-foreground hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0">
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              <span
                className={
                  filterCat !== "All" ? "text-primary font-medium" : ""
                }
              >
                {filterCat === "All" ? "All Categories" : filterCat}
              </span>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {(["All", ...CATEGORIES] as ("All" | DocCategory)[]).map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`flex items-center justify-between ${
                  filterCat === cat
                    ? "text-primary font-medium focus:text-primary"
                    : ""
                }`}
              >
                {cat === "All" ? "All Categories" : cat}
                {filterCat === cat && (
                  <svg
                    className="w-3.5 h-3.5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Document Library ── */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <p className="text-[10px] 2xl:text-xs font-bold tracking-widest uppercase text-muted-foreground">
            Document Library
          </p>
          <p className="text-xs 2xl:text-sm text-muted-foreground">
            {filtered.length} total
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <svg
              className="w-12 h-12 text-muted-foreground/40 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm font-medium text-foreground mb-1">
              No documents found
            </p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((doc) => {
              const s = statusStyle[doc.status];
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-background transition-colors group"
                >
                  {/* File icon */}
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  {/* Name + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm 2xl:text-base font-medium text-foreground truncate">
                      {doc.name}
                    </p>
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-0.5">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${categoryColor[doc.category]}`}
                      >
                        {doc.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {doc.size}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Uploaded {doc.uploadedOn}
                      </span>
                    </div>
                  </div>

                  {/* Status + actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`hidden sm:flex items-center gap-1.5 text-xs 2xl:text-sm font-medium ${s.cls}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="Preview"
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
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        title="Download"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                        title="Delete"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
