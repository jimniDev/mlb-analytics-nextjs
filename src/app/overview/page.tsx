"use client";

import OverviewTab from "@/components/overviewTab/OverviewTab";
import useMLBData from "@/hooks/useMLBData";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function OverviewPage() {
  const { yearlyData, isLoading } = useMLBData();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <OverviewTab yearlyData={yearlyData} />;
}
