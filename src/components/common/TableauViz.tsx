// src/components/common/TableauViz.tsx
"use client";
import React from "react";
import dynamic from "next/dynamic";

interface TableauVizProps {
  vizUrl: string;
  title?: string;
  height?: number;
  hideTabs?: boolean;
  hideToolbar?: boolean;
  className?: string;
  filters?: Record<string, any>;
}

// 로딩 컴포넌트
const LoadingComponent = ({ height = 600 }: { height?: number }) => (
  <div className="bg-white p-4 rounded shadow-sm">
    <div
      className="flex items-center justify-center bg-gray-50 rounded"
      style={{ height: `${height}px` }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">
          Loading Tableau visualization...
        </p>
      </div>
    </div>
  </div>
);

// Dynamic import로 클라이언트에서만 로드
const TableauVizClient = dynamic(
  () => import("@/components/common/TableauVizClient"),
  {
    ssr: false,
    loading: () => <LoadingComponent />,
  }
);

const TableauViz: React.FC<TableauVizProps> = (props) => {
  return <TableauVizClient {...props} />;
};

export default TableauViz;
