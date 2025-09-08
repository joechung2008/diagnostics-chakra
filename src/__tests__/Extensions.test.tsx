import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Extensions from "../Extensions";
import { TestWrapper } from "./test-utils";

describe("Extensions", () => {
  it("should render extensions as buttons", () => {
    const extensions = {
      ext1: {
        extensionName: "Extension One",
        config: { key: "value" },
      },
      ext2: {
        extensionName: "Extension Two",
        config: { key: "value" },
      },
    };

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={() => {}} />
      </TestWrapper>
    );

    expect(
      screen.getByRole("button", { name: "Extension One" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Extension Two" })
    ).toBeInTheDocument();
  });

  it("should sort extensions alphabetically by key", () => {
    const extensions = {
      z_ext: {
        extensionName: "Z Extension",
        config: { key: "value" },
      },
      a_ext: {
        extensionName: "A Extension",
        config: { key: "value" },
      },
    };

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={() => {}} />
      </TestWrapper>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent("A Extension");
    expect(buttons[1]).toHaveTextContent("Z Extension");
  });

  it("should filter out ExtensionError objects", () => {
    const extensions = {
      good_ext: {
        extensionName: "Good Extension",
        config: { key: "value" },
      },
      bad_ext: {
        lastError: {
          errorMessage: "Something went wrong",
          time: "2023-01-01T00:00:00Z",
        },
      },
    };

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={() => {}} />
      </TestWrapper>
    );

    expect(
      screen.getByRole("button", { name: "Good Extension" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Bad Extension" })
    ).not.toBeInTheDocument();
  });

  it("should handle empty extensions object", () => {
    const extensions = {};

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={() => {}} />
      </TestWrapper>
    );

    // Should render nav element but no buttons
    expect(
      screen.getByRole("navigation", { name: "Extensions" })
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("should call onLinkClick when button is clicked", () => {
    const mockOnLinkClick = vi.fn();
    const extensions = {
      ext1: {
        extensionName: "Test Extension",
        config: { key: "value" },
      },
    };

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={mockOnLinkClick} />
      </TestWrapper>
    );

    const button = screen.getByRole("button", { name: "Test Extension" });
    fireEvent.click(button);

    expect(mockOnLinkClick).toHaveBeenCalledTimes(1);
    expect(mockOnLinkClick).toHaveBeenCalledWith(
      expect.any(Object), // MouseEvent
      expect.objectContaining({
        key: "Test Extension",
        name: "Test Extension",
        url: "",
      })
    );
  });

  it("should handle extensions without config", () => {
    const extensions = {
      ext1: {
        extensionName: "Simple Extension",
        // No config
      },
    };

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={() => {}} />
      </TestWrapper>
    );

    expect(
      screen.getByRole("button", { name: "Simple Extension" })
    ).toBeInTheDocument();
  });

  it("should render with correct navigation attributes", () => {
    const extensions = {
      ext1: {
        extensionName: "Test Extension",
        config: { key: "value" },
      },
    };

    render(
      <TestWrapper>
        <Extensions extensions={extensions} onLinkClick={() => {}} />
      </TestWrapper>
    );

    const nav = screen.getByRole("navigation", { name: "Extensions" });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("aria-label", "Extensions");
  });
});
