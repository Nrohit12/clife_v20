export interface BiomarkerConfig {
  id: string;
  name: string;
  group: string;
  source: string;
  tier: "bronze" | "silver" | "gold";
  weight: number;
  value: number;
  unit: string;
  risk_zones: RiskZone[];
}
export interface RiskZone {
  name: string;
  color: string;
  min: number;
  max: number;
  hazardRatio: number;
}
export interface ScoreEngineState {
  score: number;
  history: number[];
  tiers?: {
    items: Tier[];
    total: number;
  };
  biomarkers?: BiomarkerConfig[];
  scoreTypes?: ScoreType[];
  biomarkerGroups?: string[];
}

export interface Tier {
  _id: string;
  name: string;
  status: string | null;
  biomarker_count: number;
  created?: string;
  updated?: string;
  score: number;
  history: number[];
  tiers?: Tier[];
  biomarkers?: BiomarkerConfig[];
  scoreTypes?: ScoreType[];
  biomarkerGroups?: string[];
}

export interface Tier {
  name: string;
  biomarkers_count: number;
  value: "bronze" | "silver" | "gold";
}

export interface ScoreType {
  name: string;
  tier?: string;
  checked: boolean;
}

export interface BiomarkerGroup {
  id: string;
  name: string;
}
