"use client";

import TeamDetailsTab from "@/components/teamDetailsTab/TeamDetailsTab";
import useMLBData from "@/hooks/useMLBData";
import { useState } from "react";
import { TeamCode } from "@/types/mlb";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function TeamDetailsPage() {
  const [selectedTeam, setSelectedTeam] = useState<TeamCode | null>(null);
  const { data, summaryData, isLoading } = useMLBData();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <TeamDetailsTab
      summaryData={summaryData}
      selectedTeam={selectedTeam}
      setSelectedTeam={setSelectedTeam}
      data={data}
    />
  );
}
