// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import TabSelector from "@/components/common/TabSelector";
import DashboardHeader from "@/components/common/DashboardHeader";
import DashboardFooter from "@/components/common/DashboardFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLB Spending Efficiency Dashboard",
  description:
    "Analyze MLB team spending efficiency and performance from 2021-2024",
  keywords: [
    "MLB",
    "baseball",
    "analytics",
    "spending",
    "efficiency",
    "dashboard",
  ],
  authors: [
    { name: "Jimin Kim, Brendan Sallee, William King, Anita Nwude-Chenge" },
  ],
  openGraph: {
    title: "MLB Spending Efficiency Dashboard",
    description: "Comprehensive analysis of MLB team spending and performance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <div className="bg-[#FAFAFA] p-4 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader />
            <div className="mt-6 mb-4 flex flex-col md:flex-row justify-center items-center p-3 transition-all duration-500 ease-in-out opacity-100 max-h-20">
              <TabSelector />
            </div>
            <div className="mt-12 mb-6">{children}</div>
            <DashboardFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
