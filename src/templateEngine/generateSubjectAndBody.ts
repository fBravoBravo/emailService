import { TemplateConf } from "../../types";
import { replacePlaceholders } from "./replacePlaceHolder";
import { readFileSync } from "fs";

export function generateSubjectAndBody(
  templateConfig: TemplateConf,
  subject: string,
  data: { [key: string]: string },
) {
  const bodyTemplate = readFileSync(templateConfig.templatePath).toString();
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
