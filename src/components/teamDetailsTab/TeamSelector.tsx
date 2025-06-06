// src/components/TeamDetailsTab/TeamSelector.jsx
"use client";
import React from "react";
import { getTeamColor } from "@/utils/teamColors";
import { TeamCode } from "@/types/mlb";

interface TeamSummary {
  team: string;
  teamCode: TeamCode;
}

interface TeamOption {
  code: TeamCode;
  name: string;
  color: string;
}

interface TeamSelectorProps {
  summaryData: TeamSummary[];
  selectedTeam: TeamCode | null;
  setSelectedTeam: (team: TeamCode) => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  summaryData,
  selectedTeam,
  setSelectedTeam,
}) => {
  const teamOptions: TeamOption[] = summaryData
    .sort((a, b) => a.team.localeCompare(b.team))
    .map((team) => ({
      code: team.teamCode,
      name: team.team,
      color: getTeamColor(team.teamCode),
    }));

  return (
    <div className="flex justify-center mb-4">
      <select
        className="border rounded px-4 py-2 bg-white"
        value={selectedTeam || ""}
        onChange={(e) => setSelectedTeam(e.target.value as TeamCode)}
        style={{ minWidth: "250px" }}
      >
        <option value="">Select a team</option>
        {teamOptions.map((team) => (
          <option
            key={team.code}
            value={team.code}
            style={{ color: team.color, fontWeight: "bold" }}
          >
            {team.code} - {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeamSelector;
