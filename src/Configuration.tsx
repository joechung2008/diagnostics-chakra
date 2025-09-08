import { Table, Text } from "@chakra-ui/react";
import { useMemo } from "react";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const items = useMemo(
    () =>
      Object.entries(config).reduce<KeyValuePair<string>[]>(
        (previous, [key, value]) => [...previous, { key, value }],
        []
      ),
    [config]
  );

  return (
    <div>
      <Text id="configuration" as="h3" fontSize="lg" fontWeight="semibold">
        Configuration
      </Text>
      <Table.Root aria-labelledby="configuration">
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
              <Table.Cell>{item.value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Configuration;
