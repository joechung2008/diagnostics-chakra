import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Configuration from "../Configuration";
import { TestWrapper } from "./test-utils";

describe("Configuration", () => {
  it("should render configuration heading", () => {
    const config = { key1: "value1" };

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table with correct headers", () => {
    const config = { key1: "value1" };

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render single configuration entry", () => {
    const config = { apiUrl: "https://api.example.com" };

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render multiple configuration entries", () => {
    const config = {
      apiUrl: "https://api.example.com",
      timeout: "5000",
      retries: "3",
    };

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle empty config object", () => {
    const config = {};

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle special characters in values", () => {
    const config = { special: "value with spaces & symbols !@#$%" };

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table with correct accessibility attributes", () => {
    const config = { key1: "value1" };

    const { asFragment } = render(
      <TestWrapper>
        <Configuration config={config} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
