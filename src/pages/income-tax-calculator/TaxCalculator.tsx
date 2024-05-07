// component
// styles
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "src/routes/AppRoutes";
import "./TaxCalculator.scss";
export const TaxCalculator = () => {
  return (
    <section className="tax-section">
      <ToastContainer />
      <AppRoutes />
    </section>
  );
};
