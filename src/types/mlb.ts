// src/types/mlb.ts

export interface MLBTeamData {
  Team: string;
  "Team Name": string;
  "League (National or American)": "AL" | "NL";
  Divison: string;
  Year: number;
  "Total Payroll Allocation": number;
  "Active 26-Man Roster": number;
  Injured: number;
  "Retained (Money Spent on Players Traded or Released)": number;
  "Buried (Money spent on players with major league contracts on minor league rosters)": number;
  "Average Age": number;
  Wins: number;
  Losses: number;
  WinRate: number;
  Postseason: string;
  "Postseason (Yes/No)": "Y" | "N";
  "Won League (Yes/No)": "Y" | "N";
  "Won World Series (Yes/No)": "Y" | "N";
  "Runs per Game": number;
  Runs: number;
  Hits: number;
  Doubles: number;
  Triples: number;
  "Home Runs": number;
  "Runs Batted In": number;
  "Stolen Bases": number;
  Walks: number;
  "Batting Average": number;
  "On Base Percentage": number;
  "Slugging Percentage": number;
  "On-Base+Slugging Percentage": number;
  "On-Base+Slugging Percentage (Adjusted to Park)": number;
  "Runs Allowed per Game": number;
  "Earned Run Average": number;
  "Runs Allowed": number;
  Strikeouts: number;
  "Earned Run Average (Adjusted to Parks)": number;
  "Fielding Independent Pitching (Pitcher's Effectiveness at Avoiding HR, Walks, and Hit By Pitches while Throwing Strikeouts)": number;
  "WHIP (Walks and Hits over Innings Pitched)": number;
  "Hits per 9 Innings": number;
  "Home Runs per 9 Innings": number;
  "Walks Issued per 9 Innings": number;
  "Strikeouts per 9 Innings": number;
  "Strikeouts/Walks": number;
}

export interface ProcessedMLBData extends MLBTeamData {
  "Cost per Win": number;
  "Payroll (Millions)": number;
  "Cost per Win (Millions)": number;
  "Made Postseason": boolean;
  "Won World Series": boolean;
}

export interface TeamSummary {
  team: string;
  teamCode: string;
  league: "AL" | "NL";
  division: string;
  latestYear: number;
  latestPayroll: number;
  latestWins: number;
  latestCostPerWin: number;
  avgPayroll: number;
  avgWins: number;
  avgCostPerWin: number;
  postseasonAppearances: number;
  worldSeriesWins: number;
  avgOPS: number;
  avgERA: number;
  payrollHistory: PayrollHistoryEntry[];
}

export interface PayrollHistoryEntry {
  year: number;
  payroll: number;
  wins: number;
  costPerWin: number;
  madePostseason: boolean;
}

export interface YearlyData {
  [year: string]: ProcessedMLBData[];
}

export type TeamCode =
  | "ARI"
  | "ATL"
  | "BAL"
  | "BOS"
  | "CHC"
  | "CWS"
  | "CIN"
  | "CLE"
  | "COL"
  | "DET"
  | "HOU"
  | "KC"
  | "LAA"
  | "LAD"
  | "MIA"
  | "MIL"
  | "MIN"
  | "NYM"
  | "NYY"
  | "OAK"
  | "PHI"
  | "PIT"
  | "SD"
  | "SF"
  | "SEA"
  | "STL"
  | "TB"
  | "TEX"
  | "TOR"
  | "WSH";
