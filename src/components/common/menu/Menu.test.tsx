import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./Menu";

describe("test Menu Component", () => {
  test("render menu button and click to get all the options", () => {
    const option1Func = jest.fn();
    const option2Func = jest.fn();
    render(
      <Menu
        MenuIcon={<span>Icon</span>}
        actions={[
          { label: "Option 1", onClick: option1Func },
          {
            label: "Option 2",
            icon: <span>Option icon</span>,
            onClick: option2Func,
          },
        ]}
      />,
    );
    const iconBtn = screen.getByTestId("menu-icon-btn");
    expect(iconBtn).toBeInTheDocument();
    fireEvent.click(iconBtn);

    expect(screen.getByTestId("menu-item-Option 1")).toBeInTheDocument();
    expect(screen.getByTestId("menu-item-Option 2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("menu-item-Option 1"));
  });
});
