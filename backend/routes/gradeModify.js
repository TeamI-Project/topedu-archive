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
                gradeMiddle : {
                    "middle1-1-1" : "img path",
                    "middle1-1-2" : "img path",
                    "middle1-2-1" : "img path",
                    "middle1-2-2" : "img path",
                
                    "middle2-1-1" : "img path",
                    "middle2-1-2" : "img path",
                    "middle2-2-1" : "img path",
                    "middle2-2-2" : "img path",
                
                    "middle3-1-1" : "img path",
                    "middle3-1-2" : "img path",
                    "middle3-2-1" : "img path",
                    "middle3-2-2" : "img path"
                },
                gradeHigh : {
                    "high1-1-1" : "img path",
                    "high1-1-2" : "img path",
                    "high1-2-1" : "img path",
                    "high1-2-2" : "img path",
                
                    "high2-1-1" : "img path",
                    "high2-1-2" : "img path",
                    "high2-2-1" : "img path",
                    "high2-2-2" : "img path",
                
                    "high3-1-1" : "img path",
                    "high3-1-2" : "img path"
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