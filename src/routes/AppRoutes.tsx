import { Route, Routes } from "react-router-dom";
// components
import { IncomeDetails } from "src/components/income-tax-calculation/income-details/IncomeDetails";
import { IncomeTaxDeduction } from "src/components/income-tax-calculation/income-tax-deduction/IncomeTaxDeduction";
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/tax-breakup/IncomeTaxBreakup";
import { TaxDetails } from "src/components/income-tax-calculation/tax-details/TaxDetails";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
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
