export function replacePlaceholders(
    stringTemplate: string,
    dataToReplace: string[][],
) {
    let stringReplaced = stringTemplate;

    for (const row of dataToReplace) {
        //Try with spaces in the placeholder
        stringReplaced = stringReplaced.replace(
            `{{ ${row[0]} }}`,
            row[1],
        );
        //Try with no spaces in the placeholder
        stringReplaced = stringReplaced.replace(
            `{{${row[0]}}}`,
            row[1],
        );
    }

    return stringReplaced;
}
