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
            case 0:
                month = "jan";
                break;
            case 1:
                month = "feb";
                break;
            case 2:
                month = "mar";
                break;
            case 3:
                month = "apr";
                break;
            case 4:
                month = "may";
                break;
            case 5:
                month = "jun";
                break;
            case 6:
                month = "jul";
                break;
            case 7:
                month = "aug";
                break;
            case 8:
                month = "sep";
                break;
            case 9:
                month = "oct";
                break;
            case 10:
                month = "nov";
                break;
            case 11:
                month = "dec";
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