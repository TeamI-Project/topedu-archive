const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    const studentID = req.query.id;
    const query = 'SELECT * from Grade WHERE studentID=?';
    connection.query(query, studentID, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const gradeMiddle = {};
            const gradeHigh = {};

            Object.keys(results).forEach((key) => {
                const row = results[key];

                const tp = row.dataType;
                if (tp < 12) {
                    // gradeMiddle
                    gradeMiddle[tp] = row.dataPath;
                } else {
                    // gradeHigh
                    gradeHigh[tp] = row.dataPath;
                }
            });

            res.status(200).json({
                gradeMiddle,
                gradeHigh           
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

    const studentID = req.body.id;

    const gradeType = req.body.gradeType;
    const gradePath = req.body.gradePath;

    const params = [gradePath, studentID, gradeType];

    const query = "UPDATE Grade SET dataPath=? \
    WHERE studentID=? AND dataType=?";
    
    connection.query(query, params, (err, results, field) => {
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