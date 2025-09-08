import { Table, Text } from "@chakra-ui/react";
import { useMemo } from "react";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = useMemo(
    () =>
      Object.entries(stageDefinition).reduce<KeyValuePair<string[]>[]>(
        (previous, [key, value]) => [...previous, { key, value }],
        []
      ),
    [stageDefinition]
  );

  return (
    <div>
      <Text id="stage-definitions" as="h3" fontSize="lg" fontWeight="semibold">
        Stage Definitions
      </Text>
      <Table.Root aria-labelledby="stage-definitions">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Key</Table.ColumnHeader>
            <Table.ColumnHeader>Value</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.key}>
              <Table.Cell>{item.key}</Table.Cell>
              <Table.Cell>{item.value.join(", ")}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default StageDefinition;
