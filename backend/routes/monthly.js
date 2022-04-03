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
                month : {
                    jan : "img path",
                    feb : "img path",
                    mar : "img path",
                    apr : "img path",
                    may : "img path",
                    jun : "img path",
                    jul : "img path",
                    aug : "img path",
                    sep : "img path",
                    oct : "img path",
                    nov : "img path",
                    dec : "img path"
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