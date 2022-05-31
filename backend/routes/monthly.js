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
    const query = "SELECT * FROM Monthly WHERE studentID=?"
    connection.query(query, studentID, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const month = {};

            Object.keys(results).forEach((key) => {
                const row = results[key];

                month[row.monthType] = row.monthPath;
            });

            res.status(200).json({
                month: month
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
    let month = "";
    let path = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        studentID = fields.id;
        switch (fields.month) {
            case "jan":
                month = 0;
                break;
            case "feb":
                month = 1;
                break;
            case "mar":
                month = 2;
                break;
            case "apr":
                month = 3;
                break;
            case "may":
                month = 4;
                break;
            case "jun":
                month = 5;
                break;
            case "jul":
                month = 6;
                break;
            case "aug":
                month = 7;
                break;
            case "sep":
                month = 8;
                break;
            case "oct":
                month = 9;
                break;
            case "nov":
                month = 10;
                break;
            case "dec":
                month = 11;
                break;
        }

        path = "monthly/";
        const fileContent = fs.readFileSync(file.imgPath.filepath);

        const bucketParams = {
            Bucket: bucketName,
            Key: `${path}${Date.now()}_${file.imgPath.originalFilename}`, // file name that you want to save in s3 bucket
            ContentType: file.imgPath.mimetype,
            Body: fileContent
        }

        s3.upload(bucketParams, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                const params = [data.Location, studentID, month];
                const query = "UPDATE Monthly SET monthPath=? \
                                WHERE studentID=? AND monthType=?";
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