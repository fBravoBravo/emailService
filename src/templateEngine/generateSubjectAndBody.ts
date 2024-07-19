import { TemplateConf } from "../../types.ts";
import { replacePlaceholders } from "./replacePlaceHolder.ts";

export function generateSubjectAndBody(
  templateConfig: TemplateConf,
  subject: string,
  data: { [key: string]: string },
) {
  const bodyTemplate = Deno.readTextFileSync(templateConfig.templatePath);
  const dataKeys = Object.keys(data);

  const placeHolders: string[][] = [];

  for (const key of dataKeys) {
    if (!templateConfig.templatePlaceHolders.includes(key)) {
      placeHolders.push([key, data[key]]);
    }
  }

  const body = replacePlaceholders(
    bodyTemplate,
    //TODO Fetch data for placeholders from firestore
    placeHolders,
  );
  return {
    subject,
    body,
  };
}
