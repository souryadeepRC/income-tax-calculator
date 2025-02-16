import { BrowserRouter } from "react-router";
// library
import { Box } from "@mui/material";
import { useAppTheme } from "react-web-theme";
// components
import { Footer, Header } from "src/components/common/CommonComponents";
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
      <Box
        className="app__container"
        data-testid="app-container"
        data-theme={appTheme}
      >
        <Header />
        <TaxCalculator />
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
