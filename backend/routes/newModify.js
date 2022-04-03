const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

// Table NewRecord
router.get("/", (req, res) => {
    const id = req.query.id;
    const query = "SELECT * from NewRecord WHERE studentID='" + id + "'";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            res.status(200).json({
                firstLevel : {
                    regEnglish : rows[0].regEng,
                    lvEnglish : rows[0].levelEng,
                    regMath : rows[0].regMath,
                    lvMath : rows[0].levelMath
                },
                levelTest : {
                    english : [rows[0].testEng],
                    math : [rows[0].testMath]
                },
                newConsulting : {
                    friendShip : rows[0].friendShip,
                    personality : rows[0].personality,
                    parentShip : rows[0].parentShip,
                    concentration : rows[0].concentration,
                    homework : rows[0].homework,
                    textbox : rows[0].comment
                },
                newCheckList : {
                    checkList : rows[0].checklist
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})

router.post("/", (req, res) => {
    res.send("success newModify send");
})

module.exports = router;