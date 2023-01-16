import { App } from "cdktf";
import MainStack from "./stacks/main";

const envName = process.env.ENV_NAME;
if (!envName) {
  throw new Error("ENV_NAME is not set, call `export ENV_NAME=foo`");
}

const app = new App();
new MainStack(app, `${envName}-opensearch`);
app.synth();
