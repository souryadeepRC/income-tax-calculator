// src/store/tax/tax-selectors.test.ts
import { selectTaxDetails, selectTaxChoice } from "src/store/tax/tax-selectors";
import { AppStoreType } from "src/store/reducer-types";
import {
  selectMediaType,
  selectIsMobile,
  selectAppTheme,
} from "src/store/screen/screen-selectors";
import {
  selectExtraIncome,
  selectIncome,
  selectIncomeOptions,
  selectOverallIncomeAmount,
  selectRentEligibleDetails,
  selectSalaryIncome,
} from "../income/income-selectors";
import {
  select80CDeductedAmount,
  selectChapterVIDeductedAmount,
  selectDeduction,
  selectDeduction80C,
  selectDeductionBreakup,
  selectDeductionChapter6,
  selectDeductionSection24,
  selectEditableRentEntry,
  selectRentCollections,
  selectRentDeductedAmount,
  selectRentDeduction,
  selectSection24DeductedAmount,
} from "../deduction/deduction-selectors";

describe("test selectors", () => {
  const mockState: AppStoreType = {
    income: {
      overallAmount: 1000,
      options: [
        { id: "1", label: "Test", amount: 200, category: "salary" },
        { id: "2", label: "Test", amount: 400, category: "extra" },
      ],
      isEditable: false,
      editableEntryId: "",
    },
    deduction: {
      standardDeduction: { newScheme: 75000, oldScheme: 50000 },
      rent: {
        collections: [],
        deductedAmount: 0,
        isEditable: false,
        editableEntryId: "",
      },
      section24: {
        amount: 0,
        deductedAmount: 0,
      },
      deduction80C: {
        options: [],
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
    },
    screen: {
      mediaType: "MOBILE",
      theme: "light",
    },
    tax: {
      choice: {
        taxAmount: {
          monthly: 0,
          yearly: 0,
        },
        difference: 0,
        type: "New",
        percentage: 0,
      },
      newScheme: {
        baseTax: 0,
        cessAmount: 0,
        monthlyTax: 0,
        taxableAmount: 0,
        yearlyTax: 0,
      },
      oldScheme: {
        baseTax: 0,
        cessAmount: 0,
        monthlyTax: 0,
        taxableAmount: 0,
        yearlyTax: 0,
      },
    },
  };

  test("Tax selectors", () => {
    expect(selectTaxDetails(mockState)).toEqual(mockState.tax);
    expect(selectTaxChoice(mockState)).toEqual(mockState.tax.choice);
  });

  test("Screen selectors", () => {
    expect(selectMediaType(mockState)).toEqual(mockState.screen.mediaType);
    expect(selectIsMobile(mockState)).toEqual(true);
    expect(selectAppTheme(mockState)).toEqual("light");
  });

  test("Income selectors", () => {
    expect(selectIncome(mockState)).toEqual(mockState.income);
    expect(selectIncomeOptions(mockState)).toEqual(mockState.income.options);
    expect(selectOverallIncomeAmount(mockState)).toEqual(1000);
    expect(selectSalaryIncome(mockState)).toEqual([
      { id: "1", label: "Test", amount: 200, category: "salary" },
    ]);
    expect(selectExtraIncome(mockState)).toEqual([
      { id: "2", label: "Test", amount: 400, category: "extra" },
    ]);
    expect(
      selectRentEligibleDetails({
        ...mockState,
        income: {
          ...mockState.income,
          options: [
            { id: "1", label: "Test", amount: 200, category: "salary" },
            { id: "2", label: "basic", amount: 200, category: "salary" },
            { id: "3", label: "hra", amount: 200, category: "salary" },
          ],
        },
      })
    ).toEqual({ basic: 200, hra: 200 });
  });

  test("Deduction selectors", () => {
    expect(selectDeduction(mockState)).toEqual(mockState.deduction);
    expect(selectRentDeduction(mockState)).toEqual(mockState.deduction.rent);
    expect(selectDeductionSection24(mockState)).toEqual(
      mockState.deduction.section24
    );
    expect(selectDeduction80C(mockState)).toEqual(
      mockState.deduction.deduction80C
    );
    expect(selectDeductionChapter6(mockState)).toEqual(
      mockState.deduction.deductionByChapter6
    );
    expect(selectRentCollections(mockState)).toEqual(
      mockState.deduction.rent.collections
    );
    expect(selectRentDeductedAmount(mockState)).toEqual(
      mockState.deduction.rent.deductedAmount
    );
    expect(selectEditableRentEntry(mockState)).toEqual({
      isEditable: false,
      editableEntryId: "",
    });
    expect(selectSection24DeductedAmount(mockState)).toEqual(
      mockState.deduction.section24.deductedAmount
    );
    expect(select80CDeductedAmount(mockState)).toEqual(
      mockState.deduction.deduction80C.deductedAmount
    );
    expect(selectChapterVIDeductedAmount(mockState)).toEqual(
      mockState.deduction.deductionByChapter6.deductedAmount
    );
    expect(selectDeductionBreakup(mockState)).toEqual({
      rentDeduction: 0,
      deductionSection24: 0,
      deduction80C: 0,
      deductionChapter6: 0,
      total: 0,
    });
  });
});
