const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "perguntas_db"
});

module.exports = pool.promise();
