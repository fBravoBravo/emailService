import { sendEmail } from "../../utils/sendEmail";
import { generateSubjectAndBody } from "../templateEngine/generateSubjectAndBody";
import { ConfigTemplate, EmailConfig } from "../../types";

export async function handleChaserEmail(
  emailConfig: ConfigTemplate,
  collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >,
) {
  console.log("Chaser email handler started.");

  const chaserUsers = (await collection.doc("chasers").get())
    .data() as EmailConfig;

  for (let index = 0; index < chaserUsers.length; index++) {
    const clientDocument = chaserUsers[index];
    try {
      const isTimeForChaser =
        new Date().toISOString() >= clientDocument.nextChaserDate;

      if (!isTimeForChaser) {
        console.log(
          `Client ${clientDocument.recipient} is not due for a chaser email yet.`,
        );
        continue;
      }

      //TODO Fetch templates from somewhere.
      // const emailInfo = generateSubjectAndBody(
      //   emailConfig.emailsConfig.chasersConfig.template,
      //   emailConfig.emailsConfig.subject,
      //   data,
      // );

      console.log(`Subject and body ready for sending email ✅`);

      //Send email

      //await sendEmail(data.email, emailInfo.subject, emailInfo.body);

      const timeStamp = new Date().toISOString();

      const newStatus = clientDocument.status.split;

      clientDocument.status = newStatus;
      clientDocument.lastCommunicationTimeStamp = timeStamp;
      clientDocument[`Sent`] = timeStamp;

      await collection.doc(clientDocument.id).update(data);

      console.log(`Client data updated in firestore ✅`);

      console.log(
        `Waiting ${emailConfig.delayBetweenEmails} second(s) before processing next client`,
      );
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          Number(emailConfig.delayBetweenEmails),
        )
      );
    } catch (error: any) {
      console.error(error.message);
      // errors.push(error.message);
    }
  }
  //TODO work on error handling for the service
  // if (errors.length > 0) {
  //     console.log("Errors encountered in the chaser handler");
  //     throw new Error("Errors encountered in the chaser handler: " + errors);
  // }
}
