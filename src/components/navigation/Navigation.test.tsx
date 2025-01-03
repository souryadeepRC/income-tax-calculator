import { screen, render, fireEvent } from "@testing-library/react";
import NavigationDesktop from "./NavigationDesktop";
import { MemoryRouter } from "react-router";
import NavigationMobile from "./NavigationMobile";

const checkNavigationOptions = () => {
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByTestId("HomeIcon")).toBeInTheDocument();
  expect(screen.getByText("Income")).toBeInTheDocument();
  expect(screen.getByTestId("SavingsIcon")).toBeInTheDocument();
  expect(screen.getByText("Deduction")).toBeInTheDocument();
  expect(screen.getByTestId("AccountBalanceWalletIcon")).toBeInTheDocument();
  expect(screen.getByText("Tax Breakup")).toBeInTheDocument();
  expect(screen.getByTestId("DashboardIcon")).toBeInTheDocument();
};
describe("NavigationDesktop Component", () => {
  test("render all navigation options with text in desktop mode", () => {
    render(
      <MemoryRouter>
        <NavigationDesktop />
      </MemoryRouter>
    );
    checkNavigationOptions();
  });
});
describe("NavigationMobile Component", () => {
  test("render all navigation options and also check the close slider", () => {
    render(
      <MemoryRouter>
        <NavigationMobile />
      </MemoryRouter>
    );

    expect(screen.queryByText("Home")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("navigation-menu-btn"));

    checkNavigationOptions();

    fireEvent.click(screen.getByTestId("navigation-menu-close-btn"));

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });
});
