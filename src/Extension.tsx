import Configuration from "@/Configuration";
import StageDefinition from "@/StageDefinition";
import { Flex, Text } from "@chakra-ui/react";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <Flex
      flexDirection="column"
      gap="2"
      maxH="max-content"
      overflowY="auto"
      p="1"
      flex="1"
    >
      <Text as="h2" fontSize="2xl" fontWeight="bold">
        {extensionName}
      </Text>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </Flex>
  );
};

export default Extension;
