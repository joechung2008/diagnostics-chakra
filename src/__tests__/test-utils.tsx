import { ColorModeProvider } from "@/components/ui/ColorMode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { type ReactNode } from "react";

export function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <ColorModeProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </ColorModeProvider>
  );
}
