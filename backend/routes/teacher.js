const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');

router.get("/", (req, res) => {
    const teacherID = req.query.id;
    const query = "SELECT branch FROM Teacher WHERE teacherID=?";
    connection.query(query, teacherID, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            if (results.length > 0) {
                res.status(200).json({
                    "branch": results[0].branch
                });
            } else {
                res.status(200).json({
                    "msg": "error"
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})

module.exports = router;