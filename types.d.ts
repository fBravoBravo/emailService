export type ConfigTemplate = {
    ServiceName: string;
    dayOfFirstCommunication: string;
    dueDate: string;
    senderConfig: {
        secretName: string;
        fromDirection: string;
    };
    templatesURL: string;
    processorAfterSendURL: string;
    sizeOfPackage: number;
    delayBetweenEmails: number;
    delayBetweenBatches: number;
};

export type EmailConfig = {
    recipient: string;
    recipientIdentifier: string;
    timeZone: string;
    status: string;
    submittedAt: string;
    possibleStatus: string[];
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
};
