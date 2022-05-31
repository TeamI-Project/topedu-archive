const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const formidable = require('formidable');
const fs = require('fs');
const config = require('../config/config');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');
const s3 = new aws.S3();
const bucketName = 'topedu-bucket';
// const cors = require('cors');

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
    let path = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        studentID = fields.id;
        gradeType = fields.gradeType;

        if (gradeType < 12) {
            path = "grade/middle/";    
        } else {
            path = "grade/high/";
        }

        const fileContent = fs.readFileSync(file.gradePath.filepath);

        const bucketParams = {
            Bucket: bucketName,
            Key: `${path}${Date.now()}_${file.gradePath.originalFilename}`, // file name that you want to save in s3 bucket
            ContentType: file.gradePath.mimetype,
            Body: fileContent
        }

        s3.upload(bucketParams, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                const params = [data.Location, studentID, gradeType];
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
            }
        });
    })
})

module.exports = router;