import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// components
import { PrivateLayout } from "./components/common/PrivateLayout/PrivateLayout";
import { TaxCalculator } from "./pages/income-tax-calculator/TaxCalculator";
// store
import { rootStore } from "./store/root-store";

// styles
import "./App.scss";
function App() {
  return (
    <BrowserRouter>
      <Provider store={rootStore}>
        <PrivateLayout>
          <TaxCalculator />
        </PrivateLayout>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
