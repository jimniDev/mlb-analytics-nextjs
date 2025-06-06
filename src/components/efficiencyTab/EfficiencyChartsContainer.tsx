// src/components/EfficiencyTab/EfficiencyChartsContainer.jsx
"use client";
import React, { useState } from "react";
import SpendingEfficiencyChart from "./SpendingEfficiencyChart";
import EfficiencyStats from "./EfficiencyStats";
import _ from "lodash";
import { TeamSummary } from "@/types/mlb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EfficiencyChartsContainerProps {
  summaryData: TeamSummary[];
}

const EfficiencyChartsContainer: React.FC<EfficiencyChartsContainerProps> = ({
  summaryData,
}) => {
  // Local filter for the two components we want to control together
  const [leagueFilter, setLeagueFilter] = useState<string>("All");

  // Filter by league if needed
  const filteredData =
    leagueFilter === "All"
      ? summaryData
      : summaryData.filter((team) => team.league === leagueFilter);

  // Sort by cost efficiency
  const sortedTeams = [...filteredData].sort(
    (a, b) => a.avgCostPerWin - b.avgCostPerWin
  );

  // Calculate efficiency stats
  const avgLeaguePayroll = _.meanBy(filteredData, "avgPayroll") / 1000000;
  const avgLeagueWins = _.meanBy(filteredData, "avgWins");
  const avgLeagueCostPerWin = _.meanBy(filteredData, "avgCostPerWin") / 1000000;

  const leagueData = _.chain(summaryData)
    .groupBy("league")
    .map((teams: TeamSummary[], league: string) => ({
      league,
      avgCostPerWin: _.meanBy(teams, "avgCostPerWin"),
      avgPayroll: _.meanBy(teams, "avgPayroll"),
      avgWins: _.meanBy(teams, "avgWins"),
    }))
    .value();

  const divisionData = _.chain(summaryData)
    .groupBy("division")
    .map((teams: TeamSummary[], division: string) => ({
      division,
      avgCostPerWin: _.meanBy(teams, "avgCostPerWin"),
      avgPayroll: _.meanBy(teams, "avgPayroll"),
      avgWins: _.meanBy(teams, "avgWins"),
    }))
    .value();

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">
          Cost per Win Analysis
        </h3>

        {/* League filter buttons */}
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 mr-1 rounded ${
              leagueFilter === "All"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setLeagueFilter("All")}
          >
            All Teams
          </button>
          <button
            className={`px-4 py-2 mr-1 rounded ${
              leagueFilter === "AL"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setLeagueFilter("AL")}
          >
            American League
          </button>
          <button
            className={`px-4 py-2 mr-1 rounded ${
              leagueFilter === "NL"
                ? "bg-gray-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setLeagueFilter("NL")}
          >
            National League
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <p>Showing {filteredData.length} teams</p>
      </div>

      {/* Grid for the two charts we want to control together */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-4">
        <div className="lg:col-span-7">
          <SpendingEfficiencyChart
            sortedTeams={sortedTeams}
            avgLeagueCostPerWin={avgLeagueCostPerWin}
          />
        </div>
        <div className="lg:col-span-3">
          <EfficiencyStats
            avgLeaguePayroll={avgLeaguePayroll}
            avgLeagueWins={avgLeagueWins}
            avgLeagueCostPerWin={avgLeagueCostPerWin}
            sortedTeams={sortedTeams}
          />
        </div>
      </div>
    </div>
  );
};

export default EfficiencyChartsContainer;
