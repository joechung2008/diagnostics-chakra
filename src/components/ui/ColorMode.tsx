import { useColorMode } from "@/hooks/useColorMode";
import {
  ClientOnly,
  IconButton,
  Skeleton,
  Span,
  type IconButtonProps,
  type SpanProps,
} from "@chakra-ui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem={true}
      defaultTheme="system"
      {...props}
    />
  );
}
export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

export function ColorModeButton({
  ref,
  ...props
}: Omit<IconButtonProps, "aria-label"> & {
  ref?: React.Ref<HTMLButtonElement>;
}) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
}

export function LightMode({
  ref,
  ...props
}: SpanProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme light"
      colorPalette="gray"
      colorScheme="light"
      ref={ref}
      {...props}
    />
  );
}

export function DarkMode({
  ref,
  ...props
}: SpanProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <Span
      color="fg"
      display="contents"
      className="chakra-theme dark"
      colorPalette="gray"
      colorScheme="dark"
      ref={ref}
      {...props}
    />
  );
}
