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
    let studentID = "";
    let gradeType = "";
    let newpath = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        studentID = fields.id;
        gradeType = fields.gradeType;
        const oldpath = files.gradePath.filepath;
        
        if (gradeType < 12) {
            newpath = config.upload_url + "grade/middle/" + files.gradePath.newFilename;    
        } else {
            newpath = config.upload_url + "grade/high/" + files.gradePath.newFilename;
        }
        
        fs.rename(oldpath, newpath, (err) => {
            if(err) throw err;
        })

        const params = [newpath, studentID, gradeType];
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
})

module.exports = router;