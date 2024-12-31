import { render, screen, fireEvent } from "@testing-library/react";
import Landing from "./Landing";
import { MemoryRouter, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectTaxChoice } from "src/store/tax/tax-selectors";
import { selectOverallIncomeAmount } from "src/store/income/income-selectors";
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
describe("Landing component", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
  });

  test("render the landing page with default content", () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectTaxChoice) {
        return {
          label: "Tax",
          taxAmount: { yearly: 100.5234876, monthly: 200.5234876 },
          difference: 10,
        };
      } else if (selector === selectOverallIncomeAmount) {
        return 1000;
      }
      return undefined;
    });
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.getByText(/Instant Tax Calculator:/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/You don't have to pay income tax/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText("Tax Rs.200.52/month")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("get-started-btn"));
    expect(mockNavigate).toHaveBeenCalledWith("/income");

    fireEvent.click(screen.getByTestId("modify-amount-btn"));
    expect(mockNavigate).toHaveBeenCalledWith("/income");

    fireEvent.click(screen.getByTestId("view-breakdown-btn"));
    expect(mockNavigate).toHaveBeenCalledWith("/tax-breakup");
  });
  test("validate no tax scenario", () => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector === selectTaxChoice) {
        return {
          label: "Tax",
          taxAmount: { yearly: 0, monthly: 0 },
          difference: null,
        };
      } else if (selector === selectOverallIncomeAmount) {
        return 1000;
      }
      return undefined;
    });
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/You don't have to pay income tax/i)
    ).toBeInTheDocument();
  });
});
