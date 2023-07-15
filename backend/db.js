const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5433,
    database: "trainbookingsystem",
    password: "Soumava@biswas7"
});
module.exports = pool