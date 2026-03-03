"use client";

export default function ReferralsTab() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            Referrals
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage participant referrals and service connections
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
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Create Referral
        </button>
      </div>

      {/* Active Referrals */}
      <div className="space-y-4">
        {/* Counseling Services Referral */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h4 className="text-base font-semibold text-foreground">
                  Counseling Services
                </h4>
                <span className="px-2.5 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                  Accepted
                </span>
                <span className="px-2.5 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full">
                  High
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-muted-foreground">Agency:</span>
              <span className="text-blue-600 font-medium">
                Mental Health Alliance
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground font-medium">2025-12-01</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              STAFF NOTES
            </p>
            <p className="text-sm text-foreground">
              Participant requested support for anxiety management.
            </p>
          </div>
        </div>

        {/* Food Assistance Referral */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h4 className="text-base font-semibold text-foreground">
                  Food Assistance
                </h4>
                <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-medium rounded-full">
                  Pending
                </span>
                <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-medium rounded-full">
                  Medium
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-muted-foreground">Agency:</span>
              <span className="text-blue-600 font-medium">
                Community Food Bank
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground font-medium">2025-12-10</span>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              STAFF NOTES
            </p>
            <p className="text-sm text-foreground">
              In need of monthly food box delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
