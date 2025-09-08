import { ColorModeProvider } from "@/components/ui/ColorMode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </ColorModeProvider>
  );
}
