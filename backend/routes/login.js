const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');

router.post("/", (req, res) => {
    
    const params = [req.body.id, req.body.pw];
    const query = "SELECT teacherID FROM Teacher WHERE teacherID=? AND teacherPW=?"
    connection.query(query, params, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            if (results.length > 0) {
                res.status(200).json({
                    "msg": "ok"
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