import { render, screen } from "@testing-library/react";
import { Navigation, AppTheme } from "src/components/common/CommonComponents";
import Header from "./Header";
jest.mock("src/components/common/CommonComponents", () => ({
  Navigation: jest.fn(),
  AppTheme: jest.fn(),
}));
const MockNavigation = Navigation as jest.MockedFunction<typeof Navigation>;
const MockAppTheme = AppTheme as jest.MockedFunction<typeof AppTheme>;

describe("test Header Component", () => {
  test("render header UI", () => {
    MockNavigation.mockReturnValue(<div>Mocked Navigation</div>);
    MockAppTheme.mockReturnValue(<div>Mocked AppTheme</div>);
    render(<Header />);

    expect(screen.getByText("Tax Calculator")).toBeInTheDocument();
    expect(screen.getByText("Mocked Navigation")).toBeInTheDocument();
    expect(screen.getByText("Mocked AppTheme")).toBeInTheDocument();
  });
});
