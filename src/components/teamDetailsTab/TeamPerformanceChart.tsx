// src/components/TeamDetailsTab/TeamPerformanceChart.jsx
"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getTeamColor } from "@/utils/teamColors";
import { TeamSummary } from "@/types/mlb";

interface TeamPerformanceChartProps {
  teamData: TeamSummary;
}

const TeamPerformanceChart: React.FC<TeamPerformanceChartProps> = ({
  teamData,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="text-lg font-medium mb-4 text-gray-700">
        Performance Over Time
      </h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={teamData.payrollHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: number, name: string) => [
                name === "payroll"
                  ? `$${(value / 1000000).toFixed(1)}M`
                  : value,
                name === "payroll" ? "Payroll" : "Wins",
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="payroll"
              stroke="#8884d8"
              name="Payroll"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="wins"
              stroke="#82ca9d"
              name="Wins"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamPerformanceChart;
