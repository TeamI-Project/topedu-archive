const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    const name = req.query.name;
    const query = "SELECT * FROM Students WHERE studentName=?"
    connection.query(query, name, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const ans = { result : [] };
            Object.keys(results).forEach((key) => {
                const row = results[key];

                ans.result.push(row.studentID);
            });

            res.status(200).json({
                ans
            });
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})

module.exports = router;