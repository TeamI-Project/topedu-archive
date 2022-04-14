const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const formidable = require('formidable');
const fs = require('fs');
const config = require('../config/config');
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

// router.post("/", express.json(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");

//     console.log(req.body);
    
//     const updateQuery = "UPDATE NewRecord SET regEng=?, levelEng=?, \
//     regMath=?, levelMath=?, friendship=?, personality=?, parentship=?, \
//     concentration=?, homework=?, comment=?, checklist=? \
//     WHERE studentID=?";

//     const deleteImgQuery = "DELETE FROM LevelTest WHERE studentID=?";

//     const updateParams = [];

//     const studentID = req.body.id;
//     const fLv = req.body.firstLevel;
//     const lvTest = req.body.levelTest;
//     const newCst = req.body.newConsulting;
//     const newlst = req.body.newCheckList;

//     updateParams.push(fLv.regEng);
//     updateParams.push(fLv.levelEng);
//     updateParams.push(fLv.regMath);
//     updateParams.push(fLv.levelMath);

//     updateParams.push(newCst.friendship);
//     updateParams.push(newCst.personality);
//     updateParams.push(newCst.parentship);
//     updateParams.push(newCst.concentration);
//     updateParams.push(newCst.homework);
//     updateParams.push(newCst.comment);

//     updateParams.push(newlst.checklist);
//     updateParams.push(studentID);

//     connection.query(updateQuery, updateParams, (err, results, field) => {
//         if (err) throw err;
//         connection.query(deleteImgQuery, studentID, (err, results, field) => {
//             if (err) throw err;
            
//         })
//         for (let index = 0; index < lvTest.english.length; index++) {
//             // 하나씩 english insert
//             const imgQ = "INSERT INTO LevelTest VALUES ('" +  studentID + "', 0, ?)";
//             connection.query(imgQ, lvTest.english[index], (err, results) => {
//                 if (err) throw err;
//                 console.log("insert english " + lvTest.english[index]);
//             });
//         }
//         for (let index = 0; index < lvTest.math.length; index++) {
//             // 하나씩 math insert
//             const imgQ = "INSERT INTO LevelTest VALUES ('" +  studentID + "', 1, ?)";
//             connection.query(imgQ, lvTest.math[index], (err, results) => {
//                 if (err) throw err;
//                 console.log("insert math " + lvTest.math[index]);
//             });
//         }
//         try {
//             res.status(200).json({
//                 msg : "success"
//             });
//         } catch (err) {
//             console.log(err);
//             res.status(500);
//             res.send(err.message);
//         }         
//     });
// })

router.post("/", express.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let studentID = "";
    let firstLevel;
    let newConsulting;

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        studentID = fields.id;
        firstLevel = JSON.parse(fields.firstLevel);
        newConsulting = JSON.parse(fields.newConsulting);

        const query = "UPDATE NewRecord SET regEng=?, levelEng=?, \
        regMath=?, levelMath=?, friendship=?, personality=?, parentship=?, \
        concentration=?, homework=?, comment=?  \
        WHERE studentID=?";

        const params = [firstLevel.regEng, firstLevel.levelEng, firstLevel.regMath, firstLevel.levelMath,
            newConsulting.friendship, newConsulting.personality, newConsulting.parentship, newConsulting.concentration, newConsulting.homework, newConsulting.comment,
            studentID];

        connection.query(query, params, (err, results, fields) => {
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
        })
    })
})


module.exports = router;
