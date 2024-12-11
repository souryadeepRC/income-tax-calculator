import { render, screen } from "@testing-library/react";
import { PrivateLayout } from "./PrivateLayout";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Header, Footer } from "src/components/common/CommonComponents";

// Mocking Header, Footer, and useMediaQuery hook
jest.mock("src/hooks/useMediaQuery", () => ({
  useMediaQuery: jest.fn(),
}));
jest.mock("src/components/common/CommonComponents", () => ({
  Header: jest.fn(() => <div>Mocked Header</div>),
  Footer: jest.fn(() => <div>Mocked Footer</div>),
}));
const mockedUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;
const mockedFooter = Footer as jest.MockedFunction<typeof Footer>;
const mockedHeader = Header as jest.MockedFunction<typeof Header>;

describe("test PrivateLayout Component", () => {
  beforeEach(() => {
    mockedUseMediaQuery.mockClear();
    mockedHeader.mockClear();
    mockedFooter.mockClear();
  });
  test("render children and call useMediaQuery hook", () => {
    mockedUseMediaQuery.mockReturnValue("MOBILE");
    mockedHeader.mockReturnValue(<div>Mocked Header</div>);
    mockedFooter.mockReturnValue(<div>Mocked Footer</div>);
    render(
      <PrivateLayout>
        <span>Test Child</span>
      </PrivateLayout>
    );
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
    expect(screen.getByText("Mocked Footer")).toBeInTheDocument();
    expect(mockedUseMediaQuery).toBeCalledTimes(1);
  });
});
