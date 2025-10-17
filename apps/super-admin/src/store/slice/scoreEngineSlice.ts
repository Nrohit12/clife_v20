import { BiomarkerConfig, ScoreEngineState, Tier } from "@/types/scoreEngine.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ScoreEngineState = {
  score: 0,
  history: [],
  tiers: {
    items: [],
    total: 0,
  },
  biomarkers: [],
  scoreTypes: [],
  biomarkerGroups: [],
};

const scoreEngineSlice = createSlice({
  name: "scoreEngine",
  initialState,
  reducers: {
    setTiers(state, action: PayloadAction<{ items: Tier[]; total: number }>) {
      state.tiers = action.payload;
    },
    setBiomarkers(state, action: PayloadAction<BiomarkerConfig[]>) {
      state.biomarkers = action.payload;
    },
    setScoreTypes(state, action: PayloadAction<any>) {
      state.scoreTypes = action.payload.items.map((item: any) => ({
        id: item._id,
        name: item.name,
        checked: false,
      }));
    },
    setBiomarkerGroups(state, action: PayloadAction<string[]>) {
      state.biomarkerGroups = action.payload;
    },
  },
});

export const { setTiers, setBiomarkers, setScoreTypes, setBiomarkerGroups } =
  scoreEngineSlice.actions;
export const scoreEngineReducer = scoreEngineSlice.reducer;
