"use client";

import React from "react";

const AssistanceTab = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Add Assistance Button */}
      <div className="flex items-center justify-between">
        <div></div>
        <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Assistance
        </button>
      </div>

      {/* Active Assistance */}
      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              food Assistance
            </h3>
            <span className="px-3 py-1 bg-[#d1fae5] text-[#065f46] text-sm font-semibold rounded-full">
              Active
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>Current Agency</span>
          </div>
          <div className="text-sm text-foreground">
            <span className="font-medium">Start:</span> 2026-02-02
          </div>
        </div>
      </div>

      {/* Past Assistance */}
      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
          Past Assistance
        </h3>

        <div className="space-y-3">
          {/* Past Assistance Item 1 */}
          <div className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Emergency Housing
                </h4>
                <span className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                  Completed
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Provider: Nonprofit Resource Group</div>
              <div>Duration: 2025-12-01 to 2026-01-15</div>
            </div>
          </div>

          {/* Past Assistance Item 2 */}
          <div className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Medical Services
                </h4>
                <span className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                  Completed
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Provider: Community Health Center</div>
              <div>Duration: 2025-11-10 to 2025-12-20</div>
            </div>
          </div>

          {/* Past Assistance Item 3 */}
          <div className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Job Training Program
                </h4>
                <span className="px-2.5 py-0.5 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                  Completed
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Provider: Workforce Development Center</div>
              <div>Duration: 2025-09-01 to 2025-10-31</div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistance Summary */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Assistance Summary
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-xs text-muted-foreground mt-1">
              Total Services
            </div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-[#10b981]">1</div>
            <div className="text-xs text-muted-foreground mt-1">Active</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-xl">
            <div className="text-2xl font-bold text-muted-foreground">3</div>
            <div className="text-xs text-muted-foreground mt-1">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistanceTab;
