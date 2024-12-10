import { Route, Routes } from "react-router";
import AddIncome from "src/components/add-income/AddIncome";
import IncomeBreakdown from "src/components/income-details/IncomeBreakdown";
import { Deduction80C } from "src/components/income-tax-calculation/income-tax-deduction/80C/Deduction80C";
import { DeductionChapter6 } from "src/components/income-tax-calculation/income-tax-deduction/DeductionChapter6";
import { Rent } from "src/components/income-tax-calculation/income-tax-deduction/rent/Rent";
import { Section24 } from "src/components/income-tax-calculation/income-tax-deduction/section24/Section24";
// components
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/tax-breakup/IncomeTaxBreakup";
import DeductionPage, {
  DeductionOption,
} from "src/pages/deduction-page/DeductionPage";
import IncomePage, { IncomeOption } from "src/pages/income-page/IncomePage";
import Landing from "src/pages/landing/Landing";
import {
  selectExtraIncome,
  selectSalaryIncome,
} from "src/store/income/income-selectors";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="income" element={<IncomePage />}>
        <Route index element={<IncomeOption />} />
        <Route path="add-income" element={<AddIncome />} />
        <Route
          path="salary"
          element={
            <IncomeBreakdown group="salary" dataSelector={selectSalaryIncome} />
          }
        />
        <Route
          path="extra"
          element={
            <IncomeBreakdown group="extra" dataSelector={selectExtraIncome} />
          }
        />
      </Route>
      <Route path="deduction" element={<DeductionPage />}>
        <Route index element={<DeductionOption />} />
        <Route path="rent" element={<Rent />} />
        <Route path="section-24" element={<Section24 />} />
        <Route path="80C" element={<Deduction80C />} />
        <Route path="Chapter-VIA" element={<DeductionChapter6 />} />
      </Route>
      <Route path="tax-breakup" element={<IncomeTaxBreakup />} />

      <Route path="*" element={<span>Main *</span>} />
    </Routes>
  );
};
