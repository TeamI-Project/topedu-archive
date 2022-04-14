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
                month
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

//     const studentID = req.body.id;

//     const month = req.body.month;
//     const imgPath = req.body.imgPath;

//     const params = [imgPath, studentID, month];

//     const query = "UPDATE Monthly SET monthPath=? \
//     WHERE studentID=? AND monthType=?";
    
//     connection.query(query, params, (err, results, field) => {
//         if (err) throw err;
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
    let month = "";
    let newpath = "";

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
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
        const oldpath = files.imgPath.filepath;
        newpath = config.upload_url + "monthly/" + files.imgPath.newFilename;
        
        fs.rename(oldpath, newpath, (err) => {
            if(err) throw err;
        })
        

        const params = [newpath, studentID, month];
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
    })
})

module.exports = router;