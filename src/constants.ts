import admin from "npm:firebase-admin";
import * as _firestore from "npm:@google-cloud/firestore";
import { getCurrentCloudRunStageName } from "../../../modules/get-current-cloud-run-stage-name/index.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

export const env = await load();

export const todayDate = new Date();
export const todayObject = {
    date:
        `${todayDate.getDay()}/${todayDate.getMonth()}/${todayDate.getFullYear()}`,
    year: todayDate.getFullYear(),
    month: todayDate.getMonth(),
    day: todayDate.getDate(),
};

const currentStage = getCurrentCloudRunStageName();
const isProduction = currentStage === "production";

const serviceAccountkeyString = env["FIRESTORE_SERVICE_ACCOUNT_KEY"];
const serviceAccountkey = JSON.parse(serviceAccountkeyString as string);

admin.initializeApp({
    credential: admin.credential.cert(
        serviceAccountkey as admin.ServiceAccount,
    ),
    databaseURL:
        "https://appscript-296515-default-rtdb.europe-west1.firebasedatabase.app",
});

export const db = admin.firestore();
