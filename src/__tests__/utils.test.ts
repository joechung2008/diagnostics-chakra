import { describe, it, expect } from "vitest";
import { isExtensionInfo, byKey, toNavLink } from "../utils";

describe("isExtensionInfo", () => {
  it("should return true for ExtensionInfo objects", () => {
    const extensionInfo: ExtensionInfo = {
      extensionName: "test-extension",
      config: { key: "value" },
    };

    expect(isExtensionInfo(extensionInfo)).toBe(true);
  });

  it("should return false for ExtensionError objects", () => {
    const extensionError: ExtensionError = {
      lastError: {
        errorMessage: "Test error",
        time: "2023-01-01T00:00:00Z",
      },
    };

    expect(isExtensionInfo(extensionError)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isExtensionInfo(undefined)).toBe(false);
  });
});

describe("byKey", () => {
  it("should return -1 when first key is less than second key", () => {
    const a: KeyedNavLink = { key: "a", name: "A" };
    const b: KeyedNavLink = { key: "b", name: "B" };

    expect(byKey(a, b)).toBe(-1);
  });

  it("should return 1 when first key is greater than second key", () => {
    const a: KeyedNavLink = { key: "b", name: "B" };
    const b: KeyedNavLink = { key: "a", name: "A" };

    expect(byKey(a, b)).toBe(1);
  });

  it("should return 0 when keys are equal", () => {
    const a: KeyedNavLink = { key: "a", name: "A" };
    const b: KeyedNavLink = { key: "a", name: "A" };

    expect(byKey(a, b)).toBe(0);
  });
});

describe("toNavLink", () => {
  it("should convert ExtensionInfo to KeyedNavLink", () => {
    const extensionInfo: ExtensionInfo = {
      extensionName: "test-extension",
      config: { key: "value" },
    };

    const expected: KeyedNavLink = {
      key: "test-extension",
      name: "test-extension",
      url: "",
    };

    expect(toNavLink(extensionInfo)).toEqual(expected);
  });

  it("should handle ExtensionInfo without config", () => {
    const extensionInfo: ExtensionInfo = {
      extensionName: "simple-extension",
    };

    const expected: KeyedNavLink = {
      key: "simple-extension",
      name: "simple-extension",
      url: "",
    };

    expect(toNavLink(extensionInfo)).toEqual(expected);
  });
});
