"use client";

import { Button } from "@/components/ui/button";

const Privacy = () => {
  const handleViewPrivacyPolicy = () => {
    // Handle opening privacy policy
    console.log("Opening privacy policy");
  };

  return (
    <div className="space-y-6">
      {/* Data Privacy Header */}
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">
          Data Privacy
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your data privacy is protected under HUD HMIS standards, HIPAA, 42 CFR
          Part 2, and Nevada state regulations.
        </p>
      </div>

      {/* Privacy Features */}
      <div className="space-y-4">
        {/* HIPAA Compliance */}
        <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-foreground mb-1">
                HIPAA Compliance
              </h4>
              <p className="text-sm text-muted-foreground">
                All PHI is encrypted at rest and in transit
              </p>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-foreground mb-1">
                Audit Logs
              </h4>
              <p className="text-sm text-muted-foreground">
                All data access is logged and monitored
              </p>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
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
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-foreground mb-1">
                Data Retention
              </h4>
              <p className="text-sm text-muted-foreground">
                Data is retained according to HUD HMIS requirements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Privacy Policy Button */}
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
        <Button
          onClick={handleViewPrivacyPolicy}
          variant="outline"
          className="w-full rounded-xl py-3 text-sm font-medium border-border hover:bg-card-foreground transition-all flex items-center justify-center gap-2"
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
          View Privacy Policy
        </Button>
      </div>
    </div>
  );
};

export default Privacy;
