const pgp = require('pg-promise')();

// Parse the database URL
const dbUrl = 'postgres://ehdouykxusmpew:efb15082cbb5609ef0a33c00c69ea0f042b5bb44c337142822b0b7c3e32b65cd@ec2-18-211-215-8.compute-1.amazonaws.com:5432/d2gulhph9crv4p';
const sslConfig = { rejectUnauthorized: false }; // For SSL connection

const db = pgp({
    connectionString: dbUrl,
    ssl: sslConfig
});

module.exports = db;