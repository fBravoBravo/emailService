import { db } from "./fireStore/setUpDB";

function testingdb() {
    console.log("testing db");
    console.log(db.databaseId);
}
