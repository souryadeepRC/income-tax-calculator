import { render, screen } from "@testing-library/react";
import Select from "./Select"; // Adjust the import based on your file structure
import { MenuItem } from "@mui/material"; // Import MenuItem if needed for testing options

describe("Select Component", () => {
  it("should render the label and children options correctly", () => {
    render(
      <Select label="Test Label" value="option1">
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
      </Select>,
    );

    // Check if the label is rendered
    expect(screen.getByText("Test Label")).toBeInTheDocument();

    // Check if options are rendered
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });
});
