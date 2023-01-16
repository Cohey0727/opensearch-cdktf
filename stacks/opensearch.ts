import { Construct } from "constructs";

import { OpensearchDomain } from "@cdktf/provider-aws/lib/opensearch-domain";

class OpensearchStack {
  readonly opensearch: OpensearchDomain;

  constructor(scope: Construct, name: string) {
    const domainName = `${name}-domain`;
    this.opensearch = new OpensearchDomain(scope, "OpensearchDomain", {
      domainName,
      engineVersion: "OpenSearch_2.3",
      ebsOptions: {
        ebsEnabled: true,
        volumeType: "gp3",
        volumeSize: 10,
      },
      clusterConfig: {
        instanceType: "t3.small.search",
        instanceCount: 2,
        zoneAwarenessEnabled: true,
        zoneAwarenessConfig: {
          availabilityZoneCount: 2,
        },
        warmEnabled: false,
        dedicatedMasterEnabled: false,
      },
      // vpcOptions: {},
      advancedOptions: {
        "rest.action.multi.allow_explicit_index": "true",
      },
    });
  }
}

export default OpensearchStack;
