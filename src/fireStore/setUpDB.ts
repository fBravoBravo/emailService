import * as _firestore from "@google-cloud/firestore";

export const db = new _firestore.Firestore({
    projectId: "emailservice-430616",
    keyFilename: "./service-account.json",
});
