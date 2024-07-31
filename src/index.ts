import { createServer } from "http";
import { emailServiceCronJob } from "./emailService/cronjob";

const server = createServer((req, res) => {
    emailServiceCronJob();
    res.statusCode = 200;
    res.end("Email service cron job running");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
