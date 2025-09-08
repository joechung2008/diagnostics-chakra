import BuildInfo from "@/BuildInfo";
import { ColorModeButton } from "@/components/ui/ColorMode";
import Extension from "@/Extension";
import Extensions from "@/Extensions";
import ServerInfo from "@/ServerInfo";
import { clearCache, useDiagnostics } from "@/useDiagnostics";
import { isExtensionInfo } from "@/utils";
import { Box, Button, Flex, Menu, Portal, Tabs } from "@chakra-ui/react";
import { startTransition, useCallback, useMemo, useState } from "react";

type Environment = (typeof Environment)[keyof typeof Environment];

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

function getEnvironnmentName(environment: Environment | undefined): string {
  switch (environment) {
    case Environment.Public:
      return "Public Cloud";
    case Environment.Fairfax:
      return "Fairfax";
    case Environment.Mooncake:
      return "Mooncake";
    default:
      return "Select environment";
  }
}

const App: React.FC = () => {
  const [environments, setEnvironments] = useState<
    Record<string, Environment[]>
  >({
    environment: [Environment.Public],
  });
  const environment = useMemo<Environment>(
    () => environments.environment[0],
    [environments.environment]
  );
  const diagnostics = useDiagnostics(environment);
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const handleLinkClick: ExtensionsProps["onLinkClick"] = useCallback(
    (_, item) => {
      if (item) {
        const $extension = diagnostics?.extensions[item.key];
        if (isExtensionInfo($extension)) {
          setExtension($extension);
        }
      }
    },
    [diagnostics?.extensions]
  );

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const environmentName = useMemo(
    () => getEnvironnmentName(environment),
    [environment]
  );

  const handleEnvironmentChange = useCallback((value: string) => {
    if (value) {
      startTransition(() => {
        setEnvironments((previous) => ({
          ...previous,
          environment: [value as Environment],
        }));
        setExtension(undefined);
      });
      clearCache();
    }
  }, []);

  if (!diagnostics) {
    return null;
  }

  return (
    <Flex flexDirection="column" h="100vh" p="1">
      <Flex justify="space-between">
        <Flex gap="1">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="outline">{environmentName}</Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  {Object.entries(Environment).map(([key, value]) => (
                    <Menu.Item
                      key={key}
                      value={value}
                      onClick={() => handleEnvironmentChange(value)}
                    >
                      {getEnvironnmentName(value)}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          {showPaasServerless && (
            <Button
              key="paasserverless"
              variant="ghost"
              onClick={() => {
                const paasserverless =
                  diagnostics?.extensions["paasserverless"];
                if (isExtensionInfo(paasserverless)) {
                  setExtension(paasserverless);
                }
              }}
            >
              paasserverless
            </Button>
          )}
          <Button
            key="websites"
            variant="ghost"
            onClick={() => {
              const websites = diagnostics?.extensions["websites"];
              if (isExtensionInfo(websites)) {
                setExtension(websites);
              }
            }}
          >
            websites
          </Button>
        </Flex>
        <ColorModeButton />
      </Flex>
      <Tabs.Root
        value={selectedTab}
        onValueChange={(details) => setSelectedTab(details.value)}
      >
        <Tabs.List>
          <Tabs.Trigger aria-controls="extensions-tab" value="extensions">
            Extensions
          </Tabs.Trigger>
          <Tabs.Trigger aria-controls="build-tab" value="build">
            Build Information
          </Tabs.Trigger>
          <Tabs.Trigger aria-controls="server-tab" value="server">
            Server Information
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
      {selectedTab === "extensions" && diagnostics?.extensions && (
        <Box id="extensions-tab" flex="1" overflowY="auto" role="tabpanel">
          <Flex flexDirection="row" gap="4" h="100%">
            <Extensions
              extensions={diagnostics.extensions}
              onLinkClick={handleLinkClick}
            />
            {extension && <Extension {...extension} />}
          </Flex>
        </Box>
      )}
      {selectedTab === "build" && diagnostics?.buildInfo && (
        <Box id="build-tab" flex="1" overflowY="auto" role="tabpanel">
          <BuildInfo {...diagnostics.buildInfo} />
        </Box>
      )}
      {selectedTab === "server" && diagnostics?.serverInfo && (
        <Box id="server-tab" flex="1" overflowY="auto" role="tabpanel">
          <ServerInfo {...diagnostics.serverInfo} />
        </Box>
      )}
    </Flex>
  );
};

export default App;
