// src/components/EfficiencyTab/LeagueFilter.jsx
"use client";
import React from "react";

interface LeagueFilterProps {
  leagueFilter: string;
  setLeagueFilter: (league: string) => void;
  filteredCount: number;
}

const LeagueFilter: React.FC<LeagueFilterProps> = ({
  leagueFilter,
  setLeagueFilter,
  filteredCount,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          className={`px-3 py-1 rounded ${
            leagueFilter === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLeagueFilter("All")}
        >
          All Teams
        </button>
        <button
          className={`px-3 py-1 rounded ${
            leagueFilter === "AL"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLeagueFilter("AL")}
        >
          American League
        </button>
        <button
          className={`px-3 py-1 rounded ${
            leagueFilter === "NL"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLeagueFilter("NL")}
        >
          National League
        </button>
      </div>
      <div className="text-sm text-gray-500">Showing {filteredCount} teams</div>
    </div>
  );
};

export default LeagueFilter;
