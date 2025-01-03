import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("render footer content UI", () => {
    render(<Footer />);
    const footerTextElement = screen.getByText("Souryadeep Roy Chowdhury");
    expect(footerTextElement).toBeInTheDocument();
    fireEvent.click(footerTextElement);
    
  });
});
