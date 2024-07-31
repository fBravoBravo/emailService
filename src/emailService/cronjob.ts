import { emailService } from "./emailService";
import { db } from "../fireStore/setUpDB";

export async function emailServiceCronJob() {
    const services = await db.listCollections();

    console.log(
        `Email service cron job started at ${new Date().toISOString()}`,
    );

    for (const service of services) {
        emailService(service);
    }

    console.log(
        `Email service cron job ended at ${new Date().toISOString()}`,
    );
}
