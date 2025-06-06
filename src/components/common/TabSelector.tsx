"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabSelector: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="tab-selector mb-6 md:mb-0">
      <Link
        href="/overview"
        className={`px-4 py-2 mr-2 rounded ${
          pathname === "/overview" || pathname === "/"
            ? "bg-[#041E42] text-white"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        Overview
      </Link>
      <Link
        href="/efficiency"
        className={`px-4 py-2 mr-2 rounded ${
          pathname === "/efficiency"
            ? "bg-[#041E42] text-white"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        Efficiency Analysis
      </Link>
      <Link
        href="/team-details"
        className={`px-4 py-2 rounded ${
          pathname === "/team-details"
            ? "bg-[#041E42] text-white"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        Team Details
      </Link>
    </div>
  );
};

export default TabSelector;
