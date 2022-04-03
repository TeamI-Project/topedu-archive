const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    connection.query('SELECT * from Students', (err, rows) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            res.status(200).json({
                comment : {
                    teacher : "string",
                    student : "string",
                    parents : "string",
                    etc : "string"
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})

module.exports = router;