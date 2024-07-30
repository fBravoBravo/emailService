"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setUpDB_1 = require("./fireStore/setUpDB");
function testingdb() {
    console.log("testing db");
    console.log(setUpDB_1.db.databaseId);
}
testingdb();
