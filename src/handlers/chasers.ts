import admin from "npm:firebase-admin";
import { sendEmail } from "../../utils/sendEmail.ts";
import { replacePlaceholders } from "../templateEngine/replacePlaceHolder.ts";
import { ConfigJSON } from "../../types.ts";
import { generateSubjectAndBody } from "../templateEngine/generateSubjectAndBody.ts";

export async function handleChaserEmail(
  documents: admin.firestore.QuerySnapshot<
    admin.firestore.DocumentData,
    admin.firestore.DocumentData
  >,
  emailConfig: ConfigJSON,
  collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >,
) {
  console.log("Chaser email handler started.");

  const documentsList: admin.firestore.DocumentData[] = [];

  await documents.forEach((doc: admin.firestore.DocumentData) =>
    documentsList.push(doc),
  );

  for (let index = 0; index < documentsList.length; index++) {
    const clientDocument = documentsList[index];
    try {
      const data = clientDocument.data() as any;

      console.log(
        `Processing client with account number: ${data.accountNumber}`,
      );
      console.log(`Generated dynamic form URL ✅`);
      const emailInfo = generateSubjectAndBody(
        emailConfig.emailsConfig.chasersConfig.template,
        emailConfig.emailsConfig.subject,
        data,
      );

      console.log(`Subject and body ready for sending email ✅`);

      //Send email

      await sendEmail(data.email, emailInfo.subject, emailInfo.body);

      const timeStamp = new Date().toISOString();

      data.status = "chaser2";
      data.lastCommunicationDate = timeStamp;
      data.chaser1Sent = timeStamp;

      await collection.doc(clientDocument.id).update(data);

      console.log(`Client data updated in firestore ✅`);

      console.log(
        `Waiting ${emailConfig.emailsConfig.timeToWaitBetweenEmails} second(s) before processing next client`,
      );
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          Number(emailConfig.emailsConfig.timeToWaitBetweenEmails),
        ),
      );
    } catch (error) {
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
