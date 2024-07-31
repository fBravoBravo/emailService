import { ConfigTemplate, EmailConfig } from "../../../types";
import { waitBetweenEmails } from "../../constants";
import { sendEmail } from "../emailSender/sendEmail";
import { triggerExternalService } from "../externalServiceTrigger/externalServiceTrigger";
import { fetchTemplates } from "../templateEngine/fetchTemplate";

export async function clientHandler(
    documents: FirebaseFirestore.QuerySnapshot<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
    collection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
    config: ConfigTemplate,
) {
    console.log("Chaser email handler started.");

    const documentsList: FirebaseFirestore.DocumentData[] = [];

    await documents.forEach((doc: FirebaseFirestore.DocumentData) =>
        documentsList.push(doc)
    );

    for (let index = 0; index < documentsList.length; index++) {
        const clientDocument = documentsList[index];
        try {
            const data = clientDocument.data() as EmailConfig;

            console.log(`Generated dynamic form URL ✅`);

            const templates: { subject: string; body: string } =
                await fetchTemplates(
                    config.templatesURL,
                    data.recipientIdentifier,
                );

            console.log(`Subject and body ready for sending email ✅`);

            //Send email
            await sendEmail(data.recipient, templates.subject, templates.body);

            const timeStamp = new Date().toISOString();

            const oldStatus = data.status;

            const statusIndex = data.possibleStatus.indexOf(data.status);

            data.status = data.possibleStatus[statusIndex + 1];
            data.lastCommunicationTimeStamp = timeStamp;

            await collection.doc(clientDocument.id).update(data);

            console.log(`Recipient configuration updated in firestore ✅`);

            await triggerExternalService({
                emailSentTimeStamp: timeStamp,
                recipient: data.recipient,
                recipientIdentifier: data.recipientIdentifier,
                oldStatus: oldStatus,
                newStatus: data.status,
            }, config.processorAfterSendURL);

            console.log(
                `Call external service for processing after email sent ✅`,
            );

            console.log(`Waiting one second before processing next client`);
            await new Promise((resolve) =>
                setTimeout(resolve, waitBetweenEmails)
            );
        } catch (error: any) {
            console.error(error.message);
            throw new Error(`Error processing client: ${error.message}`);
        }
    }
}
