const Pool = require('pg').Pool
require('dotenv').config()
const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DATABASE_NAME = process.env.DATABASE_NAME
const DB_PASSWORD = process.env.DB_PASSWORD

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    port: DB_PORT,
    database: DATABASE_NAME,
    password: DB_PASSWORD
});
module.exports = pool