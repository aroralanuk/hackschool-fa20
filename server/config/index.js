const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    firestoreKeyPath: process.env.FIRESTORE_KEY_PATH,
    secretOrKey: process.env.SECRET_OR_KEY,
}

module.exports = config;
