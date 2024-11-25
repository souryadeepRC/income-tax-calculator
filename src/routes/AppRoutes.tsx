import { Route, Routes } from "react-router-dom";
// components
import { IncomeTaxDeduction } from "src/components/income-tax-calculation/income-tax-deduction/IncomeTaxDeduction";
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/tax-breakup/IncomeTaxBreakup";
import IncomePage from "src/pages/income-page/IncomePage";
import Landing from "src/pages/landing/Landing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="income" element={<IncomePage />} />
      <Route path="deduction/*" element={<IncomeTaxDeduction />} />
      <Route path="tax-breakup" element={<IncomeTaxBreakup />} />

      <Route path="*" element={<span>Main *</span>} />
    </Routes>
  );
};
