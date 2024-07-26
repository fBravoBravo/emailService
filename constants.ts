import admin from "firebase-admin";
import * as _firestore from "@google-cloud/firestore";
import "dotenv/config";

export const todayDate = new Date();
export const todayObject = {
  date:
    `${todayDate.getDay()}/${todayDate.getMonth()}/${todayDate.getFullYear()}`,
  year: todayDate.getFullYear(),
  month: todayDate.getMonth(),
  day: todayDate.getDate(),
};

const serviceAccountkeyString = process.env.FIRESTORE_SERVICE_ACCOUNT_KEY;
const serviceAccountkey = JSON.parse(serviceAccountkeyString as string);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountkey as admin.ServiceAccount),
  databaseURL:
    "https://appscript-296515-default-rtdb.europe-west1.firebasedatabase.app",
});

// Own database
export const db = admin.firestore();
