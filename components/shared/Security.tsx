"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const Security = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      device: "Chrome on Windows",
      location: "San Francisco, CA",
      lastActive: "Just now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
  ]);

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Handle 2FA toggle logic here
    console.log("Toggling 2FA:", !twoFactorEnabled);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    // Handle session revocation logic here
    console.log("Revoking session:", sessionId);
  };

  const handleSignOutAllOthers = () => {
    setSessions((prev) => prev.filter((session) => session.isCurrent));
    // Handle sign out all other sessions logic here
    console.log("Signing out all other sessions");
  };

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
          Two-Factor Authentication
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add an extra layer of security to your account by enabling two-factor
          authentication.
        </p>
        <Button
          onClick={handleToggleTwoFactor}
          variant={twoFactorEnabled ? "default" : "outline"}
          className={`rounded-xl px-6 py-2 text-sm font-medium transition-all ${
            twoFactorEnabled
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "border-border hover:bg-card-foreground"
          }`}
        >
          {twoFactorEnabled ? "Enabled" : "Disabled"}
        </Button>
      </div>

      {/* Active Sessions */}
      <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-6">
          Active Sessions
        </h3>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center flex-shrink-0 border border-border">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">
                      {session.device}
                    </p>
                    {session.isCurrent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.location} • Last active: {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.isCurrent && (
                <Button
                  onClick={() => handleRevokeSession(session.id)}
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs px-4 py-2 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all flex-shrink-0"
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Sign Out All Other Sessions */}
        {sessions.filter((s) => !s.isCurrent).length > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button
              onClick={handleSignOutAllOthers}
              variant="outline"
              className="w-full rounded-xl py-3 text-sm font-medium border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all"
            >
              Sign Out All Other Sessions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Security;
