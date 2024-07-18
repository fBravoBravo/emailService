import { ConfigJSON, configJson } from "../types.ts";
import { todayDate, todayObject } from "./constants.ts";
import { handleChaserEmail } from "./handlers/chasers.ts";
import { loopProcessor } from "./loopProcesser.ts";
import { retrievingFromFirestoreChaser } from "./retrievers/chasersRetriever.ts";

export async function serviceProcessor(emailConfig: ConfigJSON) {
    console.log(`Starting email Service for ${emailConfig.ServiceName}`);
    console.log(
        `today is ${todayObject.year}-${todayObject.month}-${todayObject.day}`,
    );
    //TODO Check if emailConfig has the correct structure
    try {
        configJson.parse(emailConfig);
    } catch (error) {
        throw new Error(
            `The email config file doesn't have the correct structure, ${error.message}`,
        );
    }

    //Check if the due date is over.
    if (emailConfig.dueDate) {
        if (todayDate > new Date(emailConfig.dueDate)) {
            console.log(
                `Due date ${emailConfig.dueDate} is over. No need to process`,
            );
            return;
        }
    }

    //TODO Call First Email handler

    //TODO Call Chasers handler

    await loopProcessor(
        retrievingFromFirestoreChaser,
        handleChaserEmail,
        emailConfig,
    );

    //TODO Call Final Email handler
}
