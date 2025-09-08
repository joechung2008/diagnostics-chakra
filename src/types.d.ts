interface BuildInfoProps {
  buildVersion: string;
}

interface ConfigurationProps {
  config: Record<string, string>;
}

interface Diagnostics {
  buildInfo: BuildInfoProps;
  extensions: Record<string, Extension>;
  serverInfo: ServerInfoProps;
}

type Extension = ExtensionInfo | ExtensionError;

interface ExtensionError {
  lastError: {
    errorMessage: string;
    time: string;
  };
}

interface ExtensionInfo {
  extensionName: string;
  config?: Record<string, string>;
  stageDefinition?: Record<string, string[]>;
}

type ExtensionProps = ExtensionInfo;

interface ExtensionsProps {
  extensions: Record<string, Extension>;
  onLinkClick(ev?: React.MouseEvent, item?: KeyedNavLink);
}

interface KeyValuePair<TValue> {
  key: string;
  value: TValue;
}

// Remove Fluent UI 8 dependency and define KeyedNavLink locally
type KeyedNavLink = {
  key: string;
  name: string;
  url?: string;
  [prop: string]: unknown;
};

interface ServerInfoProps {
  deploymentId: string;
  extensionSync: {
    totalSyncAllCount: number;
  };
  hostname: string;
  nodeVersions: string;
  serverId: string;
  uptime: number;
}

interface StageDefinitionProps {
  stageDefinition: Record<string, string[]>;
}
