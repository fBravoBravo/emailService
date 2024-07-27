import { db } from "../constants";
import { EmailConfig } from "../types";
import { emailService } from "./emailService";

export async function cronjob() {
    const listOfServices = await db.listCollections();

    listOfServices.forEach(async (service) => {
        const config = (await service.doc("config").get())
            .data() as EmailConfig;

        await emailService(service, config);
    });
}
