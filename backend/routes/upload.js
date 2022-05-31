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

router.post("/", express.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let studentID = "";
    let type = "";
    let path = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        studentID = fields.id;
        type = fields.type;

        // type 에 따라 bucket directory path 지정
        switch(type) {
            case 'english':
                path = 'levelTest/';
                break;
            case 'math':
                path = 'levelTest/';
                break;
            case 'checklist':
                path = 'etcImg/';
                break;   
            case 'sca':
                path = 'testResult/sca/'
                break;  
            case 'cps':
                path = 'testResult/cps/'
                break;  
            case 'careerNet':
                path = 'testResult/career/';
                break;  
            case 'sixSense':
                path = 'testResult/ss/';
                break;  
            case 'etc':
                path = 'testResult/etc/';
                break;  
        }

        const fileContent = fs.readFileSync(file.image.filepath);

        const bucketParams = {
            Bucket: bucketName,
            Key: `${path}${Date.now()}_${file.image.originalFilename}`, // file name that you want to save in s3 bucket
            ContentType: file.image.mimetype,
            Body: fileContent
        }
    
        s3.upload(bucketParams, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {

                let params;
                let query;

                // type 에 따라 각각 params, query 지정 후 DB write
                switch(type) {
                    case 'english':
                        params = [studentID, 0, data.Location];
                        query = "INSERT INTO LevelTest VALUES (?, ?, ?)";
                        break;
                    case 'math':
                        params = [studentID, 1, data.Location];
                        query = "INSERT INTO LevelTest VALUES (?, ?, ?)";
                        break;
                    case 'checklist':
                        params = [data.Location, studentID];
                        query = "UPDATE NewRecord SET checklist=? \
                        WHERE studentID=?";
                        break;   
                    case 'sca':
                        params = [studentID, 0, data.Location];
                        query = "INSERT INTO Testpaper VALUES (?, ?, ?)";
                        break;  
                    case 'cps':
                        params = [studentID, 1, data.Location];
                        query = "INSERT INTO Testpaper VALUES (?, ?, ?)";
                        break;  
                    case 'careerNet':
                        params = [studentID, 2, data.Location];
                        query = "INSERT INTO Testpaper VALUES (?, ?, ?)";
                        break;  
                    case 'sixSense':
                        params = [studentID, 3, data.Location];
                        query = "INSERT INTO Testpaper VALUES (?, ?, ?)";
                        break;  
                    case 'etc':
                        params = [studentID, 4, data.Location];
                        query = "INSERT INTO Testpaper VALUES (?, ?, ?)";
                        break;  
                }

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