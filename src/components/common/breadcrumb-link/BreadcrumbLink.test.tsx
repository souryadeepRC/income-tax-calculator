import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { BreadcrumbLink } from "src/components/common";
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLocation: jest.fn(),
}));
const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;
describe("Test BreadcrumbLink component", () => {
  beforeEach(() => {
    mockUseLocation.mockClear();
  });
  const renderBreadcrumb = (props = {}, pathname = "/test/parent/child") => {
    const mockLocation = {
      pathname,
      search: "",
      hash: "",
      state: null,
      key: "mock-key",
    };
    mockUseLocation.mockReturnValue(mockLocation);
    render(
      <MemoryRouter>
        <BreadcrumbLink {...props} />
      </MemoryRouter>
    );
  };
  test("render breadcrumb with default home config", () => {
    renderBreadcrumb();

    const firstElement = screen.getByTestId("test");
    const lastElement = screen.getByTestId("child");
    expect(firstElement).toBeInTheDocument();
    expect(firstElement).toHaveTextContent("test");
    expect(screen.getByTestId("parent")).toBeInTheDocument();
    expect(lastElement).toBeInTheDocument();
    expect(lastElement.tagName).toBe("SPAN");

    const arrows = screen.getAllByTestId("KeyboardDoubleArrowRightIcon");
    expect(arrows).toHaveLength(2);
  });
  test("render breadcrumb with parentPath", () => {
    renderBreadcrumb({
      parentPath: "test",
    });
    const firstElement = screen.getByTestId("test");
    expect(firstElement).toBeInTheDocument();
    expect(firstElement).toHaveTextContent("Home");
    expect(screen.getByTestId("parent")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();

    const arrows = screen.getAllByTestId("KeyboardDoubleArrowRightIcon");
    expect(arrows).toHaveLength(2);
  });
  test("render breadcrumb with homeIcon", () => {
    renderBreadcrumb({
      parentPath: "test",
      homeIcon: <span>ICON HOME</span>,
    });
    const firstElement = screen.getByTestId("test");
    expect(firstElement).toBeInTheDocument();
    expect(firstElement).toHaveTextContent("ICON HOME");
    expect(screen.getByTestId("parent")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();

    const arrows = screen.getAllByTestId("KeyboardDoubleArrowRightIcon");
    expect(arrows).toHaveLength(2);
  });
  test("handles empty pathname (no breadcrumb)", () => {
    renderBreadcrumb(
      {
        parentPath: "test",
        homeIcon: <span>ICON HOME</span>,
      },
      "/"
    );
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();
  });
  test("handles single pathname (no breadcrumb)", () => {
    renderBreadcrumb(
      {
        parentPath: "test",
        homeIcon: <span>ICON HOME</span>,
      },
      "/home"
    );
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();
  });
});
