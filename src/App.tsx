import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// library
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer />
        <TaxCalculator />
      </Box>
    </BrowserRouter>
  );
}

export default App;
