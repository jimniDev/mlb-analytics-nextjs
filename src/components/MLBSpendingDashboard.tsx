// src/components/MLBSpendingDashboard.tsx
"use client";

import React, { useState } from "react";
import { TeamCode } from "@/types/mlb";
import TabSelector from "./common/TabSelector";
import DashboardHeader from "./common/DashboardHeader";
import DashboardFooter from "./common/DashboardFooter";
import LoadingIndicator from "./common/LoadingIndicator";
import OverviewTab from "./overviewTab/OverviewTab";
import EfficiencyTab from "./efficiencyTab/EfficiencyTab";
import TeamDetailsTab from "./teamDetailsTab/TeamDetailsTab";
import useMLBData from "@/hooks/useMLBData";

const MLBSpendingDashboard: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamCode | null>(null);
  const { data, summaryData, yearlyData, isLoading } = useMLBData();

  return (
    <div className="bg-[#FAFAFA] p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <div className="mt-6 mb-4 flex flex-col md:flex-row justify-center items-center p-3 transition-all duration-500 ease-in-out opacity-100 max-h-20">
          <TabSelector />
        </div>
        <div className="mt-12 mb-6">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <OverviewTab yearlyData={yearlyData} />
              <EfficiencyTab summaryData={summaryData} data={data} />
              <TeamDetailsTab
                summaryData={summaryData}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                data={data}
              />
            </>
          )}
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default MLBSpendingDashboard;
