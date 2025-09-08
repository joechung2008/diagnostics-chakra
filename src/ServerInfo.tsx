import { Table } from "@chakra-ui/react";

const ServerInfo: React.FC<ServerInfoProps> = ({
  deploymentId,
  extensionSync,
  hostname,
  nodeVersions,
  serverId,
  uptime,
}) => {
  const items = [
    {
      name: "Hostname",
      value: hostname,
    },
    {
      name: "Uptime",
      value: uptime,
    },
    {
      name: "Server ID",
      value: serverId,
    },
    {
      name: "Deployment ID",
      value: deploymentId,
    },
    {
      name: "Node Versions",
      value: nodeVersions,
    },
    {
      name: "Extension Sync | Total Sync All Count",
      value: extensionSync.totalSyncAllCount,
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

export default ServerInfo;
