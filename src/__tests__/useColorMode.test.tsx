import { ColorModeProvider } from "@/components/ui/ColorMode";
import { act, renderHook } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { useColorMode, useColorModeValue } from "../hooks/useColorMode";

const LightWrapper = ({ children }: { children: React.ReactNode }) => (
  <ColorModeProvider defaultTheme="light">{children}</ColorModeProvider>
);

const DarkWrapper = ({ children }: { children: React.ReactNode }) => (
  <ColorModeProvider defaultTheme="dark">{children}</ColorModeProvider>
);

describe("useColorMode", () => {
  it("should return default color mode", () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: ColorModeProvider,
    });

    expect(result.current.colorMode).toBeDefined();
    expect(["light", "dark", "system"]).toContain(result.current.colorMode);
  });

  it("should toggle color mode", () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: ColorModeProvider,
    });

    const initialMode = result.current.colorMode;

    act(() => {
      result.current.toggleColorMode();
    });

    // After toggle, it should be different
    expect(result.current.colorMode).not.toBe(initialMode);
  });

  it("should set color mode", () => {
    const { result } = renderHook(() => useColorMode(), {
      wrapper: ColorModeProvider,
    });

    act(() => {
      result.current.setColorMode("dark");
    });

    expect(result.current.colorMode).toBe("dark");

    act(() => {
      result.current.setColorMode("light");
    });

    expect(result.current.colorMode).toBe("light");
  });
});

describe("useColorModeValue", () => {
  it("should return light value when color mode is light", () => {
    const { result } = renderHook(
      () => useColorModeValue("light-value", "dark-value"),
      {
        wrapper: LightWrapper,
      }
    );

    expect(result.current).toBe("light-value");
  });

  it("should return dark value when color mode is dark", () => {
    // First set to dark
    const { result: modeResult } = renderHook(() => useColorMode(), {
      wrapper: DarkWrapper,
    });

    act(() => {
      modeResult.current.setColorMode("dark");
    });

    // Then test useColorModeValue
    const { result } = renderHook(
      () => useColorModeValue("light-value", "dark-value"),
      {
        wrapper: DarkWrapper,
      }
    );

    expect(result.current).toBe("dark-value");
  });
});
