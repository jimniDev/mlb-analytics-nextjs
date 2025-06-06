// src/components/TeamDetailsTab/TeamHeader.jsx
"use client";
import React from "react";
import { TeamSummary, TeamCode } from "@/types/mlb";
import { getTeamLogo } from "@/utils/teamColors";

interface TeamHeaderProps {
  teamData: TeamSummary;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ teamData }) => {
  return (
    <div className="bg-white p-6 rounded shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src={getTeamLogo(teamData.teamCode as TeamCode)}
          alt={teamData.team}
          className="w-16 h-16"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{teamData.team}</h2>
          <p className="text-gray-600">
            {teamData.league} League - {teamData.division}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
