"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clearUserRole } from "@/lib/userRole";

const BASE = "/participant-screen";

const mainMenu = [
  { label: "Dashboard", route: `${BASE}`, icon: "dashboard" },
  { label: "My Profile", route: `${BASE}/profile`, icon: "profile" },
  { label: "Messages", route: `${BASE}/messages`, icon: "messages", count: 3 },
  { label: "Documents", route: `${BASE}/documents`, icon: "documents" },
];

const servicesMenu = [
  { label: "Services", route: `${BASE}/services`, icon: "services", count: 12 },
  {
    label: "Appointments",
    route: `${BASE}/appointments`,
    icon: "appointments",
    count: 2,
  },
];

const bottomMenu = [
  { label: "Privacy & Consent", route: `${BASE}/privacy`, icon: "privacy" },
  {
    label: "Info Requests",
    route: `${BASE}/info-requests`,
    icon: "info-requests",
  },
  { label: "Help Center", route: `${BASE}/help`, icon: "help" },
  { label: "Settings", route: `${BASE}/settings`, icon: "settings" },
];

// ── Inline SVG icons (no external files needed) ──────────────────────────────
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
    case "dashboard":
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
            d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
        </svg>
      );
    case "profile":
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case "messages":
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
    case "documents":
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
    case "services":
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "appointments":
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "privacy":
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    case "info-requests":
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      );
    case "help":
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case "settings":
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    default:
      return null;
  }
};

// ── Shared nav link ───────────────────────────────────────────────────────────
const NavLink = ({
  href,
  active,
  icon,
  label,
  count,
  onClick,
  size = "base",
}: {
  href: string;
  active: boolean;
  icon: string;
  label: string;
  count?: number;
  onClick?: () => void;
  size?: "base" | "sm";
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
      size === "sm" ? "text-sm" : "text-sm 2xl:text-base"
    } ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-background"
    }`}
  >
    <Icon
      name={icon}
      className={`w-4 h-4 2xl:w-5 2xl:h-5 shrink-0 ${active ? "stroke-primary-foreground" : ""}`}
    />
    <span className="flex-1">{label}</span>
    {count !== undefined && (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-card text-muted-foreground"
        }`}
      >
        {count}
      </span>
    )}
  </Link>
);

// ── Sidebar inner content (shared between desktop + mobile) ───────────────────
const SidebarContent = ({
  pathname,
  onClose,
  size = "base",
}: {
  pathname: string;
  onClose?: () => void;
  size?: "base" | "sm";
}) => (
  <>
    {/* Logo */}
    <div className="flex items-center gap-3 pb-4 border-b border-border">
      <Image src="/logo.png" alt="Logo" width={48} height={48} />
      <p
        className={`font-semibold text-foreground ${size === "sm" ? "text-sm -ml-2" : "text-sm 2xl:text-base"}`}
      >
        Coordinated Entry Network
      </p>
    </div>

    {/* Search */}
    <div className="mt-4">
      <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2 text-sm text-muted-foreground">
        <Icon name="search" className="w-4 h-4 shrink-0" />
        <span>Search</span>
        <span className="ml-auto text-xs">⌘ K</span>
      </div>
    </div>

    {/* Main Menu */}
    <div className="mt-6">
      <p className="text-[10px] 2xl:text-xs tracking-widest text-muted-foreground font-semibold px-2 uppercase">
        Main Menu
      </p>
      <div className="mt-2 space-y-1">
        {mainMenu.map((item) => (
          <NavLink
            key={item.label}
            href={item.route}
            active={pathname === item.route}
            icon={item.icon}
            label={item.label}
            count={item.count}
            onClick={onClose}
            size={size}
          />
        ))}
      </div>
    </div>

    {/* My Services */}
    <div className="mt-6">
      <p className="text-[10px] 2xl:text-xs tracking-widest text-muted-foreground font-semibold px-2 uppercase">
        My Services
      </p>
      <div className="mt-2 space-y-1">
        {/* Request Service CTA */}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm 2xl:text-base font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4 2xl:w-5 2xl:h-5 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="flex-1 text-left">Request Service</span>
        </button>
        {servicesMenu.map((item) => (
          <NavLink
            key={item.label}
            href={item.route}
            active={pathname === item.route}
            icon={item.icon}
            label={item.label}
            count={item.count}
            onClick={onClose}
            size={size}
          />
        ))}
      </div>
    </div>

    {/* Bottom section */}
    <div className="my-6 border-t border-border">
      <div className="mt-2 space-y-1">
        {bottomMenu.map((item) => (
          <NavLink
            key={item.label}
            href={item.route}
            active={pathname === item.route}
            icon={item.icon}
            label={item.label}
            onClick={onClose}
            size={size}
          />
        ))}
      </div>
    </div>

    {/* User footer */}
    <div className="mt-auto pt-4 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
          SJ
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-foreground truncate ${size === "sm" ? "text-sm" : "text-sm 2xl:text-base"}`}
          >
            Sarah Johnson
          </p>
          <p
            className={`text-muted-foreground ${size === "sm" ? "text-xs" : "text-xs 2xl:text-sm"}`}
          >
            PT-2001
          </p>
        </div>
        <Link href="/login?tab=participant" onClick={clearUserRole}>
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </Link>
      </div>
    </div>
  </>
);

// ── Main export ───────────────────────────────────────────────────────────────
const ParticipantSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-full md:w-72 lg:w-80 h-full bg-card border border-border rounded-2xl p-4 flex-col overflow-y-auto">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-card border-r border-border p-4 flex flex-col overflow-y-auto z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
        <SidebarContent pathname={pathname} onClose={onClose} size="sm" />
      </aside>
    </>
  );
};

export default ParticipantSidebar;
