import { sizeOfPackage } from "../../constants";

export async function firestoreRetriever(
    collection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
) {
    try {
        console.log(
            `Retrieving a package of ${sizeOfPackage} recipients from firestore`,
        );

        const users = collection
            .where("status", "!=", "done")
            .where("submittedAt", "==", "")
            .limit(sizeOfPackage);

        const getUsers = await users.get();

        console.log(`Retrieved ${getUsers.size} documents`);

        return getUsers;
    } catch (error: any) {
        throw new Error(
            "Error retrieving from firestore for the first chaser: " +
                error.message,
        );
    }
}
