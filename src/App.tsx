import { BrowserRouter } from 'react-router-dom';
// components
import { PrivateLayout } from './components/common/PrivateLayout/PrivateLayout';
import { TaxCalculator } from './pages/income-tax-calculator/TaxCalculator';

// styles
import './App.scss';
function App() {
  return (
   
    <BrowserRouter>
        <PrivateLayout>
          <TaxCalculator />
        </PrivateLayout>
    </BrowserRouter>
  );
}

export default App;
