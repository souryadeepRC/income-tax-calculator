import deductionReducer, {
  deleteDeduction,
  editDeduction,
  initialState,
} from "src/store/deduction/deduction-reducer";
import { DeductionType } from "src/types/deduction-types";

describe("Deduction Reducer", () => {
  it("should return the initial state", () => {
    const action = { type: undefined } as any;
    expect(deductionReducer(initialState, action)).toEqual(initialState);
  });

  test("should handle edit deduction scenario", () => {
    const payload = { type: "Rent" as DeductionType, entryId: "testId" };
    const action = editDeduction(payload);
    const expectedState = deductionReducer(initialState, action);

    expect(expectedState.actionEntry.type).toEqual("Rent");
    expect(expectedState.actionEntry.isEditable).toEqual(true);
    expect(expectedState.actionEntry.isDelete).toEqual(false);
    expect(expectedState.actionEntry.entryId).toEqual("testId");
  });
  test("should handle create new deduction scenario", () => {
    const payload = { type: "Section24" as DeductionType };
    const action = editDeduction(payload);
    const expectedState = deductionReducer(initialState, action);

    expect(expectedState.actionEntry.type).toEqual("Section24");
    expect(expectedState.actionEntry.isEditable).toEqual(true);
    expect(expectedState.actionEntry.isDelete).toEqual(false);
    expect(expectedState.actionEntry.entryId).toEqual("");
  });
  test("should handle delete deduction scenario", () => {
    const payload = { type: "Section24" as DeductionType, entryId: "testId" };
    const action = deleteDeduction(payload);
    const expectedState = deductionReducer(initialState, action);

    expect(expectedState.actionEntry.type).toEqual("Section24");
    expect(expectedState.actionEntry.isEditable).toEqual(false);
    expect(expectedState.actionEntry.isDelete).toEqual(true);
    expect(expectedState.actionEntry.entryId).toEqual("testId");
  });
});
