const Pool = require('pg').Pool;

const pool = new Pool({
    user: DATABASE_USER,
    host: DATABASE_HOST,
    database: DATABASE,
    password: DATABASE_PW,
    port: 5432
});

module.exports = pool;