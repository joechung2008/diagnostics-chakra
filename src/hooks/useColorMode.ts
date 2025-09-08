import { useTheme } from "next-themes";

export type ColorMode = "light" | "dark" | "system";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme, theme } = useTheme();
  const colorMode = (forcedTheme || resolvedTheme) as ColorMode;
  const toggleColorMode = () => {
    const currentTheme = theme || resolvedTheme;
    if (currentTheme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    }
  };
  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}
