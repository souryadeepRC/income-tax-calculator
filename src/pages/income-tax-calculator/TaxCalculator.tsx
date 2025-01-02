import { memo } from "react";
// hooks
import { useTaxCalculation } from "src/hooks/useTaxCalculation";
// routes
import { AppRoutes } from "src/routes/AppRoutes";
// styles
import "./TaxCalculator.scss";

const TaxCalculator = () => {
  useTaxCalculation();
  return (
    <section className="tax-section">
      <AppRoutes />
    </section>
  );
};

export default memo(TaxCalculator);
