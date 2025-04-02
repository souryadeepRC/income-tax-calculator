// library
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
// components
import {
  Rent,
  Section24,
  Section80C,
  ChapterVI,
  OtherDeduction,
} from "src/components/tax-deduction/deduction-option";
import {
  DeductionPage,
  IncomePage,
  LandingPage,
  TaxBreakupPage,
} from "src/pages";
//store
import { selectIsLoggedIn } from "src/store/auth/auth-selectors";
import DeductionNavigation from "src/pages/deduction-page/DeductionNavigation";

const AppUserRoutes = () => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" />;
  return (
    <Routes>
      <Route path="income" element={<IncomePage />} />
      <Route path="deduction" element={<DeductionPage />}>
        <Route path="" element={<DeductionNavigation />} />
        <Route path="rent" element={<Rent />} />
        <Route path="section-24" element={<Section24 />} />
        <Route path="section-80C" element={<Section80C />} />
        <Route path="chapter-VIA" element={<ChapterVI />} />
        <Route path="others" element={<OtherDeduction />} />
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
