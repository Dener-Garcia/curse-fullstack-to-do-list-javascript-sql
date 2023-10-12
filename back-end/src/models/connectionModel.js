const mysql = require("mysql2/promise")

const dotenv = require("dotenv")
dotenv.config()

//console.log("dados do meu banco de dados", process.env.MYSQL_DATABASE,
//    process.env.MYSQL_HOST,
//    process.env.MYSQL_USER,
//    process.env.MYSQL_PASSWORD)

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

module.exports = connection
