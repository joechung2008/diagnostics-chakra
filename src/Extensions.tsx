import { byKey, isExtensionInfo, toNavLink } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useMemo } from "react";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = useMemo(
    () =>
      Object.values(extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey),
    [extensions]
  );

  return (
    <Flex
      as="nav"
      flexDirection="column"
      gap="2"
      maxH="max-content"
      overflowY="auto"
      p="1"
      aria-label="Extensions"
    >
      {links.map((link) => (
        <Button
          key={link.key}
          variant="ghost"
          justifyContent="flex-start"
          textAlign="left"
          width="100%"
          minHeight="max-content"
          boxSizing="border-box"
          onClick={(e) => onLinkClick?.(e, link)}
        >
          {link.name}
        </Button>
      ))}
    </Flex>
  );
};

export default Extensions;
