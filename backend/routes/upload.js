const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const formidable = require('formidable');
const fs = require('fs');
const config = require('../config/config');

router.post("/", express.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let studentID = "";
    let type = "";
    let newpath = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        studentID = fields.id;
        type = fields.type;
        const oldpath = files.image.filepath;
        switch(type) {
            case 'english':
            case 'math':
                newpath = config.upload_url + 'levelTest/' + files.image.newFilename;
                break;
            case 'checklist':
                newpath = config.upload_url + 'etcImg/' + files.image.newFilename;
                break;   
            case 'sca':
                newpath = config.upload_url + 'testResult/sca/' + files.image.newFilename;
                break;  
            case 'cps':
                newpath = config.upload_url + 'testResult/cps/' + files.image.newFilename;
                break;  
            case 'careerNet':
                newpath = config.upload_url + 'testResult/career/' + files.image.newFilename;
                break;  
            case 'sixSense':
                newpath = config.upload_url + 'testResult/ss/' + files.image.newFilename;
                break;  
            case 'etc':
                newpath = config.upload_url + 'testResult/etc/' + files.image.newFilename;
                break;  
        }

        fs.rename(oldpath, newpath, (err) => {
            if(err) throw err;
        })

        let params;
        let query;

        switch(type) {
            case 'english':
                params = [studentID, 0, newpath];
                query = "INSERT INTO LevelTest VALUES (?, ?, ?)";
                break;
            case 'math':
                params = [studentID, 1, newpath];
                query = "INSERT INTO LevelTest VALUES (?, ?, ?)";
                break;
            case 'checklist':
                params = [newpath, studentID];
                query = "UPDATE NewRecord SET checklist=? \
                WHERE studentID=?";
                break;   
            case 'sca':
                params = [studentID, 0, newpath];
                query = "INSERT INTO TestPaper VALUES (?, ?, ?)";
                break;  
            case 'cps':
                params = [studentID, 1, newpath];
                query = "INSERT INTO TestPaper VALUES (?, ?, ?)";
                break;  
            case 'careerNet':
                params = [studentID, 2, newpath];
                query = "INSERT INTO TestPaper VALUES (?, ?, ?)";
                break;  
            case 'sixSense':
                params = [studentID, 3, newpath];
                query = "INSERT INTO TestPaper VALUES (?, ?, ?)";
                break;  
            case 'etc':
                params = [studentID, 4, newpath];
                query = "INSERT INTO TestPaper VALUES (?, ?, ?)";
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
    })
})

module.exports = router;