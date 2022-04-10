const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    const studentID = req.query.id;
    const query = 'SELECT * from Testpaper WHERE studentID=?';
    connection.query(query, studentID, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const sca = [];
            const cps = [];
            let careerNet = "";
            const sixSense = [];
            const testEtc = [];

            Object.keys(results).forEach((key) => {
                const row = results[key];

                console.log('dataType : ', row.dataType);
                console.log('dataPath : ', row.dataPath);
                
                if (row.dataType === 0) {
                    sca.push(row.dataPath);
                } else if (row.dataType === 1) {
                    cps.push(row.dataPath);
                } else if (row.dataType === 2) {
                    careerNet = row.dataPath;
                } else if (row.dataType === 3) {
                    sixSense.push(row.dataPath);
                } else if (row.dataType === 4) {
                    testEtc.push(row.dataPath);
                }
            })

            res.status(200).json({
                SCA : { // 0
                    sca : sca
                },
                CPS : { // 1
                    cps : cps
                }, 
                careerNet : { // 2
                    careerNet : careerNet
                },
                sixSense : { // 3
                    sixSense : sixSense
                },
                testEtc : { // 4
                    etc : testEtc
                }
            });
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }         
    });
})


router.post("/", express.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const deleteImgQuery = "DELETE FROM TestPaper WHERE studentID=?";

    const studentID = req.body.id;
    const sca = req.body.SCA.sca;
    const cps = req.body.CPS.cps;
    const careerNet = req.body.careerNet.careerNet;
    const sixSense = req.body.sixSense.sixSense;
    const testEtc = req.body.testEtc.etc;

    connection.query(deleteImgQuery, studentID, (err, results, field) => {
        if (err) throw err;
    });

    for (let index = 0; index < sca.length; index++) {
        const scaQuery = "INSERT INTO Testpaper VALUES ('" +  studentID + "', 0, ?)";
        connection.query(scaQuery, sca[index], (err, results) => {
            if (err) throw err;
            console.log("insert sca : " + sca[index]);
        });
    }
    for (let index = 0; index < cps.length; index++) {
        const cpsQuery = "INSERT INTO Testpaper VALUES ('" +  studentID + "', 1, ?)";
        connection.query(cpsQuery, cps[index], (err, results) => {
            if (err) throw err;
            console.log("insert cps : " + cps[index]);
        });
    }
    const careerNetQuery = "INSERT INTO Testpaper VALUES ('" +  studentID + "', 2, ?)";
    connection.query(careerNetQuery, careerNet, (err, results) => {
        if (err) throw err;
        console.log("insert careerNet : " + careerNet);
    });
    for (let index = 0; index < sixSense.length; index++) {
        const sixSenseQuery = "INSERT INTO Testpaper VALUES ('" +  studentID + "', 3, ?)";
        connection.query(sixSenseQuery, sixSense[index], (err, results) => {
            if (err) throw err;
            console.log("insert sixSense : " + sixSense[index]);
        });
    }
    for (let index = 0; index < testEtc.length; index++) {
        const testEtcQuery = "INSERT INTO Testpaper VALUES ('" +  studentID + "', 4, ?)";
        connection.query(testEtcQuery, testEtc[index], (err, results) => {
            if (err) throw err;
            console.log("insert testEtc : " + testEtc[index]);
        });
    }
    
    try {
        res.status(200).json({
            msg : "success"
        });
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err.message);
    }  
})

module.exports = router;