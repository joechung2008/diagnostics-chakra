import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";

// Mock the modules
vi.mock("../App", () => ({
  default: () => <div data-testid="app">App Component</div>,
}));

vi.mock("../Provider", () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="provider">{children}</div>
  ),
}));

vi.mock("../reportWebVitals", () => ({
  default: vi.fn(),
}));

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe("index.tsx", () => {
  let mockCreateRoot: Mock;
  let mockRoot: { render: Mock };

  beforeEach(async () => {
    // Reset mocks
    vi.clearAllMocks();

    // Get fresh mocks
    const reactDom = await import("react-dom/client");
    mockCreateRoot = vi.mocked(reactDom.createRoot);

    mockRoot = {
      render: vi.fn(),
    };
    mockCreateRoot.mockReturnValue(mockRoot);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should create root and render the app", async () => {
    // Mock document.getElementById
    const mockContainer = document.createElement("div");
    mockContainer.id = "root";
    vi.spyOn(document, "getElementById").mockReturnValue(mockContainer);

    // Import and execute the module
    await import("../index");

    expect(document.getElementById).toHaveBeenCalledWith("root");
    expect(mockCreateRoot).toHaveBeenCalledWith(mockContainer);
    expect(mockRoot.render).toHaveBeenCalledTimes(1);
  });
});
