// components
import { Footer, Header } from "src/components/common/CommonComponents";
// hooks
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { useTaxCalculation } from "src/hooks/useTaxCalculation";
// routes
import { AppRoutes } from "src/routes/AppRoutes";
// styles
import "./TaxCalculator.scss";
const TaxSection = () => {
  useTaxCalculation();
  return (
    <section className="tax-section">
      <AppRoutes />
    </section>
  );
};
export const TaxCalculator = () => {
  // hooks
  useMediaQuery();
  return (
    <>
      <Header />
      <TaxSection />
      <Footer />
    </>
  );
};
