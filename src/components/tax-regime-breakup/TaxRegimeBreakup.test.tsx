import { render, screen } from "@testing-library/react";
import { formatNumber } from "src/utils/tax-calculation";
import TaxRegimeBreakup from "./TaxRegimeBreakup";
jest.mock("src/utils/tax-calculation", () => ({
  formatNumber: jest.fn(),
}));
const mockedFormatNumber = formatNumber as jest.MockedFunction<
  typeof formatNumber
>;

describe("test TaxRegimeBreakup Component", () => {
  mockedFormatNumber.mockReturnValue(100.1);
  const setup = (regimeType: string, isBestChoice: boolean = false) => {
    render(
      <TaxRegimeBreakup
        regimeType={regimeType}
        isBestChoice={isBestChoice}
        details={{
          monthlyTax: 100,
          yearlyTax: 1000,
          baseTax: 200,
          cessAmount: 300,
          taxableAmount: 400,
          deductedAmount: 500,
        }}
      />
    );
  };
  test("render the tax regime details with best choice alert", () => {
    setup("New", true);
    expect(screen.getByTestId("regime-label")).toHaveTextContent(
      "New Tax Regime"
    );
    expect(screen.getByText("Best Choice")).toBeInTheDocument();
    expect(mockedFormatNumber).toHaveBeenCalledTimes(6);
    expect(mockedFormatNumber).nthCalledWith(1,100);
    expect(mockedFormatNumber).nthCalledWith(2,1000);
    expect(mockedFormatNumber).nthCalledWith(3,200);
    expect(mockedFormatNumber).nthCalledWith(4,300);
    expect(mockedFormatNumber).nthCalledWith(5,400);
    expect(mockedFormatNumber).nthCalledWith(6,500);
  });
  test("render the tax regime details without best choice alert", () => {
    setup("Old");
    expect(screen.getByTestId("regime-label")).toHaveTextContent(
      "Old Tax Regime"
    );
    expect(screen.queryByText("Best Choice")).not.toBeInTheDocument();
  });
});
