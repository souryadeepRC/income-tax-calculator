import { BrowserRouter } from "react-router";
// library
import { useAppTheme } from "react-web-theme";
// components
import {
  Footer,
  Header,
  ScrollToTop,
} from "src/components/common/CommonComponents";
import TaxCalculator from "./pages/income-tax-calculator/TaxCalculator";
// hooks
import { useMediaQuery } from "src/hooks/useMediaQuery";
// styles
import "./App.scss";

const App: React.FC = () => {
  const appTheme = useAppTheme();
  useMediaQuery();
  return (
    <BrowserRouter>
      <div data-testid="app-container" data-theme={appTheme}>
        <ScrollToTop />
        <Header />
        <TaxCalculator />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
