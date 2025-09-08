import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "../Provider";
import { TestWrapper } from "./test-utils";

describe("Provider", () => {
  it("should render children within ChakraProvider and ColorModeProvider", () => {
    const testId = "test-child";
    const TestChild = () => <div data-testid={testId}>Test Content</div>;

    render(
      <TestWrapper>
        <Provider>
          <TestChild />
        </Provider>
      </TestWrapper>
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render multiple children", () => {
    const TestChild1 = () => <div>Test Child 1</div>;
    const TestChild2 = () => <div>Test Child 2</div>;

    render(
      <TestWrapper>
        <Provider>
          <TestChild1 />
          <TestChild2 />
        </Provider>
      </TestWrapper>
    );

    expect(screen.getByText("Test Child 1")).toBeInTheDocument();
    expect(screen.getByText("Test Child 2")).toBeInTheDocument();
  });
});
