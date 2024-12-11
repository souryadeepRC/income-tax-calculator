import { Route, Routes } from "react-router";
// components
import IncomePage from "src/pages/income-page/IncomePage";
import { Deduction80C } from "src/components/income-tax-calculation/income-tax-deduction/80C/Deduction80C";
import { DeductionChapter6 } from "src/components/income-tax-calculation/income-tax-deduction/DeductionChapter6";
import { Rent } from "src/components/income-tax-calculation/income-tax-deduction/rent/Rent";
import { Section24 } from "src/components/income-tax-calculation/income-tax-deduction/section24/Section24";
import { IncomeTaxBreakup } from "src/components/income-tax-calculation/tax-breakup/IncomeTaxBreakup";
import DeductionPage, {
  DeductionOption,
} from "src/pages/deduction-page/DeductionPage";
import Landing from "src/pages/landing/Landing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="income" element={<IncomePage />} />
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
