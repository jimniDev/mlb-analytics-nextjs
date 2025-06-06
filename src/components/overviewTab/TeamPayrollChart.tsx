// src/components/OverviewTab/TeamPayrollChart.jsx
"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { formatMoney } from "../../utils/formatters";
import { getTeamLogo } from "@/utils/teamColors";
import { ProcessedMLBData } from "@/types/mlb";

interface TeamPayrollChartProps {
  yearlyData: { [year: number]: ProcessedMLBData[] };
  availableYears: number[];
}

// Custom tooltip component with team logo
const CustomTooltip = ({ active, payload, label, chartData }: any) => {
  if (active && payload && payload.length) {
    const team = chartData.find((item: any) => item.Team === label);

    return (
      <div className="custom-tooltip bg-white p-3 border border-gray-200 shadow-sm rounded">
        <div className="flex items-center mb-1">
          <img
            src={getTeamLogo(team?.Team)}
            alt={`${team?.["Team Name"]} logo`}
            className="w-6 h-6 object-contain mr-2"
          />
          <p className="font-bold">{team?.["Team Name"]}</p>
        </div>
        <p className="text-sm">
          Total Payroll: {formatMoney(payload[0].value)}
        </p>
        <p className="text-sm text-gray-500">
          {team?.["League (National or American)"]}
        </p>
      </div>
    );
  }
  return null;
};

const TeamPayrollChart: React.FC<TeamPayrollChartProps> = ({
  yearlyData,
  availableYears,
}) => {
  // Add local year state with default to latest year
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[availableYears.length - 1]
  );

  const data: ProcessedMLBData[] = yearlyData[selectedYear] || [];
  const sortedData = [...data].sort(
    (a, b) => b["Total Payroll Allocation"] - a["Total Payroll Allocation"]
  );
  const chartData = sortedData.slice(0, 15); // Top 15 teams

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-700">Team Payrolls</h3>
        <div>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
              stroke="#666"
            />
            <YAxis
              type="category"
              dataKey="Team"
              tick={{ fontSize: 12 }}
              width={40}
              stroke="#666"
            />
            <Tooltip
              content={
                <CustomTooltip
                  chartData={chartData}
                  selectedYear={selectedYear}
                />
              }
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
            />
            <Bar dataKey="Total Payroll Allocation" name="Total Payroll">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry["League (National or American)"] === "AL"
                      ? "#4e79a7"
                      : "#f28e2c"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        <span className="inline-block mr-3">
          <span
            className="inline-block w-3 h-3 mr-1"
            style={{ backgroundColor: "#4e79a7" }}
          ></span>
          American League
        </span>
        <span className="inline-block">
          <span
            className="inline-block w-3 h-3 mr-1"
            style={{ backgroundColor: "#f28e2c" }}
          ></span>
          National League
        </span>
      </div>
    </div>
  );
};

export default TeamPayrollChart;
