import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ServerInfo from "../ServerInfo";
import { TestWrapper } from "./test-utils";

describe("ServerInfo", () => {
  const mockServerInfo = {
    deploymentId: "deploy-123",
    extensionSync: {
      totalSyncAllCount: 42,
    },
    hostname: "server.example.com",
    nodeVersions: "v18.17.0",
    serverId: "server-456",
    uptime: 1234567890,
  };

  it("should render all server information fields", () => {
    const { asFragment } = render(
      <TestWrapper>
        <ServerInfo {...mockServerInfo} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render table with correct headers", () => {
    const { asFragment } = render(
      <TestWrapper>
        <ServerInfo {...mockServerInfo} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correct number of rows", () => {
    const { asFragment } = render(
      <TestWrapper>
        <ServerInfo {...mockServerInfo} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle different data types", () => {
    const testData = {
      ...mockServerInfo,
      uptime: 987654321,
      nodeVersions: "v20.10.0",
      extensionSync: {
        totalSyncAllCount: 0,
      },
    };

    const { asFragment } = render(
      <TestWrapper>
        <ServerInfo {...testData} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle long hostnames", () => {
    const longHostname = "very-long-hostname-server.example.com";
    const testData = {
      ...mockServerInfo,
      hostname: longHostname,
    };

    const { asFragment } = render(
      <TestWrapper>
        <ServerInfo {...testData} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should handle special characters in values", () => {
    const testData = {
      ...mockServerInfo,
      hostname: "server_with_underscores.example.com",
      nodeVersions: "v18.17.0 (with extra info)",
    };

    const { asFragment } = render(
      <TestWrapper>
        <ServerInfo {...testData} />
      </TestWrapper>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
