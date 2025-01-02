import { render, screen } from "@testing-library/react";
import DataLayout from "./DataLayout";

describe("test DataLayout component", () => {
  test("render the header text and aggregate amount", () => {
    render(
      <DataLayout headerText="Test Header" aggregateAmount={100}>
        <span>Test Child</span>
      </DataLayout>
    );
    expect(screen.getByTestId("layout-header")).toHaveTextContent(
      "Test Header"
    );
    expect(screen.getByTestId("layout-amount")).toHaveTextContent("Rs. 100");
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
  test("render for no aggregate  amount", () => {
    render(
      <DataLayout headerText="Test Header">
        <span>Test Child</span>
      </DataLayout>
    );
    expect(screen.getByTestId("layout-header")).toHaveTextContent(
      "Test Header"
    );
    expect(screen.queryByTestId("layout-amount")).not.toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
