// Conector for external services

function externalServiceConector(url: string, method: string, body: any) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
