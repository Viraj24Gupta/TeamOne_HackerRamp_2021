const admin = require("firebase-admin");
const serviceAccount = require("../key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
let db = admin.firestore();
module.exports = db;
