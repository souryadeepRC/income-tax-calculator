// library
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
// components
import Deduction80C from "src/components/tax-deduction/deduction-option/80C/Deduction80C";
import ChapterVI from "src/components/tax-deduction/deduction-option/chapter-vi/ChapterVI";
import Rent from "src/components/tax-deduction/deduction-option/rent/Rent";
import Section24 from "src/components/tax-deduction/deduction-option/section24/Section24";
import DeductionOption from "src/pages/deduction-page/DeductionOption";
import {
  DeductionPage,
  IncomePage,
  LandingPage,
  TaxBreakupPage,
} from "src/pages";
//store
import { selectIsLoggedIn } from "src/store/auth/auth-selectors";

const AppUserRoutes = () => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" />;
  return (
    <Routes>
      <Route path="income" element={<IncomePage />} />
      <Route path="deduction" element={<DeductionPage />}>
        <Route index element={<DeductionOption />} />
        <Route path="rent" element={<Rent />} />
        <Route path="section-24" element={<Section24 />} />
        <Route path="80C" element={<Deduction80C />} />
        <Route path="Chapter-VIA" element={<ChapterVI />} />
      </Route>
      <Route path="tax-breakup" element={<TaxBreakupPage />} />
    </Routes>
  );
};
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="/*" element={<AppUserRoutes />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
