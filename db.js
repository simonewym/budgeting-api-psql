const Pool = require('pg').Pool;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE = process.env.DATABASE;
const DATABASE_PW = process.env.DATABASE_PW;
const PORT = process.env.PORT;

const pool = new Pool({
    user: DATABASE_USER,
    host: DATABASE_HOST,
    database: DATABASE,
    password: DATABASE_PW,
    port: PORT
});

module.exports = pool;