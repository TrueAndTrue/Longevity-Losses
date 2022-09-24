const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "filler",
  host: "localhost",
  port: 5432,
  database: "longevitylosses"
});

module.exports = pool;