import { screen, render } from "@testing-library/react";
import { useSelector } from "react-redux";
import TaxRegimeBreakup from "src/components/tax-regime-breakup/TaxRegimeBreakup";
import TaxBreakupPage from "./TaxBreakupPage";
import { formatNumber } from "src/utils/tax-calculation";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("src/components/tax-regime-breakup/TaxRegimeBreakup", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Tax Regime Breakup</div>),
}));
jest.mock("src/utils/tax-calculation", () => ({
  formatNumber: jest.fn(),
}));
const MockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const MockFormatNumber = formatNumber as jest.MockedFunction<
  typeof formatNumber
>;
const MockTaxRegimeBreakup = TaxRegimeBreakup as jest.MockedFunction<
  typeof TaxRegimeBreakup
>;
describe("test TaxBreakupPage component", () => {
  test("render the page and match the header message", () => {
    MockUseSelector.mockReturnValue({
      choice: { difference: 100.45588, type: "New" },
      newScheme: { taxDetails: "newSchemeDetails" },
      oldScheme: { taxDetails: "oldSchemeDetails" },
    });
    MockFormatNumber.mockReturnValue("100.45");
    render(<TaxBreakupPage />);
    expect(screen.getByTestId("tax-breakup-message")).toHaveTextContent(
      "You can save Rs.100.45 by choosing New Tax Regime"
    );

    expect(MockTaxRegimeBreakup).toHaveBeenCalledTimes(2);
    expect(MockTaxRegimeBreakup).toHaveBeenCalledWith(
      expect.objectContaining({
        regimeType: "New",
        details: { taxDetails: "newSchemeDetails" },
        isBestChoice: true, // As label is "New"
      }),
      {}
    );
    expect(MockTaxRegimeBreakup).toHaveBeenCalledWith(
      expect.objectContaining({
        regimeType: "Old",
        details: { taxDetails: "oldSchemeDetails" },
        isBestChoice: false, // As label is "New"
      }),
      {}
    );
  });
});
