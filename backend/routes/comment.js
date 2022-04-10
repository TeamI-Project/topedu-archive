const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);
// const cors = require('cors');
// ALTER USER 'topedu'@'localhost' IDENTIFIED WITH mysql_native_password BY 'topedu';

router.get("/", (req, res) => {
    const studentID = req.query.id;
    const query = "SELECT * FROM Consulting WHERE studentID=?"
    connection.query(query, studentID, (err, results, field) => {
        if (err) throw err;
        res.header("Access-Control-Allow-Origin", "*");
        try {
            const comment = {};
            Object.keys(results).forEach((key) => {
                const row = results[key];

                comment.teacher = row.teacherComment;
                comment.student = row.studentComment;
                comment.parents = row.parentsComment;
                comment.etc = row.etcComment;
            });

            res.status(200).json({
                comment
            });
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send(err.message);
        }         
    });
})


router.post("/", express.json(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const studentID = req.body.id;

    const teacher = req.body.teacher;
    const student = req.body.student;
    const parents = req.body.parents;
    const etc = req.body.etc;

    const params = [teacher, student, parents, etc, studentID];

    const query = "UPDATE Consulting SET teacherComment=?, \
    studentComment=?, parentsComment=?, etcComment=? \
    WHERE studentID=?";
    
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

module.exports = router;