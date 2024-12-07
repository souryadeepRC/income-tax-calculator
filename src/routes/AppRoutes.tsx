import { Route, Routes } from "react-router-dom";
// components
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/tax-breakup/IncomeTaxBreakup";
import DeductionPage from "src/pages/deduction-page/DeductionPage";
import IncomePage from "src/pages/income-page/IncomePage";
import Landing from "src/pages/landing/Landing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="income/*" element={<IncomePage />} />
      <Route path="deduction/*" element={<DeductionPage />} />
      <Route path="tax-breakup" element={<IncomeTaxBreakup />} />

      <Route path="*" element={<span>Main *</span>} />
    </Routes>
  );
};
