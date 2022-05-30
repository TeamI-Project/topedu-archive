const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
const formidable = require('formidable');
const fs = require('fs');
const config = require('../config/config');
// const cors = require('cors');

router.post("/", (req, res) => {

    let name = "";
    let id = "";
    let newPath = "";
    let branch = "";
    let status = "";
    let oldPath = "";


    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        name = fields.name;
        id = fields.id;
        branch = fields.branch;
        status = fields.status;

        oldPath = files.image.filepath;
        newPath = config.upload_url + 'students/' + files.image.newFilename;

        fs.rename(oldPath, newPath, (err) => {
            if(err) throw err;
        })
    
        const params = [id, name, newPath, branch, status];
        const query = "INSERT INTO Students VALUES (?, ?, ?, ?, ?)";
        connection.query(query, params, (err, results, field) => {
            if (err) throw err;
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
        });
    })
})

module.exports = router;