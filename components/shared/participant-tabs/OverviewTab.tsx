"use client";

import React from "react";

interface OverviewTabProps {
  children: React.ReactNode;
}

const OverviewTab = ({ children }: OverviewTabProps) => {
  return <div className="space-y-6">{children}</div>;
};

export default OverviewTab;
