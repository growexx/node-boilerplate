const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../public/google-services.json');

class FirebaseConfig {
    static init () {
        return firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount)
        });
    }
}

module.exports = FirebaseConfig;
