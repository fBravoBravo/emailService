import { ConfigJSON } from "../../types.ts";

export async function retrievingFromFirestoreChaser(
    emailConfig: ConfigJSON,
    collection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
) {
    try {
        console.log("Retrieving from firestore for the Chasers");

        const { databaseField } = emailConfig.emailsConfig.chasersConfig;

        let selectedField = databaseField;

        if (databaseField.includes("$")) {
            //TODO Logic for replacing dynamically the chasers fields to update.
            selectedField = databaseField.replace("${}", "");
        }

        const users = collection.where(
            selectedField,
            "==",
            "",
        ).where(
            emailConfig.emailsConfig.chasersConfig.statusField.statusName,
            "==",
            emailConfig.emailsConfig.chasersConfig.statusField.statusName,
        ).where(emailConfig.emailsConfig.submittedField, "!=", "").limit(
            emailConfig.databaseConfig.sizeOfPackage,
        );

        const getUsers = await users.get();

        console.log(`Retrieved ${getUsers.size} documents`);

        return getUsers as FirebaseFirestore.QuerySnapshot<
            FirebaseFirestore.DocumentData,
            FirebaseFirestore.DocumentData
        >;
    } catch (error) {
        throw new Error(
            "Error retrieving from firestore for the chasers: " +
                error.message,
        );
    }
}
