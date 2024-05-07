import { Route, Routes } from "react-router-dom";
import { IncomeDetails } from "src/components/income-tax-calculation/income-details/IncomeDetails";
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/income-tax-breakup/IncomeTaxBreakup";
import { IncomeTaxDeduction } from "src/components/income-tax-calculation/income-tax-deduction/IncomeTaxDeduction";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <>
            <IncomeDetails />
            <IncomeTaxBreakup />
          </>
        }
      />
      <Route path="deduction/*" element={<IncomeTaxDeduction />} /> 
      <Route path="tax-breakup" element={<span>tax-breakup</span>} />

      <Route path="*" element={<span>Main *</span>} />
    </Routes>
  );
};
