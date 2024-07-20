import { ConfigJSON } from "../../types";

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

    const users = collection
      .where(selectedField, "==", "")
      .where(
        emailConfig.emailsConfig.chasersConfig.statusField.statusName,
        "==",
        emailConfig.emailsConfig.chasersConfig.statusField.statusName,
      )
      .where(emailConfig.emailsConfig.submittedField, "!=", "")
      .limit(emailConfig.databaseConfig.sizeOfPackage);

    const getUsers = await users.get();

    console.log(`Retrieved ${getUsers.size} documents`);

    return getUsers as FirebaseFirestore.QuerySnapshot<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >;
  } catch (error: any) {
    throw new Error(
      "Error retrieving from firestore for the chasers: " + error.message,
    );
  }
}

async function computeinwhichChaserWeAre(emailConfig: ConfigJSON) {
  const {} = emailConfig;
}
