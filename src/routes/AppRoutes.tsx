import { Route, Routes } from "react-router-dom";
import { IncomeDetails } from "src/components/income-tax-calculation/income-details/IncomeDetails";
// components
import { IncomeTaxDeduction } from "src/components/income-tax-calculation/income-tax-deduction/IncomeTaxDeduction";
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/tax-breakup/IncomeTaxBreakup";
import { TaxDetails } from "src/components/income-tax-calculation/tax-details/TaxDetails";
import Landing from "src/pages/landing/Landing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route
        path="income"
        element={
          <>
            <IncomeDetails />
            <TaxDetails />
          </>
        }
      />
      <Route path="deduction/*" element={<IncomeTaxDeduction />} />
      <Route path="tax-breakup" element={<IncomeTaxBreakup />} />

      <Route path="*" element={<span>Main *</span>} />
    </Routes>
  );
};
