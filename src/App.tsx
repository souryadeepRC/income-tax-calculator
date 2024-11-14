import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// library
import { ToastContainer } from "react-toastify";
// components
import { TaxCalculator } from "src/pages/income-tax-calculator/TaxCalculator";
// hooks
// store
import { rootStore } from "src/store/root-store";
// styles
import "./App.scss";
function App() {
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
