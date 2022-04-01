const mysql = require("mysql");
const { DBCONNECT } = require("./config")

exports.DB  = mysql.createPool(DBCONNECT);