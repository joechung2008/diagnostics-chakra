import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, render } from "@testing-library/react";
import { Suspense } from "react";
import React from "react";
import { useDiagnostics, clearCache } from "../useDiagnostics";

// Mock fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// Test component to handle hook errors
function TestComponent({ environment }: { environment: string }) {
  const data = useDiagnostics(environment);
  return <div>{JSON.stringify(data)}</div>;
}

// Error boundary for testing
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

describe("useDiagnostics", () => {
  const mockEnvironment = "https://api.example.com/diagnostics";
  const mockDiagnosticsData = {
    buildInfo: { buildVersion: "1.0.0" },
    extensions: {},
    serverInfo: {
      deploymentId: "deploy-123",
      extensionSync: { totalSyncAllCount: 42 },
      hostname: "server.example.com",
      nodeVersions: "v18.17.0",
      serverId: "server-456",
      uptime: 1234567890,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  afterEach(() => {
    clearCache();
  });

  it("should fetch and return diagnostics data", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockDiagnosticsData),
    });

    const { result } = renderHook(() => useDiagnostics(mockEnvironment));

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(result.current).toEqual(mockDiagnosticsData);
    });

    expect(mockFetch).toHaveBeenCalledWith(mockEnvironment);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should cache the result for the same environment", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockDiagnosticsData),
    });

    // First call
    const { result: result1 } = renderHook(() =>
      useDiagnostics(mockEnvironment)
    );
    await waitFor(() => {
      expect(result1.current).toEqual(mockDiagnosticsData);
    });

    // Second call with same environment
    const { result: result2 } = renderHook(() =>
      useDiagnostics(mockEnvironment)
    );
    await waitFor(() => {
      expect(result2.current).toEqual(mockDiagnosticsData);
    });

    // Should only call fetch once due to caching
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should handle different environments separately", async () => {
    const mockData1 = {
      ...mockDiagnosticsData,
      buildInfo: { buildVersion: "1.0.0" },
    };
    const mockData2 = {
      ...mockDiagnosticsData,
      buildInfo: { buildVersion: "2.0.0" },
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData1),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData2),
      });

    // First environment
    const { result: result1 } = renderHook(() => useDiagnostics("env1"));
    await waitFor(() => {
      expect(result1.current.buildInfo.buildVersion).toBe("1.0.0");
    });

    // Second environment
    const { result: result2 } = renderHook(() => useDiagnostics("env2"));
    await waitFor(() => {
      expect(result2.current.buildInfo.buildVersion).toBe("2.0.0");
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should throw error when fetch fails", async () => {
    const errorMessage = "Network error";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: errorMessage,
    });

    const { findByText } = render(
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <TestComponent environment={mockEnvironment} />
        </Suspense>
      </ErrorBoundary>
    );

    // Wait for the error to be displayed
    const errorElement = await findByText(
      `Error: Failed to fetch diagnostics: ${errorMessage}`
    );
    expect(errorElement).toBeInTheDocument();
  });

  it("should rethrow cached errors", async () => {
    const errorMessage = "Network error";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: errorMessage,
    });

    // First render should fail
    const container1 = document.createElement("div");
    document.body.appendChild(container1);
    const { findByText: findByText1 } = render(
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <TestComponent environment={mockEnvironment} />
        </Suspense>
      </ErrorBoundary>,
      { container: container1 }
    );

    const errorElement1 = await findByText1(
      `Error: Failed to fetch diagnostics: ${errorMessage}`
    );
    expect(errorElement1).toBeInTheDocument();

    // Second render with same environment should also fail (cached error)
    const container2 = document.createElement("div");
    document.body.appendChild(container2);
    const { findByText: findByText2 } = render(
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <TestComponent environment={mockEnvironment} />
        </Suspense>
      </ErrorBoundary>,
      { container: container2 }
    );

    const errorElement2 = await findByText2(
      `Error: Failed to fetch diagnostics: ${errorMessage}`
    );
    expect(errorElement2).toBeInTheDocument();

    // Should only call fetch once
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should clear cache when clearCache is called", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockDiagnosticsData),
    });

    // First call
    const { result: result1 } = renderHook(() =>
      useDiagnostics(mockEnvironment)
    );
    await waitFor(() => {
      expect(result1.current).toEqual(mockDiagnosticsData);
    });

    // Clear cache
    clearCache();

    // Second call should fetch again
    const { result: result2 } = renderHook(() =>
      useDiagnostics(mockEnvironment)
    );
    await waitFor(() => {
      expect(result2.current).toEqual(mockDiagnosticsData);
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should handle JSON parsing errors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error("Invalid JSON")),
    });

    const { findByText } = render(
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <TestComponent environment={mockEnvironment} />
        </Suspense>
      </ErrorBoundary>
    );

    // Wait for the error
    const errorElement = await findByText("Error: Invalid JSON");
    expect(errorElement).toBeInTheDocument();
  });
});
