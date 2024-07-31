import { timeToWait } from "../constants";

export async function loopProcessor(
    retriever: (
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
    ) => void,
    collection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
) {
    let getUsers;

    try {
        getUsers = await retriever(collection);
    } catch (error) {
        throw new Error(
            `Error retrieving first package of users from firestore: ${error}`,
        );
    }

    console.log(`Processor started`);
    while (!getUsers.empty) {
        try {
            console.log(`loop began`);
            await handler(getUsers);
            // wait before processing next package.
            console.log(`Waiting for ${timeToWait} ms`);
            await new Promise((resolve) => setTimeout(resolve, timeToWait));

            getUsers = await retriever(collection);
            console.log(`loop ended`);
        } catch (error) {
            console.error(`Error processing package:
                ${error}`);
        }
    }
    console.log(`Processor ended`);
}
