import { EmailConfig } from "../types";
import { handleChaserEmail } from "./handlers/chasers";

export async function emailService(
    service: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
    >,
    config: EmailConfig,
) {
    //First email loop processor
    // await loopProcessor(
    //     retrievingFromFirestoreFirstEmail,
    //     handleFirstEmail,
    //     config,
    // );

    //Chaser loop processor
    handleChaserEmail(service, config);

    //Final email loop processor
    // await loopProcessor(
    //     retrievingFromFirestoreFinalEmail,
    //     handleFinalEmail,
    //     config,
    // );
}
