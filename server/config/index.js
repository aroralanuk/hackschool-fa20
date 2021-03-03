const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    firestoreKeyPath: process.env.FIRESTORE_KEY_PATH,
}

module.exports = config;
