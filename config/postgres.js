const Pool = require('pg').Pool;
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE
});

module.exports = pool;
