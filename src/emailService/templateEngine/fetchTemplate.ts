export async function fetchTemplates(
    url: string,
    recipientIdentifier: string,
    status: string,
) {
    const urlWithIdentifier =
        `${url}?recipientIdentifier=${recipientIdentifier}&&status=${status}`;

    const response = await fetch(urlWithIdentifier);
    const templates = await response.json();

    return templates as {
        subject: string;
        body: string;
    };
}
