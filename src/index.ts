import { createServer } from "http";
import { emailService } from "./emailService/emailService";
import { db } from "./fireStore/setUpDB";

async function emailServiceCronJob() {
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

const server = createServer((req, res) => {
    emailServiceCronJob();
    res.statusCode = 200;
    res.end("Email service cron job running");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
