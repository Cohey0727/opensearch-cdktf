import { Construct } from "constructs";
import { TerraformOutput, TerraformStack, Token } from "cdktf";
import { provider } from "@cdktf/provider-aws";
import OpensearchStack from "./opensearch";

class MainStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new provider.AwsProvider(this, "AwsProvider", {
      region: "ap-northeast-1",
    });
    const opensearch = new OpensearchStack(this, name);
    createOutput(this, {
      opensearch_end_point: opensearch.opensearch.endpoint,
    });
  }
}

const createOutput = (scope: Construct, outputs: { [key: string]: string }) => {
  Object.entries(outputs).forEach(([key, value]) => {
    new TerraformOutput(scope, key, {
      value: value,
    });
  });
};

export default MainStack;
