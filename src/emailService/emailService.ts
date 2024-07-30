import { ConfigTemplate } from "../../types";
import { db } from "../fireStore/setUpDB";

export async function emailService(
    service: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
) {
    const serviceId = service.id;
    const configData = await db.collection(serviceId).doc("config")
        .get();

    const config = configData.data() as ConfigTemplate;

    const today = new Date();
}
