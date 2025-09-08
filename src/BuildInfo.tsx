import { Table } from "@chakra-ui/react";

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const items = [
    {
      name: "Build Version",
      value: buildVersion,
    },
  ];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Value</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default BuildInfo;
