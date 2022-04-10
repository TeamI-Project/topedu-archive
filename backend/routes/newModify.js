const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    const id = req.query.id;
    const query_nr = "SELECT * FROM NewRecord WHERE studentID='" + id + "';"
    const query_lt = "SELECT * FROM LevelTest WHERE studentID='" + id + "';";
    connection.query(query_nr + query_lt, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        const english = []
        const math = []
        const record = results[0];
        const lvTest = results[1];
        for (let index = 0; index < lvTest.length; index++) {
            const element = lvTest[index];
            element.dataType == 0 ? english.push(element.dataPath) : math.push(element.dataPath);
        }
        try {
            res.status(200)
            .json({
                firstLevel : {
                    regEnglish : record[0].regEng,
                    lvEnglish : record[0].levelEng,
                    regMath : record[0].regMath,
                    lvMath : record[0].levelMath
                },
                levelTest : {
                    english : english,
                    math : math
                },
                newConsulting : {
                    friendship : record[0].friendship,
                    personality : record[0].personality,
                    parentship : record[0].parentship,
                    concentration : record[0].concentration,
                    homework : record[0].homework,
                    comment : record[0].comment
                },
                newCheckList : {
                    checkList : record[0].checklist
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})

router.post("/", express.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    console.log(req.body);
    
    const updateQuery = "UPDATE NewRecord SET regEng=?, levelEng=?, \
    regMath=?, levelMath=?, friendship=?, personality=?, parentship=?, \
    concentration=?, homework=?, comment=?, checklist=? \
    WHERE studentID=?";

    const updateParams = [];

    const id = req.body.id;
    const fLv = Object.keys(req.body.firstLevel);
    const lvTest = Object.keys(req.body.levelTest);
    const newCst = Object.keys(req.body.newConsulting);
    const newlst = Object.keys(req.body.newCheckList);

    updateParams.push(fLv);
    updateParams.push(newCst);
    updateParams.push(newlst);
    updateParams.push(id);

    connection.query(updateQuery, updateParams, (err, results, field) => {
        if (err) throw err;
        try {
            res.status(200).json({
                msg : "success"
            });
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})

module.exports = router;
