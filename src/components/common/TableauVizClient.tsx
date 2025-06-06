// src/components/common/TableauVizClient.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

interface TableauVizClientProps {
  vizUrl: string;
  title?: string;
  height?: number;
  hideTabs?: boolean;
  hideToolbar?: boolean;
  className?: string;
  filters?: Record<string, any>;
}

const TableauVizClient: React.FC<TableauVizClientProps> = ({
  vizUrl,
  title,
  height = 600,
  hideTabs = true,
  hideToolbar = true,
  className = "",
  filters = {},
}) => {
  const vizRef = useRef<HTMLDivElement>(null);
  const vizInstance = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const loadTableauScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 이미 로드된 스크립트가 있다면 제거
      const existingScript = document.querySelector('script[src*="tableau"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://public.tableau.com/javascripts/api/tableau-2.8.0.min.js";

      script.onload = () => {
        console.log("Tableau script loaded");
        // 스크립트 로드 후 잠시 대기
        setTimeout(() => {
          const tableau = (window as any).tableau;
          if (tableau && tableau.Viz) {
            resolve();
          } else {
            reject(new Error("Tableau API not properly initialized"));
          }
        }, 1000);
      };

      script.onerror = () => {
        reject(new Error("Failed to load Tableau script"));
      };

      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    if (!vizRef.current) return;

    const initViz = async (): Promise<void> => {
      try {
        setDebugInfo("Loading Tableau script...");

        // 스크립트 동적 로딩
        await loadTableauScript();

        setDebugInfo("Tableau script loaded, initializing visualization...");

        const tableau = (window as any).tableau;

        if (!tableau || !tableau.Viz) {
          throw new Error("Tableau API not available after loading");
        }

        // 기존 viz 정리
        if (vizInstance.current) {
          try {
            vizInstance.current.dispose();
          } catch (e) {
            console.warn("Error disposing previous viz:", e);
          }
        }

        // 컨테이너 정리
        if (vizRef.current) {
          vizRef.current.innerHTML = "";
        }

        const options = {
          hideTabs,
          hideToolbar,
          width: "100%",
          height: `${height}px`,
          onFirstInteractive: () => {
            console.log("Tableau visualization loaded successfully");
            setIsLoading(false);
            setDebugInfo("");
          },
        };

        console.log("Creating Tableau.Viz...");

        // 새 viz 생성
        vizInstance.current = new tableau.Viz(vizRef.current, vizUrl, options);
      } catch (initError) {
        console.error("Failed to initialize Tableau visualization:", initError);
        setError(
          `Failed to load: ${
            initError instanceof Error ? initError.message : "Unknown error"
          }`
        );
        setIsLoading(false);
        setDebugInfo("");
      }
    };

    initViz();

    return () => {
      if (vizInstance.current) {
        try {
          vizInstance.current.dispose();
        } catch (e) {
          console.warn("Error during cleanup:", e);
        }
      }
    };
  }, [vizUrl, height, hideTabs, hideToolbar]);

  return (
    <div className={`bg-white p-4 rounded shadow-sm ${className}`}>
      {title && (
        <h3 className="text-lg font-medium mb-3 text-gray-700">{title}</h3>
      )}

      <div className="relative" style={{ height: `${height}px` }}>
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading Tableau</p>
              {debugInfo && (
                <p className="mt-1 text-xs text-gray-500">{debugInfo}</p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-red-50 border border-red-200 rounded">
            <div className="text-center p-4">
              <p className="font-medium">Visualization Error</p>
              <p className="text-sm mt-1 break-words max-w-md">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Reload
              </button>
            </div>
          </div>
        )}

        <div ref={vizRef} className="w-full h-full overflow-hidden" />
      </div>
    </div>
  );
};

export default TableauVizClient;
