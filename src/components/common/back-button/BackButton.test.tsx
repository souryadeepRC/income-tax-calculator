import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import BackButton from "./BackButton";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(),
}));
describe("test BackButton component", () => {
  const setup = () => {
    const mockNavigate = jest.fn();
    require("react-router").useNavigate.mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>,
    );
    return { mockNavigate };
  };
  test("render back button and navigate to back path after clicking", () => {
    const { mockNavigate } = setup();
    expect(screen.getByTestId("back-btn")).toHaveTextContent("Back");

    fireEvent.click(screen.getByTestId("back-btn"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
