import { IncomeReducer } from "src/store/income/income-reducer";
import {
  EDIT_INCOME_ENTRY,
  RESET_EDIT_INCOME_ENTRY,
  SAVE_INCOME_DETAILS,
  DELETE_INCOME_DETAILS,
} from "src/store/income/income-constants";
import { IncomeOption, IncomeReducerType } from "src/types/income-types";
import {
  editIncomeEntry,
  removeIncomeDetails,
  resetEditIncomeEntry,
  saveIncomeDetails,
} from "src/store/income/income-actions";

const mockState: IncomeReducerType = {
  overallAmount: 1000,
  options: [{ id: "1", label: "Test", amount: 200, category: "salary" }],
  isEditable: false,
  editableEntryId: "",
};

// Test reducer cases
describe("Income Reducer", () => {
  test("should return the initial state when an unknown action type is passed", () => {
    const action = { type: "UNKNOWN_ACTION" };
    expect(IncomeReducer(undefined, action)).toEqual({
      ...mockState,
      overallAmount: 0,
      options: [],
    });
  });
  test("should handle EDIT_INCOME_ENTRY", () => {
    const action = editIncomeEntry("1");
    expect(action).toEqual({
      type: EDIT_INCOME_ENTRY,
      payload: "1",
    });

    const expectedState = {
      ...mockState,
      isEditable: true,
      editableEntryId: "1",
    };
    expect(IncomeReducer(mockState, action)).toEqual(expectedState);
  });
  test("For creating new entry by handle EDIT_INCOME_ENTRY", () => {
    const action = editIncomeEntry();
    expect(action).toEqual({
      type: EDIT_INCOME_ENTRY,
    });

    const expectedState = {
      ...mockState,
      isEditable: true,
      editableEntryId: "",
    };
    expect(IncomeReducer(mockState, action)).toEqual(expectedState);
  });

  test("should handle RESET_EDIT_INCOME_ENTRY", () => {
    const action = resetEditIncomeEntry();

    expect(action).toEqual({
      type: RESET_EDIT_INCOME_ENTRY,
    });
    const expectedState = {
      overallAmount: 1000,
      options: [{ id: "1", label: "Test", amount: 200, category: "salary" }],
      isEditable: false,
      editableEntryId: "",
    };
    expect(IncomeReducer(mockState, action)).toEqual(expectedState);
  });

  test("should handle SAVE_INCOME_DETAILS", () => {
    const payload: IncomeOption = {
      label: "Test 2",
      amount: 500,
      category: "salary",
    };
    const action = saveIncomeDetails(payload);

    expect(action).toEqual({
      type: SAVE_INCOME_DETAILS,
      payload,
    });

    expect(IncomeReducer(mockState, action).options.length).toEqual(2);
  });
  test("should handle SAVE_INCOME_DETAILS for edit case", () => {
    const payload: IncomeOption = {
      label: "Test 2",
      amount: 500,
      category: "salary",
    };
    const action = saveIncomeDetails(payload);

    expect(action).toEqual({
      type: SAVE_INCOME_DETAILS,
      payload,
    });
    const result = IncomeReducer(
      { ...mockState, editableEntryId: "1" },
      action,
    );
    expect(result.options.length).toEqual(1);
    expect(result.options[0].label).toEqual("Test 2");
  });

  test("should handle DELETE_INCOME_DETAILS", () => {
    const payload = "1"; // The ID of the item to be deleted
    const action = removeIncomeDetails(payload);

    expect(action).toEqual({
      type: DELETE_INCOME_DETAILS,
      payload,
    });

    const expectedState = {
      overallAmount: 800,
      options: [],
      isEditable: false,
      editableEntryId: "",
    };

    expect(IncomeReducer(mockState, action)).toEqual(expectedState);
  });
  test("should handle DELETE_INCOME_DETAILS for not existing id", () => {
    const payload = "100"; // The ID of the item to be deleted
    const action = removeIncomeDetails(payload);

    expect(action).toEqual({
      type: DELETE_INCOME_DETAILS,
      payload,
    });

    expect(IncomeReducer(mockState, action)).toEqual(mockState);
  });
});
