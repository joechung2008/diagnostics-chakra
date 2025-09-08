import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Extension from "../Extension";
import { TestWrapper } from "./test-utils";

// Mock the child components
vi.mock("../Configuration", () => ({
  default: ({ config }: { config: Record<string, string> }) => (
    <div data-testid="configuration">
      Configuration: {Object.keys(config).join(", ")}
    </div>
  ),
}));

vi.mock("../StageDefinition", () => ({
  default: ({
    stageDefinition,
  }: {
    stageDefinition: Record<string, string[]>;
  }) => (
    <div data-testid="stage-definition">
      Stage Definition: {Object.keys(stageDefinition).join(", ")}
    </div>
  ),
}));

describe("Extension", () => {
  it("should render extension name as heading", () => {
    const extensionName = "Test Extension";

    render(
      <TestWrapper>
        <Extension
          extensionName={extensionName}
          config={{ key1: "value1" }}
          stageDefinition={{ stage1: ["step1"] }}
        />
      </TestWrapper>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      extensionName
    );
  });

  it("should render Configuration component when config is provided", () => {
    const config = { key1: "value1", key2: "value2" };

    render(
      <TestWrapper>
        <Extension extensionName="Test Extension" config={config} />
      </TestWrapper>
    );

    expect(screen.getByTestId("configuration")).toBeInTheDocument();
    expect(screen.getByText("Configuration: key1, key2")).toBeInTheDocument();
  });

  it("should render StageDefinition component when stageDefinition is provided", () => {
    const stageDefinition = { stage1: ["step1"], stage2: ["step2"] };

    render(
      <TestWrapper>
        <Extension
          extensionName="Test Extension"
          stageDefinition={stageDefinition}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId("stage-definition")).toBeInTheDocument();
    expect(
      screen.getByText("Stage Definition: stage1, stage2")
    ).toBeInTheDocument();
  });

  it("should render both Configuration and StageDefinition when both are provided", () => {
    const config = { key1: "value1" };
    const stageDefinition = { stage1: ["step1"] };

    render(
      <TestWrapper>
        <Extension
          extensionName="Test Extension"
          config={config}
          stageDefinition={stageDefinition}
        />
      </TestWrapper>
    );

    expect(screen.getByTestId("configuration")).toBeInTheDocument();
    expect(screen.getByTestId("stage-definition")).toBeInTheDocument();
  });

  it("should not render Configuration when config is undefined", () => {
    render(
      <TestWrapper>
        <Extension
          extensionName="Test Extension"
          stageDefinition={{ stage1: ["step1"] }}
        />
      </TestWrapper>
    );

    expect(screen.queryByTestId("configuration")).not.toBeInTheDocument();
  });

  it("should not render StageDefinition when stageDefinition is undefined", () => {
    render(
      <TestWrapper>
        <Extension extensionName="Test Extension" config={{ key1: "value1" }} />
      </TestWrapper>
    );

    expect(screen.queryByTestId("stage-definition")).not.toBeInTheDocument();
  });

  it("should render with correct flex layout", () => {
    render(
      <TestWrapper>
        <Extension extensionName="Test Extension" config={{ key1: "value1" }} />
      </TestWrapper>
    );

    const flexContainer = screen.getByRole("heading", {
      level: 2,
    }).parentElement;
    expect(flexContainer).toHaveStyle({ display: "flex" });
    expect(flexContainer).toHaveStyle({ flexDirection: "column" });
  });
});
