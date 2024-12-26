import { render, screen } from "@testing-library/react";
import { AppRoutes } from "./AppRoutes"; // Adjust the import based on your file structure
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { rootStore } from "src/store/root-store";

describe("test AppRoutes", () => {
  test("should render the Landing page by default", async () => {
    render(
      <Provider store={rootStore}>
        <MemoryRouter>
          <AppRoutes />
        </MemoryRouter>
      </Provider>
    );

    // Use findByText if content is rendered asynchronously
    const landingText = await screen.findByText(
      "Instant Tax Calculator: Know Your Tax in Seconds!"
    );

    // Check if the Landing page text is in the document
    expect(landingText).toBeInTheDocument();
  });
});
