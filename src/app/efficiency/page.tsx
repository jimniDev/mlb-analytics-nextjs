"use client";

import EfficiencyTab from "@/components/efficiencyTab/EfficiencyTab";
import useMLBData from "@/hooks/useMLBData";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function EfficiencyPage() {
  const { data, summaryData, isLoading } = useMLBData();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <EfficiencyTab summaryData={summaryData} data={data} />;
}
