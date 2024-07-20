import { z } from "zod";

const templateConf = z.object({
  templatePath: z.string(),
  templatePlaceHolders: z.array(z.string()),
});

export type TemplateConf = z.infer<typeof templateConf>;

export const configJson = z.object({
  ServiceName: z.string(),
  CredentialsConfig: z.object({
    secretName: z.string(),
    fromDirection: z.string(),
  }),
  dayOfFirstCommunication: z.string(),
  dueDate: z.string(),
  databaseConfig: z.object({
    databaseName: z.string(),
    collectionName: z.string(),
    sizeOfPackage: z.number(),
  }),
  emailsConfig: z.object({
    subject: z.string(),
    submittedField: z.string(),
    "statusField": z.string(),
    timeToWaitBetweenBatches: z.string(),
    timeToWaitBetweenEmails: z.string(),
    firstEmailConfig: z.object({
      statusValue: z.array(z.string()),
      template: templateConf,
      sendDate: z.string(),
      databaseField: z.string(),
    }),
    chasersConfig: z.object({
      statusValue: z.array(z.string()),
      template: templateConf,
      numberOfChasers: z.string(),
      intervalBetweenChasers: z.string(),
      databaseField: z.string(),
    }),
    finalEmailConfig: z.object({
      statusValue: z.array(z.string()),
      template: templateConf,
      daysBeforeDueDate: z.string(),
      databaseField: z.string(),
    }),
  }),
});

export type ConfigJSON = z.infer<typeof configJson>;
