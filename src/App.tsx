import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router";
// library
import { Box } from "@mui/material";
// components
import { TaxCalculator } from "src/pages/income-tax-calculator/TaxCalculator";
// styles
import "./App.scss";
import { selectAppTheme } from "./store/screen/screen-selectors";
function App() {
  const appTheme = useSelector(selectAppTheme);
  return (
    <BrowserRouter>
      <Box width={"100%"} height={"100%"} data-theme={appTheme}>
        <TaxCalculator />
      </Box>
    </BrowserRouter>
  );
}

export default App;
