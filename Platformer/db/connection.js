/* Database logic written by Jake Wilder */

var mysql = require("mysql");
var dotenv = require("dotenv");
var connection;

dotenv.config();

// mysql database connection block

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "leaderboards_db"
  });
}

connection.config.typeCast = function (field, next) {
  if (field.type == "TINY" && field.length == 1) {
    return field.string() == "1"; // 1 = true, 0 = false
  }
  return next();
};


module.exports = connection;