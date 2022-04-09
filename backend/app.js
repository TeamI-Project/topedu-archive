const fs = require('fs');
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(app.router)

const privateKey = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/cert.pem", "utf8")
const ca = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/chain.pem", "utf8")

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};


const newModify = require('./routes/newModify');
const resultModify = require('./routes/resultModify');
const gradeModify = require('./routes/gradeModify');
const monthly = require('./routes/monthly');
const comment = require('./routes/comment');

app.use('/api/newModify', cors(), newModify);
app.use('/api/resultModify', cors(), resultModify);
app.use('/api/gradeModify', cors(), gradeModify);
app.use('/api/monthly', cors(), monthly);
app.use('/api/comment', cors(), comment);

app.get("/", (req, res) => res.send("Hello World~!"));

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

