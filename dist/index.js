"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("./emailService/emailService");
const setUpDB_1 = require("./fireStore/setUpDB");
function emailServiceCronJob() {
    return __awaiter(this, void 0, void 0, function* () {
        const services = yield setUpDB_1.db.listCollections();
        console.log(`Email service cron job started at ${new Date().toISOString()}`);
        for (const service of services) {
            (0, emailService_1.emailService)(service);
        }
        console.log(`Email service cron job ended at ${new Date().toISOString()}`);
    });
}
emailServiceCronJob();
