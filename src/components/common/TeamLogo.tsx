"use client";
import React from "react";
import Image from "next/image";
import { getTeamColor, getTeamLogo } from "@/utils/teamColors";
import { TeamCode } from "@/types/mlb";

interface TeamLogoProps {
  teamCode: TeamCode;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ teamCode }) => {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: getTeamColor(teamCode) }}
    >
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
        <Image
          src={getTeamLogo(teamCode)}
          alt={`${teamCode} logo`}
          width={36}
          height={36}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default TeamLogo;
