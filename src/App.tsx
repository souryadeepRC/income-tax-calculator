import { useEffect } from "react";
import { BrowserRouter } from "react-router";
// library
import { useAppTheme } from "react-web-theme";
// components
import {
  Footer,
  Header,
  ScrollToTop,
} from "src/components/common/CommonComponents";
import TaxCalculator from "src/pages/income-tax-calculator/TaxCalculator";
// hooks
import { useMediaQuery } from "src/hooks/useMediaQuery";
// styles
import "./App.scss";

interface AppContainerProps {
  children: React.ReactElement;
}
const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  useMediaQuery();
  const appTheme = useAppTheme();
  useEffect(() => {
    if (appTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [appTheme]);
  return (
    <div data-testid="app-container" data-theme={appTheme}>
      {children}
    </div>
  );
};
const App: React.FC = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <TaxCalculator />
        <Footer />
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
