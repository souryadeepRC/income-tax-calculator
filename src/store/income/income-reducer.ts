// types
import { IncomeOption, IncomeReducerType } from "src/types/income-types";
import { mapDeleteIncomeEntry, mapSaveIncomeEntry } from "./income-mapper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IncomeReducerType = {
  overallAmount: 0,
  options: [],
  actionEntry: {
    entryId: "",
    isEditable: false,
    isDelete: false,
  },
};
const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    loadIncomeDetails: (state, action: PayloadAction<IncomeOption[]>) => {
      return {
        ...state,
        options: action.payload,
        overallAmount: action.payload.reduce(
          (acc: number, option: IncomeOption) => acc + option.amount,
          0
        ),
      };
    },
    editIncomeEntry: (state, action: PayloadAction<string | undefined>) => {
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          isEditable: true,
          ...(action.payload ? { entryId: action.payload } : {}),
        },
      };
    },
    deleteIncomeEntry: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          isDelete: true,
          entryId: action.payload,
        },
      };
    },
    resetActionIncomeEntry: (state) => {
      return {
        ...state,
        actionEntry: initialState.actionEntry,
      };
    },
    saveIncomeDetails: (state, action: PayloadAction<IncomeOption>) => {
      return {
        ...state,
        ...mapSaveIncomeEntry(state, action.payload),
        actionEntry: initialState.actionEntry,
      };
    },
    removeIncomeDetails: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ...mapDeleteIncomeEntry(state, action.payload),
        actionEntry: initialState.actionEntry,
      };
    },
  },
});
export const {
  loadIncomeDetails,
  editIncomeEntry,
  deleteIncomeEntry,
  resetActionIncomeEntry,
  saveIncomeDetails,
  removeIncomeDetails,
} = incomeSlice.actions;

export default incomeSlice.reducer;
