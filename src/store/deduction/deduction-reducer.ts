import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import {
  ActionDeleteEntryPayload,
  ActionEditEntryPayload,
  DeductionOption,
  DeductionReducerType,
  DeductionResponse,
  RentOption,
} from "src/types/deduction-types";
// mapper
import DeductionMapper from "src/store/deduction/mapper";
// constants
import {
  SECTION_24_MAX_LIMIT,
  SECTION_80C_MAX_LIMIT,
} from "src/constants/common-constants";

const initialState: DeductionReducerType = {
  actionEntry: {
    type: undefined,
    entryId: "",
    isEditable: false,
    isDelete: false,
  },
  entries: {
    rent: {
      options: [],
      deductedAmount: 0,
    },
    section24: {
      options: [],
      deductedAmount: 0,
    },
    section80C: {
      options: [],
      deductedAmount: 0,
    },
    chapter6: {
      options: [],
      deductedAmount: 0,
    },
    others: {
      options: [],
      deductedAmount: 0,
    },
  },
};
const deductionSlice = createSlice({
  name: "Deduction",
  initialState,
  reducers: {
    loadDeduction: (state, action: PayloadAction<DeductionResponse[]>) => {
      return DeductionMapper.mapDeductions(state, action.payload);
    },
    editDeduction: (state, action: PayloadAction<ActionEditEntryPayload>) => {
      const { type, entryId } = action.payload;
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          type,
          ...(entryId ? { entryId } : {}),
          isEditable: true,
        },
      };
    },
    deleteDeduction: (
      state,
      action: PayloadAction<ActionDeleteEntryPayload>
    ) => {
      const { type, entryId } = action.payload;
      return {
        ...state,
        actionEntry: {
          ...state.actionEntry,
          type,
          entryId,
          isDelete: true,
        },
      };
    },
    resetDeduction: (state) => {
      return {
        ...state,
        actionEntry: initialState.actionEntry,
      };
    },
    // Rent deduction operations
    saveRentEntry: (state, action: PayloadAction<RentOption>) => {
      const options = DeductionMapper.mapRentOptions(
        state.entries.rent.options,
        action.payload
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "rent", { options }),
        actionEntry: initialState.actionEntry,
      };
    },
    deleteRentEntry: (state, action: PayloadAction<string>) => {
      const options = state.entries.rent.options.filter(
        (rentEntry) => rentEntry.id !== action.payload
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "rent", { options }),
        actionEntry: initialState.actionEntry,
      };
    },
    setRentDeductedAmount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "rent", {
          deductedAmount: action.payload,
        }),
      };
    },
    // Section 24 deduction operations
    saveSection24Entry: (state, action: PayloadAction<DeductionOption>) => {
      const { options, deductedAmount } = DeductionMapper.mapSaveEntry(
        state.entries.section24,
        action.payload,
        SECTION_24_MAX_LIMIT
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "section24", {
          options,
          deductedAmount,
        }),
        actionEntry: initialState.actionEntry,
      };
    },
    deleteSection24Entry: (state, action: PayloadAction<string>) => {
      const { options, deductedAmount } = DeductionMapper.mapDeleteEntry(
        state.entries.section24.options,
        action.payload,
        SECTION_24_MAX_LIMIT
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "section24", {
          options,
          deductedAmount,
        }),
        actionEntry: initialState.actionEntry,
      };
    },
    // Section 80C deduction operations
    saveSection80CEntry: (state, action: PayloadAction<DeductionOption>) => {
      const { options, deductedAmount } = DeductionMapper.mapSaveEntry(
        state.entries.section80C,
        action.payload,
        SECTION_80C_MAX_LIMIT
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "section80C", {
          options,
          deductedAmount,
        }),
        actionEntry: initialState.actionEntry,
      };
    },
    deleteSection80CEntry: (state, action: PayloadAction<string>) => {
      const { options, deductedAmount } = DeductionMapper.mapDeleteEntry(
        state.entries.section80C.options,
        action.payload,
        SECTION_80C_MAX_LIMIT
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "section80C", {
          options,
          deductedAmount,
        }),
        actionEntry: initialState.actionEntry,
      };
    },
    // Chapter VI deduction operations
    saveChapterVIEntry: (state, action: PayloadAction<DeductionOption>) => {
      const { options, deductedAmount } = DeductionMapper.mapChapter6EntrySave(
        state.entries.chapter6,
        action.payload
      );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "chapter6", {
          options,
          deductedAmount,
        }),
        actionEntry: initialState.actionEntry,
      };
    },
    deleteChapterVIEntry: (state, action: PayloadAction<string>) => {
      const { options, deductedAmount } =
        DeductionMapper.mapChapter6EntryDeletion(
          state.entries.chapter6,
          action.payload
        );
      return {
        ...state,
        entries: DeductionMapper.mapEntry(state, "chapter6", {
          options,
          deductedAmount,
        }),
        actionEntry: initialState.actionEntry,
      };
    },
  },
});

export const {
  loadDeduction,
  editDeduction,
  deleteDeduction,
  resetDeduction,
  saveRentEntry,
  deleteRentEntry,
  setRentDeductedAmount,
  saveSection24Entry,
  deleteSection24Entry,
  saveSection80CEntry,
  deleteSection80CEntry,
  saveChapterVIEntry,
  deleteChapterVIEntry,
} = deductionSlice.actions;

export default deductionSlice.reducer;

export { initialState };
