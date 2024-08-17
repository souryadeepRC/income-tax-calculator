import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// library
import { ToastContainer } from "react-toastify";
// components
import { TaxCalculator } from "./pages/income-tax-calculator/TaxCalculator";
// hooks
// store
import { rootStore } from "./store/root-store";
// styles
import "./App.scss";
function App() {
  const name = "TEST";
  return (
    <BrowserRouter>
      <Provider store={rootStore}>
        <ToastContainer />
        <TaxCalculator />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
