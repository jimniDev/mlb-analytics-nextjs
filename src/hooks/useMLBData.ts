// src/hooks/useMLBData.ts
"use client";

import { useState, useEffect } from "react";
import _ from "lodash";
import {
  MLBTeamData,
  ProcessedMLBData,
  TeamSummary,
  YearlyData,
  TeamCode,
} from "@/types/mlb";
import mlbData from "@/data/mlb_data.json";

interface UseMLBDataReturn {
  data: ProcessedMLBData[];
  summaryData: TeamSummary[];
  yearlyData: YearlyData;
  availableYears: number[];
  isLoading: boolean;
}

const useMLBData = (): UseMLBDataReturn => {
  const [data, setData] = useState<ProcessedMLBData[]>([]);
  const [summaryData, setSummaryData] = useState<TeamSummary[]>([]);
  const [yearlyData, setYearlyData] = useState<YearlyData>({});
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Type assertion for the imported data
      const rawData = mlbData as MLBTeamData[];

      // Process the imported data directly
      const processedData: ProcessedMLBData[] = rawData.map((row) => ({
        ...row,
        "Cost per Win": row["Total Payroll Allocation"] / row["Wins"],
        "Payroll (Millions)": row["Total Payroll Allocation"] / 1000000,
        "Cost per Win (Millions)":
          row["Total Payroll Allocation"] / row["Wins"] / 1000000,
        "Made Postseason": row["Postseason (Yes/No)"] === "Y",
        "Won World Series": row["Won World Series (Yes/No)"] === "Y",
      }));

      // Get available years
      const years = [...new Set(processedData.map((row) => row.Year))].sort();
      setAvailableYears(years);

      // Group data by year
      const dataByYear = _.groupBy(processedData, "Year");
      setYearlyData(dataByYear);

      // Calculate team averages across years
      const teams = [...new Set(processedData.map((row) => row["Team Name"]))];
      const teamSummaries: TeamSummary[] = teams.map((team) => {
        const teamData = processedData.filter(
          (row) => row["Team Name"] === team
        );
        const latestYear = Math.max(...teamData.map((row) => row.Year));
        const latestData = teamData.find((row) => row.Year === latestYear)!;

        return {
          team: team,
          teamCode: latestData.Team as TeamCode,
          league: latestData["League (National or American)"],
          division: latestData.Divison,
          latestYear: latestYear,
          latestPayroll: latestData["Total Payroll Allocation"],
          latestWins: latestData.Wins,
          latestCostPerWin: latestData["Cost per Win"],
          avgPayroll: _.meanBy(teamData, "Total Payroll Allocation"),
          avgWins: _.meanBy(teamData, "Wins"),
          avgCostPerWin: _.meanBy(teamData, "Cost per Win"),
          postseasonAppearances: teamData.filter(
            (row) => row["Made Postseason"]
          ).length,
          worldSeriesWins: teamData.filter((row) => row["Won World Series"])
            .length,
          avgOPS: _.meanBy(teamData, "On-Base+Slugging Percentage"),
          avgERA: _.meanBy(teamData, "Earned Run Average"),
          payrollHistory: teamData
            .map((row) => ({
              year: row.Year,
              payroll: row["Total Payroll Allocation"] / 1000000,
              wins: row.Wins,
              costPerWin: row["Cost per Win"] / 1000000,
              madePostseason: row["Made Postseason"],
            }))
            .sort((a, b) => a.year - b.year),
        };
      });

      setSummaryData(teamSummaries);
      setData(processedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error processing data:", error);
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    summaryData,
    yearlyData,
    availableYears,
    isLoading,
  };
};

export default useMLBData;
