const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');

router.get("/", (req, res) => {
    const id = req.query.id;
    const query = "SELECT * FROM Students WHERE studentID=?"
    connection.query(query, id, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const ans = {};
            Object.keys(results).forEach((key) => {
                const row = results[key];

                ans.name = row.studentName;
                ans.branch = row.branch;
                ans.img = row.studentImg;
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