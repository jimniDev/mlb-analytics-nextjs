// src/components/TeamDetailsTab/TeamDetailsTab.jsx
"use client";
import React from "react";
import TeamSelector from "./TeamSelector";
import TeamHeader from "./TeamHeader";
import TeamPerformanceChart from "./TeamPerformanceChart";
import TeamEfficiencyChart from "./TeamEfficiencyChart";
import SpendingRankChart from "./SpendingRankChart";
import EfficiencySummary from "./EfficiencySummary";
import { TeamSummary, TeamCode } from "@/types/mlb";

interface TeamData {
  team: string;
  teamCode: TeamCode;
  league: string;
  division: string;
  latestYear: number;
  latestPayroll: number;
  latestWins: number;
  latestCostPerWin: number;
  avgPayroll: number;
  avgWins: number;
  avgCostPerWin: number;
  postseasonAppearances: number;
  worldSeriesWins: number;
  avgOPS: number;
  avgERA: number;
  payrollHistory: {
    year: number;
    payroll: number;
    wins: number;
    costPerWin: number;
    madePostseason: boolean;
  }[];
}

interface TeamDetailsTabProps {
  summaryData: TeamSummary[];
  selectedTeam: TeamCode | null;
  setSelectedTeam: (team: TeamCode | null) => void;
  data: any; // TODO: Define proper type for data
}

const TeamDetailsTab: React.FC<TeamDetailsTabProps> = ({
  summaryData,
  selectedTeam,
  setSelectedTeam,
  data,
}) => {
  const selectedTeamData = summaryData.find(
    (team) => team.teamCode === selectedTeam
  );

  return (
    <div className="space-y-6">
      <TeamSelector
        summaryData={summaryData}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />

      {selectedTeamData && (
        <div>
          <TeamHeader teamData={selectedTeamData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamPerformanceChart teamData={selectedTeamData} />
            <TeamEfficiencyChart teamData={selectedTeamData} />
            <SpendingRankChart teamData={selectedTeamData} allData={data} />
            <EfficiencySummary
              teamData={selectedTeamData}
              summaryData={summaryData}
            />
            {/* <TeamPayrollChart teamData={selectedTeamData} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetailsTab;
