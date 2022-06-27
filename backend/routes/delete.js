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
    let image = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        studentID = fields.id;
        type = fields.type;
        image = fields.image;

        let params;
        let query;

        switch(type) {
            case 'english':
            case 'math':
                params = [studentID, image];
                query = "DELETE FROM LevelTest \
                WHERE studentID=? AND dataPath=?";
                break;
            case 'checklist':
                params = [studentID, image];
                query = "DELETE FROM Checklist \
                WHERE studentID=? AND imgPath=?";
                break;
            case 'monthly':
                params = [studentID, image];
                query = "DELETE FROM Monthly \
                WHERE studentID=? AND monthPath=?";
                break;
            case 'sca':
            case 'cps':
            case 'careerNet':
            case 'sixSense':
            case 'etc':
                params = [studentID, image];
                query = "DELETE FROM Testpaper \
                WHERE studentID=? AND dataPath=?";
                break;
        }

        objectPath = image.replace(config.upload_url, '');
        s3.deleteObject({
            Bucket: bucketName,
            Key: objectPath // fileName
        }, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
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
        })
    })
})

module.exports = router;