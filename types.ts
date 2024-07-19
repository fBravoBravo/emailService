import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

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
    timeToWaitBetweenBatches: z.string(),
    timeToWaitBetweenEmails: z.string(),
    firstEmailConfig: z.object({
      statusField: z.object({
        statusName: z.string(),
        statusValue: z.string(),
      }),
      template: templateConf,
      sendDate: z.string(),
      databaseField: z.string(),
    }),
    chasersConfig: z.object({
      statusField: z.object({
        statusName: z.string(),
        statusValue: z.string(),
      }),
      template: templateConf,
      numberOfChasers: z.string(),
      intervalBetweenChasers: z.string(),
      databaseField: z.string(),
    }),
    finalEmailConfig: z.object({
      statusField: z.object({
        statusName: z.string(),
        statusValue: z.string(),
      }),
      template: templateConf,
      daysBeforeDueDate: z.string(),
      databaseField: z.string(),
    }),
  }),
});

export type ConfigJSON = z.infer<typeof configJson>;
