export async function clientHandler(
    documents: FirebaseFirestore.QuerySnapshot<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
) {
    console.log("Chaser email handler started.");

    const documentsList: FirebaseFirestore.DocumentData[] = [];

    await documents.forEach((doc: FirebaseFirestore.DocumentData) =>
        documentsList.push(doc)
    );

    for (let index = 0; index < documentsList.length; index++) {
        const clientDocument = documentsList[index];
        try {
            const data = clientDocument.data() as ClientInfo;

            console.log(
                `Processing client with account number: ${data.accountNumber}`,
            );

            const dynamicFormURL = await generateFormURL(
                data.email,
                data.accountNumber,
            );

            console.log(`Generated dynamic form URL ✅`);

            const emailContent = replacePlaceholders(chaserTemplate, {
                accountName: data.accountName,
                emailAddress: data.email,
                dynamicFormURL: dynamicFormURL,
            });
            const replacedSubject = replacePlaceholders(subject, {
                accountName: data.accountName,
                accountNumber: data.accountNumber,
            });

            console.log(`Subject and body ready for sending email ✅`);

            //Send email
            await sendEmail(data.email, replacedSubject, emailContent);

            const timeStamp = new Date().toISOString();

            data.status = "chaser2";
            data.lastCommunicationDate = timeStamp;
            data.chaser1Sent = timeStamp;

            if (testing === "production") {
                await collection.doc(clientDocument.id).update(data);
            }

            console.log(`Client data updated in firestore ✅`);

            console.log(`Waiting one second before processing next client`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(error.message);
            errors.push(error.message);
        }
    }

    if (errors.length > 0) {
        console.log("Errors encountered in the chaser handler");
        throw new Error("Errors encountered in the chaser handler: " + errors);
    }
}
