const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MY_SQL_PASS,
    database: process.env.DATA_BASE_NAME,
  });
  
  db.connect((err) => {
    if (err) {
      console.log("error occured to connect to the database", err);
      return;
    }
    console.log("connected successfully");
  });


module.exports = db;
  