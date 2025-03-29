// hooks
import { useUserDetails } from "src/hooks";
// routes
import { AppRoutes } from "src/routes/AppRoutes";
// styles
import "./App.scss";

const AppContent = () => {
  useUserDetails();
  return (
    <section className="tax-section">
      <AppRoutes />
    </section>
  );
};

export default AppContent;
