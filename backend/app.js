const fs = require('fs');
const express = require("express");
const https = require('https');
// const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.urlencoded({ 
    extended: true,
    limit: "50mb"
}));
app.use(express.json({
    limit: "50mb"
}));

const privateKey = fs.readFileSync("/etc/letsencrypt/live/archive.top-edu.co.kr/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/archive.top-edu.co.kr/cert.pem", "utf8")
const ca = fs.readFileSync("/etc/letsencrypt/live/archive.top-edu.co.kr/fullchain.pem", "utf8")

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const studentID = require('./routes/studentID');
const studentInfo = require('./routes/studentInfo');
const newModify = require('./routes/newModify');
const resultModify = require('./routes/resultModify');
const gradeModify = require('./routes/gradeModify');
const monthly = require('./routes/monthly');
const comment = require('./routes/comment');
const upload = require('./routes/upload');
const del = require('./routes/delete');
const login = require('./routes/login');
const teacher = require('./routes/teacher');

app.use('/api/studentID', cors(), studentID);
app.use('/api/studentInfo', cors(), studentInfo);
app.use('/api/newModify', cors(), newModify);
app.use('/api/resultModify', cors(), resultModify);
app.use('/api/gradeModify', cors(), gradeModify);
app.use('/api/monthly', cors(), monthly);
app.use('/api/comment', cors(), comment);
app.use('/api/upload', cors(), upload);
app.use('/api/delete', cors(), del);
app.use('/api/login', cors(), login);
app.use('/api/teacher', cors(), teacher);

app.get("/", (req, res) => res.send("Hello World~!"));

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

