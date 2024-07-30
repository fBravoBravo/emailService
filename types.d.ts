export type configTemplate = {
    ServiceName: string;
    dayOfFirstCommunication: string;
    dueDate: string;
    senderConfig: {
        secretName: string;
        fromDirection: string;
    };
    sizeOfPackage: number;
    delayBetweenEmails: number;
    delayBetweenBatches: number;
};

export type emailConfig = {
    recipient: string;
    status: string;
    submittedAt: string;
    emailsConfig: {
        startDate: string;
        dueDate: string;
        firstEmailConfig: {
            sendDate: string;
        };
        chasersConfig: {
            numberOfChasers: string;
            daysBetweenChasers: string;
        };
        finalEmailConfig: {
            daysBeforeDueDate: string;
            daysAfterFinalChaser: string;
        };
    };
    lastCommunicationTimeStamp: string;
    firstEmailTimeStamp: string;
    FinalEmailTimeStamp: string;
    nextChaser: number;
    nextChaserDate: string;
    chaserTimeStamp: string;
};
