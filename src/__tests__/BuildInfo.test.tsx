import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BuildInfo from "../BuildInfo";
import { TestWrapper } from "./test-utils";

describe("BuildInfo", () => {
  it("should render build version in table", () => {
    const buildVersion = "1.2.3";

    const { asFragment } = render(
      <TestWrapper>
        <BuildInfo buildVersion={buildVersion} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table with correct headers", () => {
    const buildVersion = "1.0.0";

    const { asFragment } = render(
      <TestWrapper>
        <BuildInfo buildVersion={buildVersion} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table row with build version data", () => {
    const buildVersion = "2.1.0";

    const { asFragment } = render(
      <TestWrapper>
        <BuildInfo buildVersion={buildVersion} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle different build version formats", () => {
    const buildVersion = "v3.0.0-beta.1";

    const { asFragment } = render(
      <TestWrapper>
        <BuildInfo buildVersion={buildVersion} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
