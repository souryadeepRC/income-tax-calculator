import { Route, Routes } from "react-router";
// components
import IncomePage from "src/pages/income-page/IncomePage";
import Deduction80C from "src/components/tax-deduction/deduction-option/80C/Deduction80C";
import ChapterVI from "src/components/tax-deduction/deduction-option/chapter-vi/ChapterVI";
import Rent from "src/components/tax-deduction/deduction-option/rent/Rent";
import Section24 from "src/components/tax-deduction/deduction-option/section24/Section24";
import TaxBreakupPage from "src/pages/tax-breakup-page/TaxBreakupPage";
import DeductionPage from "src/pages/deduction-page/DeductionPage";
import DeductionOption from "src/pages/deduction-page/DeductionOption";
import Home from "src/pages/landing/home/Home";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="" element={<Home />} />
    <Route path="income" element={<IncomePage />} />
    <Route path="deduction" element={<DeductionPage />}>
      <Route index element={<DeductionOption />} />
      <Route path="rent" element={<Rent />} />
      <Route path="section-24" element={<Section24 />} />
      <Route path="80C" element={<Deduction80C />} />
      <Route path="Chapter-VIA" element={<ChapterVI />} />
    </Route>
    <Route path="tax-breakup" element={<TaxBreakupPage />} />

    <Route path="*" element={<span>Main *</span>} />
  </Routes>
);
