import { render, screen } from "@testing-library/react";
import RouteLayout from "./RouteLayout";

jest.mock("src/components/common/CommonComponents", () => ({
  BackButton: () => <button>Back</button>,
}));

describe("test AddIncome component", () => {
  test("render component with valid label", () => {
    render(
      <RouteLayout label="Test label">
        <span>Test Child Content</span>
      </RouteLayout>
    );
    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByTestId("route-layout-label")).toHaveTextContent(
      "Test label"
    );
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });
});
