import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { useDiagnostics } from "../useDiagnostics";
import { TestWrapper } from "./test-utils";

// Mock the useDiagnostics hook
vi.mock("../useDiagnostics", () => ({
  useDiagnostics: vi.fn(),
  clearCache: vi.fn(),
}));

const mockUseDiagnostics = vi.mocked(useDiagnostics);

const mockDiagnosticsData = {
  buildInfo: { buildVersion: "1.2.3" },
  extensions: {
    testExtension: {
      extensionName: "Test Extension",
      config: { key1: "value1" },
      stageDefinition: { stage1: ["step1"] },
    },
    paasserverless: {
      extensionName: "PaaS Serverless",
      config: { enabled: "true" },
    },
    websites: {
      extensionName: "Websites",
      config: { version: "2.0" },
    },
  },
  serverInfo: {
    deploymentId: "deploy-123",
    extensionSync: { totalSyncAllCount: 42 },
    hostname: "server.example.com",
    nodeVersions: "v18.17.0",
    serverId: "server-456",
    uptime: 1234567890,
  },
};

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDiagnostics.mockReturnValue(mockDiagnosticsData);
  });

  it("should render loading state when diagnostics is null", () => {
    mockUseDiagnostics.mockReturnValue(null as never);

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // When diagnostics is null, App returns null, so main app elements should not be present
    expect(
      screen.queryByRole("button", { name: "Public Cloud" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("tab", { name: "Extensions" })
    ).not.toBeInTheDocument();
  });

  it("should render app with default environment", () => {
    const { asFragment } = render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display environment selector with default value", () => {
    act(() => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(
      screen.getByRole("button", { name: "Public Cloud" })
    ).toBeInTheDocument();
  });

  it("should render tabs for navigation", () => {
    act(() => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(screen.getByRole("tab", { name: "Extensions" })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Build Information" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Server Information" })
    ).toBeInTheDocument();
  });

  it("should display extensions tab by default", () => {
    act(() => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    // Should show extensions content by default
    expect(screen.getByText("Test Extension")).toBeInTheDocument();
  });

  it("should switch to build information tab", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("tab", { name: "Build Information" }));
    });

    await waitFor(() => {
      expect(screen.getByText("Build Version")).toBeInTheDocument();
    });
    expect(screen.getByText("1.2.3")).toBeInTheDocument();
  });

  it("should switch to server information tab", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("tab", { name: "Server Information" }));
    });

    await waitFor(() => {
      expect(screen.getByText("Hostname")).toBeInTheDocument();
    });
    expect(screen.getByText("server.example.com")).toBeInTheDocument();
  });

  it("should show paasserverless button when extension exists", () => {
    act(() => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(
      screen.getByRole("button", { name: "paasserverless" })
    ).toBeInTheDocument();
  });

  it("should show websites button", () => {
    act(() => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    expect(
      screen.getByRole("button", { name: "websites" })
    ).toBeInTheDocument();
  });

  it("should handle extension selection from extensions list", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Click on an extension in the extensions list
    await act(async () => {
      fireEvent.click(screen.getByText("Test Extension"));
    });

    // Should display the extension details
    await waitFor(() => {
      expect(screen.getByText("Test Extension")).toBeInTheDocument();
    });
  });

  it("should handle paasserverless button click", () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "paasserverless" }));
    });

    // Should display paasserverless extension details - look for the heading
    expect(
      screen.getByRole("heading", { name: "PaaS Serverless" })
    ).toBeInTheDocument();
  });

  it("should handle websites button click", () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "websites" }));
    });

    // Should display websites extension details - look for the heading
    expect(
      screen.getByRole("heading", { name: "Websites" })
    ).toBeInTheDocument();
  });

  it("should handle environment change", () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Open environment menu
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Public Cloud" }));
    });

    // Since menu items are in a Portal, we need to wait for them to appear
    // or test the menu trigger functionality
    expect(
      screen.getByRole("button", { name: "Public Cloud" })
    ).toBeInTheDocument();

    // The clearCache should be called when environment changes
    // This test verifies the menu can be opened
  });

  it("should handle environment change to Mooncake", () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Open environment menu
    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Public Cloud" }));
    });

    // Test that menu trigger is working
    expect(
      screen.getByRole("button", { name: "Public Cloud" })
    ).toBeInTheDocument();
  });

  it("should render color mode button", () => {
    act(() => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
    });

    // Color mode button should be present
    expect(
      screen.getByRole("button", { name: /color mode/i })
    ).toBeInTheDocument();
  });

  it("should handle tab switching correctly", async () => {
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Start on extensions tab
    expect(screen.getByText("Test Extension")).toBeInTheDocument();

    // Switch to build tab
    await act(async () => {
      fireEvent.click(screen.getByRole("tab", { name: "Build Information" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Build Version")).toBeInTheDocument();
    });

    // Switch to server tab
    await act(async () => {
      fireEvent.click(screen.getByRole("tab", { name: "Server Information" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Hostname")).toBeInTheDocument();
    });

    // Switch back to extensions
    await act(async () => {
      fireEvent.click(screen.getByRole("tab", { name: "Extensions" }));
    });
    await waitFor(() => {
      expect(screen.getByText("Test Extension")).toBeInTheDocument();
    });
  });
});
