import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import StageDefinition from "../StageDefinition";
import { TestWrapper } from "./test-utils";

describe("StageDefinition", () => {
  it("should render stage definitions heading", () => {
    const stageDefinition = { stage1: ["step1"] };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table with correct headers", () => {
    const stageDefinition = { stage1: ["step1"] };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render single stage with single step", () => {
    const stageDefinition = { build: ["compile"] };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render stage with multiple steps joined by comma", () => {
    const stageDefinition = { deploy: ["build", "test", "package"] };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render multiple stages", () => {
    const stageDefinition = {
      build: ["compile", "lint"],
      test: ["unit", "integration"],
      deploy: ["package", "upload"],
    };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle empty stage definition", () => {
    const stageDefinition = {};

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle stage with empty steps array", () => {
    const stageDefinition = { emptyStage: [] };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table with correct accessibility attributes", () => {
    const stageDefinition = { stage1: ["step1"] };

    const { asFragment } = render(
      <TestWrapper>
        <StageDefinition stageDefinition={stageDefinition} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
