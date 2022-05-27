const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');

router.get("/", (req, res) => {
    const sid = req.query.id;
    const query = "SELECT studentID FROM Students WHERE studentID=?"
    connection.query(query, sid, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            if (results.length > 0) {
                // id 중복
                res.status(200).json({
                    "msg": "double"
                });
            } else {
                // id 중복 X
                res.status(200).json({
                    "msg": "ok"
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