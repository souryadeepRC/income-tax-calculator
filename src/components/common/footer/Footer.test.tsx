import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("test Footer Component", () => {
  test("render footer content UI", () => {
    render(<Footer />);
    expect(screen.getByText("Souryadeep Roy Chowdhury")).toBeInTheDocument();
  });
});
