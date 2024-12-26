import { DeductionReducer } from "src/store/deduction/deduction-reducer";
import {
  EDIT_RENT_ENTRY,
  SAVE_RENT_ENTRY,
  DELETE_RENT_ENTRY,
  RESET_EDIT_RENT_ENTRY,
  UPDATE_SECTION_24_DEDUCTION,
  SET_RENT_DEDUCTED_AMOUNT,
  SAVE_80C_ENTRY,
  DELETE_80C_ENTRY,
  RESET_EDIT_80C_ENTRY,
  EDIT_80C_ENTRY,
  EDIT_CHAPTER_VI_ENTRY,
  RESET_EDIT_CHAPTER_VI_ENTRY,
  SAVE_CHAPTER_VI_ENTRY,
  DELETE_CHAPTER_VI_ENTRY,
} from "src/store/deduction/deduction-constants";
import {
  delete80CEntry,
  deleteChapterVIEntry,
  deleteRentEntry,
  edit80CEntry,
  editChapterVIEntry,
  editRentEntry,
  resetEdit80CEntry,
  resetEditChapterVIEntry,
  resetEditRentEntry,
  save80CEntry,
  saveChapterVIEntry,
  saveRentEntry,
  setRentDeductedAmount,
  updateSection24Deduction,
} from "../deduction/deduction-actions";
import { mapEditRentEntry } from "../deduction/mapper/deduction-rent-mapper";
import { resetDeductionOption } from "../deduction/mapper/deduction-80C-mapper";

// Initial state mock
const initialState = {
  standardDeduction: { newScheme: 75000, oldScheme: 50000 },
  rent: {
    collections: [{ id: "1", amount: 5000, duration: 6, isMetroCity: false }],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  section24: {
    amount: 0,
    deductedAmount: 0,
  },
  deduction80C: {
    options: [{ id: "1", amount: 5000, category: "PF" }],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
  deductionByChapter6: {
    options: [],
    deductedAmount: 0,
    isEditable: false,
    editableEntryId: "",
  },
};

describe("Deduction Reducer", () => {
  test("should return the initial state when an unknown action type is passed", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(DeductionReducer(undefined, action).rent.collections).toEqual([]);
  });
  test("should handle EDIT_RENT_ENTRY", () => {
    const payload = "1";
    const action = editRentEntry(payload);
    expect(action).toEqual({
      type: EDIT_RENT_ENTRY,
      payload,
    });
    const expectedState = {
      ...initialState,
      rent: mapEditRentEntry(initialState.rent, payload),
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
    expect(
      DeductionReducer(initialState, editRentEntry()).rent.editableEntryId
    ).toEqual("");
  });

  test("should handle SAVE_RENT_ENTRY", () => {
    const payload = { amount: 5000, duration: 10, isMetroCity: false };
    const action = saveRentEntry(payload);
    expect(action).toEqual({
      type: SAVE_RENT_ENTRY,
      payload,
    });
    const addedRentState = DeductionReducer(initialState, action);
    expect(addedRentState.rent.collections.length).toEqual(2);
    const updatedState = DeductionReducer(addedRentState, editRentEntry("1"));
    expect(
      DeductionReducer(updatedState, saveRentEntry(payload)).rent.collections
        .length
    ).toEqual(2);
  });

  test("should handle DELETE_RENT_ENTRY", () => {
    const payload = "1"; // ID of the rent entry to delete
    const action = deleteRentEntry(payload);
    expect(action).toEqual({
      type: DELETE_RENT_ENTRY,
      payload,
    });

    const expectedState = {
      ...initialState,
      rent: {
        collections: [],
        deductedAmount: 0,
        isEditable: false,
        editableEntryId: "",
      },
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle RESET_EDIT_RENT_ENTRY", () => {
    const action = resetEditRentEntry();
    expect(action).toEqual({
      type: RESET_EDIT_RENT_ENTRY,
    });
    const expectedState = {
      ...initialState,
      rent: {
        ...initialState.rent,
        isEditable: false,
        editableEntryId: "",
      },
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle UPDATE_SECTION_24_DEDUCTION", () => {
    const payload = 2500000;
    const action = updateSection24Deduction(payload);
    expect(action).toEqual({
      type: UPDATE_SECTION_24_DEDUCTION,
      payload,
    });
    expect(
      DeductionReducer(initialState, action).section24.deductedAmount
    ).toEqual(2000000);
  });
  test("should handle UPDATE_SECTION_24_DEDUCTION within limit", () => {
    const payload = 50000;
    const action = updateSection24Deduction(payload);
    expect(action).toEqual({
      type: UPDATE_SECTION_24_DEDUCTION,
      payload,
    });
    expect(
      DeductionReducer(initialState, action).section24.deductedAmount
    ).toEqual(50000);
  });

  test("should handle SET_RENT_DEDUCTED_AMOUNT", () => {
    const payload = 5000;
    const action = setRentDeductedAmount(payload);
    expect(action).toEqual({
      type: SET_RENT_DEDUCTED_AMOUNT,
      payload,
    });
    const expectedState = {
      ...initialState,
      rent: {
        ...initialState.rent,
        deductedAmount: payload,
      },
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle EDIT_80C_ENTRY", () => {
    const action = edit80CEntry("1");
    expect(action).toEqual({
      type: EDIT_80C_ENTRY,
      payload: "1",
    });
    expect(
      DeductionReducer(initialState, action).deduction80C.isEditable
    ).toEqual(true);
    expect(
      DeductionReducer(initialState, edit80CEntry()).deduction80C
        .editableEntryId
    ).toEqual("");
  });
  test("should handle RESET_EDIT_80C_ENTRY", () => {
    const action = resetEdit80CEntry();
    expect(action).toEqual({
      type: RESET_EDIT_80C_ENTRY,
    });
    const expectedState = {
      ...initialState,
      deduction80C: resetDeductionOption(
        initialState.deduction80C,
        initialState.deduction80C
      ),
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle SAVE_80C_ENTRY", () => {
    const payload = { amount: 150000, category: "LIC" };
    const action = save80CEntry(payload);
    expect(action).toEqual({
      type: SAVE_80C_ENTRY,
      payload,
    });
    const added80CState = DeductionReducer(initialState, action);
    expect(added80CState.deduction80C.options.length).toEqual(2);

    const updatedState = DeductionReducer(added80CState, edit80CEntry("1"));
    expect(
      DeductionReducer(updatedState, save80CEntry(payload)).deduction80C.options
        .length
    ).toEqual(2);
  });

  test("should handle DELETE_80C_ENTRY", () => {
    const payload = "1"; // ID of the deduction entry to delete
    const action = delete80CEntry(payload);
    expect(action).toEqual({
      type: DELETE_80C_ENTRY,
      payload,
    });

    const expectedState = {
      ...initialState,
      deduction80C: {
        options: [],
        deductedAmount: 0,
        isEditable: false,
        editableEntryId: "",
      },
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  // Similarly, tests for the Chapter VI deductions can be written

  test("should handle EDIT_CHAPTER_VI_ENTRY", () => {
    const action = editChapterVIEntry();
    expect(action).toEqual({
      type: EDIT_CHAPTER_VI_ENTRY,
    });
    expect(
      DeductionReducer(initialState, action).deductionByChapter6.isEditable
    ).toEqual(true);
  });
  test("should handle RESET_EDIT_CHAPTER_VI_ENTRY", () => {
    const action = resetEditChapterVIEntry();
    expect(action).toEqual({
      type: RESET_EDIT_CHAPTER_VI_ENTRY,
    });
    const expectedState = {
      ...initialState,
      deductionByChapter6: resetDeductionOption(
        initialState.deductionByChapter6,
        initialState.deductionByChapter6
      ),
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle SAVE_CHAPTER_VI_ENTRY", () => {
    const payload = { id: "1", amount: 150000, category: "Insurance" };
    const action = saveChapterVIEntry(payload);
    expect(action).toEqual({
      type: SAVE_CHAPTER_VI_ENTRY,
      payload,
    });

    const expectedState = {
      ...initialState,
      deductionByChapter6: {
        options: [{ id: "1", amount: 150000, category: "Insurance" }],
        deductedAmount: 150000,
        isEditable: false,
        editableEntryId: "",
      },
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle DELETE_CHAPTER_VI_ENTRY", () => {
    const payload = "1"; // ID of the deduction entry to delete
    const action = deleteChapterVIEntry(payload);
    expect(action).toEqual({
      type: DELETE_CHAPTER_VI_ENTRY,
      payload,
    });

    const expectedState = {
      ...initialState,
      deductionByChapter6: {
        options: [],
        deductedAmount: 0,
        isEditable: false,
        editableEntryId: "",
      },
    };
    expect(DeductionReducer(initialState, action)).toEqual(expectedState);
  });
});
