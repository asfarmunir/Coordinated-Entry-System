import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const mainMenu = [
  {
    label: "Participants",
    icon: "participant",
    count: 8,
    route: "/",
  },
  { label: "Bulletins", icon: "bulletin", count: 3, route: "/bulletins" },
  {
    label: "Assistance Requests",
    icon: "assistance-request",
    count: 5,
    route: "/assistance",
  },
  { label: "Data Import", icon: "import", route: "/import" },
  { label: "Network Directory", icon: "network", route: "/directory" },
  { label: "Assistance", icon: "assistance" },
  { label: "Appointments", icon: "appointments" },
  { label: "Resources", icon: "resources", route: "/resources" },
  { label: "Referrals", icon: "referrals" },
  { label: "Messages", icon: "messages", count: 33 },
];

const toolsMenu = [
  { label: "Case Managers", icon: "participant", route: "/case-managers" },
  { label: "Analytics", icon: "analytic", route: "/case-managers" },
  { label: "Intake Forms", icon: "form", route: "/case-managers" },
];

const managementMenu = [
  { label: "Agency info", icon: "agency", route: "/agency-info" },
  { label: "help center", icon: "help", route: "/support" },
  { label: "Settings", icon: "settings", route: "/settings" },
];

const Icon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "search":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
      );
    case "link":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 13.5l3-3M7 17a4 4 0 010-5.657l2.343-2.343a4 4 0 015.657 0M17 7a4 4 0 010 5.657l-2.343 2.343a4 4 0 01-5.657 0"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-4-4h-1m-6 6H2v-2a4 4 0 014-4h1m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a3 3 0 10-6 0"
          />
        </svg>
      );
    case "megaphone":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 11L3 8v8l7-3m0-2l9 3V8l-9 3m0 0V4"
          />
        </svg>
      );
    case "hand":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 10v3a5 5 0 005 5h2a5 5 0 005-5v-3m-7-5v6m-4-4v6m8-6v6"
          />
        </svg>
      );
    case "upload":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12"
          />
        </svg>
      );
    case "network":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v4m0 8v4m8-8h-4M8 12H4m12-6l-4 4m0 4l4 4m-8-8l-4-4m0 8l4 4"
          />
        </svg>
      );
    case "lifebuoy":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 4a5 5 0 110 10 5 5 0 010-10zm0 0l3-3m-6 14l-3 3m0-14l3 3m6 8l3 3"
          />
        </svg>
      );
    case "calendar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10m4 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h14a2 2 0 012 2z"
          />
        </svg>
      );
    case "folder":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          />
        </svg>
      );
    case "paper-airplane":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 12l9-9-9 18-2-7-7-2 18-9"
          />
        </svg>
      );
    case "chat":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={className}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h8M8 14h5m9 1a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h11a4 4 0 014 4z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-full md:w-72 lg:w-80 h-full bg-card border border-border rounded-2xl p-4 flex-col overflow-y-auto">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm 2xl:text-base font-semibold text-foreground">
              Userflow Inc.
            </p>
            <p className="text-xs 2xl:text-sm text-muted-foreground">
              FREE PLAN
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2 text-sm 2xl:text-base text-muted-foreground">
            <Icon name="search" className="w-4 h-4" />
            <span>Search</span>
            <span className="ml-auto text-xs 2xl:text-sm">⌘ K</span>
          </div>
        </div>

        <button className="mt-4 w-full flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
            <Icon name="link" className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-sm 2xl:text-base font-semibold">Public Intake</p>
            <p className="text-xs 2xl:text-sm opacity-90">Shareable Links</p>
          </div>
        </button>

        <div className="mt-6">
          <p className="text-[10px] 2xl:text-xs tracking-widest text-muted-foreground font-semibold px-2">
            MAIN MENU
          </p>
          <div className="mt-2 space-y-1">
            {mainMenu.map((item) => (
              <Link
                href={item.route || "#"}
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm 2xl:text-base transition-colors ${
                  pathname === item.route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={`w-4 2xl:w-5 h-4 2xl:h-5  ${pathname === item.route ? " invert brightness-0 filter" : " dark:invert"} `}
                />{" "}
                <span className="flex-1">{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`text-xs 2xl:text-sm px-2 py-0.5 rounded-full ${
                      pathname === item.route
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[10px] 2xl:text-xs tracking-widest text-muted-foreground font-semibold px-2">
            TOOLS
          </p>
          <div className="mt-2 space-y-1">
            {toolsMenu.map((item) => (
              <Link
                href="#"
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm 2xl:text-base transition-colors ${
                  pathname === item.route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={`w-4 2xl:w-5 h-4 2xl:h-5  ${pathname === item.route ? " invert brightness-0 filter" : " dark:invert"} `}
                />{" "}
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="my-6 border-t">
          <div className="mt-2 space-y-1">
            {managementMenu.map((item) => (
              <Link
                href={item.route}
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm 2xl:text-base transition-colors ${
                  pathname === item.route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={`w-4 2xl:w-5 h-4 2xl:h-5  ${pathname === item.route ? " invert brightness-0 filter" : " dark:invert"} `}
                />{" "}
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              CH
            </div>
            <div className="flex-1">
              <p className="text-sm 2xl:text-base font-semibold text-foreground">
                Community Hope
              </p>
              <p className="text-xs 2xl:text-sm text-muted-foreground">
                AGENCY ADMIN
              </p>
            </div>
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
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-card border-r border-border p-4 flex flex-col overflow-y-auto z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-background transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Userflow Inc.
            </p>
            <p className="text-xs text-muted-foreground">FREE PLAN</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2 text-sm text-muted-foreground">
            <Icon name="search" className="w-4 h-4" />
            <span>Search</span>
            <span className="ml-auto text-xs">⌘ K</span>
          </div>
        </div>

        <button className="mt-4 w-full flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-4 py-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
            <Icon name="link" className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">Public Intake</p>
            <p className="text-xs opacity-90">Shareable Links</p>
          </div>
        </button>

        <div className="mt-6">
          <p className="text-[10px] tracking-widest text-muted-foreground font-semibold px-2">
            MAIN MENU
          </p>
          <div className="mt-2 space-y-1">
            {mainMenu.map((item) => (
              <Link
                href={item.route || "#"}
                key={item.label}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  pathname === item.route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={`w-4 2xl:w-5 h-4 2xl:h-5  ${pathname === item.route ? " invert brightness-0 filter" : " dark:invert"} `}
                />
                <span className="flex-1">{item.label}</span>
                {item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      pathname === item.route
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-card text-muted-foreground"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[10px] tracking-widest text-muted-foreground font-semibold px-2">
            TOOLS
          </p>
          <div className="mt-2 space-y-1">
            {toolsMenu.map((item) => (
              <Link
                href={item.route}
                key={item.label}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  pathname === item.route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={`w-4 2xl:w-5 h-4 2xl:h-5   ${pathname === item.route ? " invert brightness-0 filter" : " dark:invert"} `}
                />
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-6 border-t">
          <div className="mt-2 space-y-1">
            {managementMenu.map((item) => (
              <Link
                href={item.route}
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  pathname === item.route
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-background"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={16}
                  height={16}
                  className={`w-4 2xl:w-5 h-4 2xl:h-5  ${pathname === item.route ? " invert brightness-0 filter" : " dark:invert"} `}
                />{" "}
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              CH
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                Community Hope
              </p>
              <p className="text-xs text-muted-foreground">AGENCY ADMIN</p>
            </div>
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
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
