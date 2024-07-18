import { ConfigJSON } from "../types.ts";
import { db } from "./constants.ts";

export async function loopProcessor(
    retriever: (
        emailConfig: ConfigJSON,
        collection: FirebaseFirestore.CollectionReference<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
        >,
    ) => Promise<
        FirebaseFirestore.QuerySnapshot<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
        >
    >,
    handler: (
        documents: FirebaseFirestore.QuerySnapshot<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
        >,
        emailConfig: ConfigJSON,
        collection: FirebaseFirestore.CollectionReference<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
        >,
    ) => void,
    emailConfig: ConfigJSON,
) {
    let getUsers;

    const collection = db.collection(emailConfig.databaseConfig.collectionName);

    try {
        getUsers = await retriever(emailConfig, collection);
    } catch (error) {
        throw new Error(
            `Error retrieving first package of users from firestore: ${error}`,
        );
    }

    if (getUsers.empty) {
        console.log("No users to process");
        return;
    }

    console.log(`Processor started`);
    while (!getUsers.empty) {
        try {
            console.log(`loop began`);
            await handler(getUsers, emailConfig, collection);
            await new Promise((resolve) => setTimeout(resolve, 30000));

            getUsers = await retriever(emailConfig, collection);
            console.log(`loop ended`);
        } catch (error) {
            console.error(`Error processing package:
                  ${error}`);
        }
    }
    console.log(`Processor ended`);
}
