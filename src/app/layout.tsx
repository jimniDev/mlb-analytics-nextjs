// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
