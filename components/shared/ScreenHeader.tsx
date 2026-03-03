import Link from "next/link";
import React from "react";

interface ScreenHeaderProps {
  title: string;
  description: string;
}

const ScreenHeader = ({ title, description }: ScreenHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
      <div className="">
        <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-foreground mb-1">
          {title}
        </h1>
        <p className="text-xs md:text-sm 2xl:text-base text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <Link href={"/support"}>
          <button className="hidden md:flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl border border-primary text-primary dark:text-blue-400 hover:bg-primary/10 transition-colors">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="font-medium text-sm 2xl:text-base">
              Help & Support
            </span>
          </button>
        </Link>

        <button className="p-2 hidden lg:flex rounded-xl border border-border text-muted-foreground hover:bg-background transition-colors">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-card rounded-xl">
          <span className="text-sm 2xl:text-base font-medium text-foreground">
            Program Manager
          </span>
          <div className="text-xs 2xl:text-sm text-muted-foreground">
            Hope Housing Services
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenHeader;
