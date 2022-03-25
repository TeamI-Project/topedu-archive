const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/mysql.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    connection.query('SELECT * from Students', (err, rows) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            res.status(200).json({
                rows
                // firstLevel : {
                //     regEnglish : "2022-03-12",
                //     lvEnglish : "lv1",
                //     regMath : "2022-03-12",
                //     lvMath : "lv2"
                // },
                // levelTest : {
                //     english : "test",
                //     math : "test"
                // },
                // newConsulting : {
                //     friendShip : 1,
                //     personality : 2,
                //     parentShip : 3,
                //     concentration : 4,
                //     homework : 5,
                //     textbox : "test"
                // },
                // newCheckList : {
                //     checkList : "test"
                // }
            });
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }         
    });
})

module.exports = router;