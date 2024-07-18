import { walk } from "https://deno.land/std/fs/mod.ts";
import { serviceProcessor } from "../src/serviceProcessor.ts";

export async function walker() {
    for await (
        const dirEntry of walk("../emailConfigurations", { exts: [".json"] })
    ) {
        //TODO change to look for folders instead of files
        const jsonConfigFile = await Deno.readFile(dirEntry.path);
        const jsonConfigText = new TextDecoder().decode(jsonConfigFile);
        const jsonConfig = JSON.parse(jsonConfigText);

        serviceProcessor(jsonConfig);
    }
}
