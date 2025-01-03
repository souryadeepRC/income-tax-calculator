import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router";
// library
import { Box } from "@mui/material";
// components
import { Footer, Header } from "src/components/common/CommonComponents";
import TaxCalculator from "./pages/income-tax-calculator/TaxCalculator";
// hooks
import { useMediaQuery } from "src/hooks/useMediaQuery";
// store
import { selectAppTheme } from "src/store/screen/screen-selectors";
// types
import { AppTheme } from "src/types/screen-types";
// styles
import "./App.scss";

const App: React.FC = () => {
  useMediaQuery();
  const appTheme: AppTheme = useSelector(selectAppTheme);
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
