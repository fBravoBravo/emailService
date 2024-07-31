export async function fetchTemplates(url: string) {
    //TODO Fetch templates from an external process and put them in an object.

    const response = await fetch(url);
    const templates = await response.json();

    return templates as {
        subject: string;
        body: string;
    };
}
