export async function triggerExternalService(emailSentInformaation: {
    emailSentTimeStamp: string;
    recipient: string;
    recipientIdentifier: string;
    oldStatus: string;
    newStatus: string;
}, externalServiceURL: string) {
    if (externalServiceURL === "") {
        console.log(
            `External service URL not provided, nothing to do after sending email`,
        );
        return;
    }

    const response = await fetch(externalServiceURL, {
        method: "POST",
        body: JSON.stringify(emailSentInformaation),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(
            `Error triggering external service: ${response.statusText}`,
        );
    }
    console.log(`External service triggered successfully`);
}
