import { serviceProcessor } from "../src/serviceProcessor";
import { opendirSync, readFileSync } from "fs";

export async function walker() {
  for await (
    const dirEntry of await opendirSync("./emailConfigurations")
  ) {
    //TODO change to look for folders instead of files1
    const jsonConfigFile = await readFileSync(dirEntry.path);
    const jsonConfigText = new TextDecoder().decode(jsonConfigFile);
    const jsonConfig = JSON.parse(jsonConfigText);

    serviceProcessor(jsonConfig);
  }
}
