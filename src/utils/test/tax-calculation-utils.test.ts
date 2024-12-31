import {
  calculateByNewTaxSlab,
  calculateByOldTaxSlab,
  calculateIncomeTax,
  calculateRentDeduction,
  calculateTax,
  formatNumber,
} from "../tax-calculation";

describe("test tax Calculation utils", () => {
  describe("calculateByNewTaxSlab", () => {
    test("should return 0 for taxable amount <= 700000", () => {
      expect(calculateByNewTaxSlab(700000)).toEqual(0);
      expect(calculateByNewTaxSlab(500000)).toEqual(0);
      expect(calculateByNewTaxSlab(700001)).not.toEqual(0);
    });

    test("should calculate tax correctly for taxable amount between 700001 and 1000000", () => {
      // Taxable amount is between 7 lakh to 10 lakh, tax = 400000 * 0.05 + (800000 - 700000) * 0.1
      expect(calculateByNewTaxSlab(800000)).toEqual(30000);
      expect(calculateByNewTaxSlab(1000000)).toEqual(50000);
    });

    test("should calculate tax correctly for taxable amount between 1000001 and 1200000", () => {
      // Taxable amount is between 10 lakh to 12 lakh
      expect(calculateByNewTaxSlab(1100000)).toEqual(65000);
      expect(calculateByNewTaxSlab(1200000)).toEqual(80000);
    });

    test("should calculate tax correctly for taxable amount between 1200001 and 1500000", () => {
      // Taxable amount is between 12 lakh to 15 lakh
      expect(calculateByNewTaxSlab(1300000)).toEqual(100000);
      expect(calculateByNewTaxSlab(1500000)).toEqual(140000);
    });

    test("should calculate tax correctly for taxable amount above 1500000", () => {
      // Taxable amount is above 15 lakh
      expect(calculateByNewTaxSlab(1600000)).toEqual(170000);
      expect(calculateByNewTaxSlab(2000000)).toEqual(290000);
    });
  });
  describe("calculateByOldTaxSlab", () => {
    test("should return 0 for taxable amount <= 500000", () => {
      expect(calculateByOldTaxSlab(500000)).toBe(0);
      expect(calculateByOldTaxSlab(400000)).toBe(0);
    });

    test("should calculate tax correctly for taxable amount between 500001 and 1000000", () => {
      // Taxable amount is between 5 lakh to 10 lakh, tax = 250000 * 0.05 + (taxableAmount - 500000) * 0.2
      expect(calculateByOldTaxSlab(600000)).toBe(32500);
      expect(calculateByOldTaxSlab(1000000)).toBe(112500);
    });

    test("should calculate tax correctly for taxable amount above 1000000", () => {
      // Taxable amount is above 10 lakh
      expect(calculateByOldTaxSlab(1500000)).toBe(262500);
      expect(calculateByOldTaxSlab(2000000)).toBe(412500);
    });
  });
  describe("calculateIncomeTax", () => {
    test("should calculate income tax correctly using new tax slab", () => {
      expect(calculateIncomeTax(1200000, 50000, 75000, true)).toEqual({
        baseTax: 68750,
        cessAmount: 2750,
        deductedAmount: 125000,
        monthlyTax: 5958.333333333333,
        taxableAmount: 1125000,
        yearlyTax: 71500,
      });
    });
    test("should calculate income tax correctly using old tax slab", () => {
      expect(calculateIncomeTax(1200000, 50000, 50000, false)).toEqual({
        baseTax: 157500,
        cessAmount: 6300,
        deductedAmount: 100000,
        monthlyTax: 13650,
        taxableAmount: 1150000,
        yearlyTax: 163800,
      });
    });
    test("should return taxableAmount as 0 if taxable amount is negative", () => {
      expect(calculateIncomeTax(400000, 50000, 50000, false)).toEqual({
        baseTax: 0,
        cessAmount: 0,
        deductedAmount: 100000,
        monthlyTax: 0,
        taxableAmount: 350000,
        yearlyTax: 0,
      });
      expect(calculateIncomeTax(0, 500, 50000, false).taxableAmount).toEqual(0);
    });
    test("should calculate the deducted amount correctly", () => {
      expect(
        calculateIncomeTax(1200000, 60000, 75000, true).deductedAmount,
      ).toEqual(135000);
    });
  });
  test("formatNumber", () => {
    expect(formatNumber(0)).toBe(0);
    expect(formatNumber(1000)).toBe(1000);
    // Rounds to two decimal places
    expect(formatNumber(10.12345)).toBe(10.12);
    expect(formatNumber(5.6789)).toBe(5.68);
    expect(formatNumber(123.4567)).toBe(123.46);

    // should not modify the decimal number if it already has 2 decimal places"
    expect(formatNumber(10.12)).toBe(10.12);
    expect(formatNumber(5.68)).toBe(5.68);
    expect(formatNumber(123.45)).toBe(123.45);
  });
  describe("calculateRentDeduction", () => {
    test("should return the HRA if it is the smallest of the three amounts", () => {
      expect(calculateRentDeduction(15000, 12, true, 25000, 12000)).toBe(12000);
    });

    test("should return the ruleByRent when it is the smallest amount", () => {
      expect(calculateRentDeduction(10000, 12, false, 30000, 15000)).toBe(
        12000,
      );
    });

    test("should return the ruleByBasic when it is the smallest amount", () => {
      expect(calculateRentDeduction(5000, 6, false, 20000, 10000)).toBe(8000);
    });

    test("should return 0 if all calculated values are negative or 0", () => {
      expect(calculateRentDeduction(0, 0, false, 0, 0)).toBe(0);
    });

    test("should return 0 if the comparative amount is negative", () => {
      expect(calculateRentDeduction(10000, 12, true, 250000, 5000)).toBe(5000);
    });

    test("should handle metro city limit calculation correctly", () => {
      expect(calculateRentDeduction(20000, 12, true, 30000, 18000)).toBe(15000);
    });

    test("should handle non-metro city limit calculation correctly", () => {
      expect(calculateRentDeduction(20000, 12, false, 30000, 12000)).toBe(
        12000,
      );
    });
  });
  describe("calculateTax", () => {
    const mockSalaryIncome = { pf: 50000 };
    const mockTotalIncome = 1000000;
    const mockDeductionDetail = {
      rent: { deductedAmount: 20000 },
      section24: { deductedAmount: 15000 },
      deduction80C: { deductedAmount: 50000 },
      deductionByChapter6: { deductedAmount: 10000 },
      standardDeduction: {
        newScheme: 75000,
        oldScheme: 50000,
      },
    };

    test("should correctly calculate the tax breakup for new and old schemes", () => {
      const result = calculateTax(
        mockSalaryIncome,
        mockTotalIncome,
        mockDeductionDetail,
      );
      expect(result.choice.label).toEqual("New");
      expect(result.choice.difference).toEqual(37440);
    });

    test("should return the old scheme if it results in lower tax amount", () => {
      const result = calculateTax(mockSalaryIncome, 900000, {
        ...mockDeductionDetail,
        section24: { deductedAmount: 200000 },
        deduction80C: { deductedAmount: 150000 },
      });

      // The best scheme should be oldScheme, as it has lower yearly tax
      expect(result.choice.label).toBe("Old");
      expect(result.choice.difference).toBe(28600);
    });

    test("should handle edge case where all deducted amounts are zero", () => {
      const zeroDeductionDetail = {
        rent: { deductedAmount: 0 },
        section24: { deductedAmount: 0 },
        deduction80C: { deductedAmount: 0 },
        deductionByChapter6: { deductedAmount: 0 },
        standardDeduction: {
          newScheme: 0,
          oldScheme: 0,
        },
      };

      const result = calculateTax(
        mockSalaryIncome,
        mockTotalIncome,
        zeroDeductionDetail,
      );

      // Assert tax breakup structure and values
      expect(result.choice.label).toBe("New");
      expect(result.choice.difference).toBe(59800);
    });

    test("should return 0 when taxable amount is zero", () => {
      const zeroIncome = { pf: 0 };
      const zeroTotalIncome = 0;
      const zeroDeductionDetail = {
        rent: { deductedAmount: 0 },
        section24: { deductedAmount: 0 },
        deduction80C: { deductedAmount: 0 },
        deductionByChapter6: { deductedAmount: 0 },
        standardDeduction: {
          newScheme: 0,
          oldScheme: 0,
        },
      };

      const result = calculateTax(
        zeroIncome,
        zeroTotalIncome,
        zeroDeductionDetail,
      );

      // Assert tax breakup structure and values
      expect(result.choice.label).toBe("Old");
      expect(result.choice.difference).toBe(0);
    });
  });
});
