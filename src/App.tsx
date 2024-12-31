import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router";
// library
import { Box } from "@mui/material";
// components
import { TaxCalculator } from "src/pages/income-tax-calculator/TaxCalculator";
// store
import { selectAppTheme } from "src/store/screen/screen-selectors";
// styles
import "./App.scss";

function App() {
  const appTheme = useSelector(selectAppTheme);
  return (
    <BrowserRouter>
      <Box
        data-testid="app-container"
        width={"100%"}
        height={"100%"}
        data-theme={appTheme}
      >
        <TaxCalculator />
      </Box>
    </BrowserRouter>
  );
}

export default App;
