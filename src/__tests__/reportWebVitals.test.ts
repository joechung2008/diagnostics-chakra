import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import reportWebVitals from "../reportWebVitals";

// Mock web-vitals module
vi.mock("web-vitals", () => ({
  onCLS: vi.fn(),
  onINP: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

describe("reportWebVitals", () => {
  let mockOnCLS: Mock;
  let mockOnINP: Mock;
  let mockOnFCP: Mock;
  let mockOnLCP: Mock;
  let mockOnTTFB: Mock;

  beforeEach(async () => {
    const webVitals = vi.mocked(await import("web-vitals"));
    mockOnCLS = webVitals.onCLS;
    mockOnINP = webVitals.onINP;
    mockOnFCP = webVitals.onFCP;
    mockOnLCP = webVitals.onLCP;
    mockOnTTFB = webVitals.onTTFB;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should not call web-vitals functions when onPerfEntry is not provided", async () => {
    reportWebVitals();

    await new Promise(requestAnimationFrame);

    expect(mockOnCLS).not.toHaveBeenCalled();
    expect(mockOnINP).not.toHaveBeenCalled();
    expect(mockOnFCP).not.toHaveBeenCalled();
    expect(mockOnLCP).not.toHaveBeenCalled();
    expect(mockOnTTFB).not.toHaveBeenCalled();
  });

  it("should call all web-vitals functions when onPerfEntry is a valid function", async () => {
    const mockPerfEntry = vi.fn();

    reportWebVitals(mockPerfEntry);

    await new Promise(requestAnimationFrame);

    expect(mockOnCLS).toHaveBeenCalledWith(mockPerfEntry);
    expect(mockOnINP).toHaveBeenCalledWith(mockPerfEntry);
    expect(mockOnFCP).toHaveBeenCalledWith(mockPerfEntry);
    expect(mockOnLCP).toHaveBeenCalledWith(mockPerfEntry);
    expect(mockOnTTFB).toHaveBeenCalledWith(mockPerfEntry);
  });
});
