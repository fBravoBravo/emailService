# Australian Ts & Cs API

## Goal

A backend for the australian Ts & Cs solution to communicate and process data from the frontend.

### Requirements

## Input interface

| Name            | Endpoint       | Method | Function                                                |
| --------------- | -------------- | :----: | ------------------------------------------------------- |
| Get Client Data | `/get-data`    | `POST` | [`getClientData()`](./src/controllers/getClientData.ts) |
| Submit Form     | `/submit-form` | `POST` | [`submitForm()`](./src/controllers/submitForm.ts)       |

## Output interface

```json
{
  "success": true | false
}
```

## Pre-requisites

N/A

## Nuances

N/A

## Tools/Technologies

- [Deno](https://deno.com/)
- [Firestore](https://firebase.google.com/docs/firestore)

## Solution

A backend to serve client data to the frontend and process the replies from the clients through a form submission.

**Routes:**

**/get-data**: A request to return the client's data from the backend. Will throw an error if no client is found in the firestore. Requires the following in the request body:

```json
{
  "email": "example@ebury.com",
  "accountNumber": "12345"
}
```

Returns the following in the response:

```json
{
  "email": "example@ebury.com",
  "accountNumber": "12345",
  "accountName": "Example name"
}
```

**/submit-form**: A request to update the database with the choices made by the user. Requires the following in the request body:

```json
{
  "email": "example@ebury.com",
  "accountNumber": "12345",
  "moreThan100Employees": true | false,
  "revenueMoreThan10M": true | false ,
  "noneOfTheAbove": true | false,
  "regularTAndCs": true | false,
  "eligibleTAndCs": true | false
}
```

Returns the following in the response:

```json
{
  "message": "Form submitted successfully"
}
```

## Usage Forecast

To be used to process form replies for roughly a thousand clients.

## Troubleshooting
