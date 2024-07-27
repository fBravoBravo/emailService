import { z } from "zod";

export const configTemplate = z.object({
  ServiceName: z.string(),
  dayOfFirstCommunication: z.string(),
  dueDate: z.string(),
  senderConfig: z.object({
    secretName: z.string(),
    fromDirection: z.string(),
  }),
  sizeOfPackage: z.number(),
  delayBetweenEmails: z.number(),
  delayBetweenBatches: z.number(),
});

export type ConfigTemplate = z.infer<typeof configTemplate>;

export const emailConfig = z.array(
  z.object({
    recipient: z.string(),
    status: z.string(),
    submittedAt: z.string(),
    emailsConfig: z.object({
      firstEmailConfig: z.object({
        sendDate: z.string(),
      }),
      chasersConfig: z.object({
        numberOfChasers: z.string(),
        daysBetweenChasers: z.string(),
      }),
      finalEmailConfig: z.object({
        daysBeforeDueDate: z.string().optional(),
        daysAfterFinalChaser: z.string().optional(),
      }),
    }),
    lastCommunicationTimeStamp: z.string(),
    firstEmailTimeStamp: z.string(),
    FinalEmailTimeStamp: z.string(),
    nextChaserDate: z.string(),
    chaser1TimeStamp: z.string(),
    chaser2TimeStamp: z.string(),
    chaser3TimeStamp: z.string(),
    chaser4TimeStamp: z.string(),
    chaser5TimeStamp: z.string(),
    chaser6TimeStamp: z.string(),
    chaser7TimeStamp: z.string(),
    chaser8TimeStamp: z.string(),
    chaser9TimeStamp: z.string(),
    chaser10TimeStamp: z.string(),
  }).partial({
    chaser1TimeStamp: true,
    chaser2TimeStamp: true,
    chaser3TimeStamp: true,
    chaser4TimeStamp: true,
    chaser5TimeStamp: true,
    chaser6TimeStamp: true,
    chaser7TimeStamp: true,
    chaser8TimeStamp: true,
    chaser9TimeStamp: true,
    chaser10TimeStamp: true,
  }),
);

export type EmailConfig = z.infer<typeof emailConfig>;
