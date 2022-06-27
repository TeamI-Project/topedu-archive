const express = require('express');
const multer = require('multer');
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

router.post("/", (req, res) => {

    let name = "";
    let id = "";
    let branch = "";
    let status = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        name = fields.name;
        id = fields.id;
        passwd = fields.passwd;
        branch = fields.branch;
        status = fields.status;

        const fileContent = fs.readFileSync(file.image.filepath);

        const bucketParams = {
            Bucket: bucketName,
            Key: `students/${Date.now()}_${file.image.originalFilename}`, // file name that you want to save in s3 bucket
            ContentType: file.image.mimetype,
            Body: fileContent
        }
    
        s3.upload(bucketParams, (err, data) => {
            if (err) {
                res.send(err);
            }
            else {
                const params = [id, name, data.Location, branch, status];
                const query = "INSERT INTO Students VALUES (?, ?, ?, ?, ?)";
                connection.query(query, params, (err, results, field) => {
                    if (err) throw err;
                });

                const createConsultng = `INSERT INTO Consulting VALUES ('${id}', null, null, null, null);`;
                let createGrade = '';
                for(let gid=0; gid < 22; gid++) {
                    createGrade += `INSERT INTO Grade VALUES ('${id}', ${gid}, null);`
                }
                const createNewRecord = `INSERT INTO NewRecord VALUES ('${id}', null, null, null, null, 0, 0, 0, 0, 0, null);`;

                connection.query(createConsultng + createGrade + createNewRecord, (err, results, field) => {
                    if(err) throw err;
                    res.header("Access-Control-Allow-Origin", "*");
                    try {
                        res.status(200).json({
                            "msg": "success"
                        });
                    } catch (err) {
                        console.log(err);
                        res.status(500);
                        res.send(err.message);
                    }        
                })
            }
        });
    })
})

module.exports = router;