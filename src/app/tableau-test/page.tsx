// src/app/tableau-test/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function TableauTest() {
  const [tableauStatus, setTableauStatus] = useState<string>("Checking...");

  useEffect(() => {
    let attempts = 0;

    const checkTableau = () => {
      attempts++;
      const tableau = (window as any).tableau;

      if (tableau) {
        const status = {
          attempt: attempts,
          hasViz: !!tableau.Viz,
          hasFilterType: !!tableau.FilterUpdateType,
          hasVizManager: !!tableau.VizManager,
          apiLoaded: tableau._apiLoaded,
          allKeys: Object.keys(tableau),
          vizType: typeof tableau.Viz,
        };

        setTableauStatus(`Tableau found! ${JSON.stringify(status, null, 2)}`);

        if (tableau.Viz && typeof tableau.Viz === "function") {
          setTableauStatus((prev) => prev + "\n\n✅ Tableau.Viz is ready!");
          return;
        }
      } else {
        setTableauStatus(`Attempt ${attempts}: Tableau not found`);
      }

      if (attempts < 50) {
        setTimeout(checkTableau, 500);
      }
    };

    checkTableau();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tableau API Test</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {tableauStatus}
      </pre>
      <button
        onClick={() => {
          const tableau = (window as any).tableau;
          console.log("Full tableau object:", tableau);
          if (tableau?.Viz) {
            console.log("Tableau.Viz constructor:", tableau.Viz);
            console.log("Can create Viz?", typeof tableau.Viz === "function");
          }
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Log to Console
      </button>
    </div>
  );
}
