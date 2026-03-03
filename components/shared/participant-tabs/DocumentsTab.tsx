"use client";

import React from "react";

const DocumentsTab = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            Participant Documents
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage and review participant documents
          </p>
        </div>
        <button className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Upload Document
        </button>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {/* Document 1 - ID Card Front - Approved */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Document Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Document Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-foreground truncate">
                    ID_Card_Front.jpg
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-xs font-medium rounded">
                      Identification
                    </span>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs font-medium rounded">
                      Approved
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>image/jpeg</span>
                <span>•</span>
                <span>1.2 MB</span>
                <span>•</span>
                <span>Uploaded 2025-12-15</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Uploaded by: Jason Scott
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border text-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
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
                  View
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border text-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
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
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document 2 - Rental Agreement - Pending Review */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Document Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Document Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-foreground truncate">
                    Rental_Agreement.pdf
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-xs font-medium rounded">
                      Housing
                    </span>
                    <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-600 text-xs font-medium rounded">
                      Pending Review
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>application/pdf</span>
                <span>•</span>
                <span>2.5 MB</span>
                <span>•</span>
                <span>Uploaded 2025-12-16</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Uploaded by: Jason Scott
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border text-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
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
                  View
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border text-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
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
                  Download
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2">
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
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;
