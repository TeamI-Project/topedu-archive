const fs = require('fs');
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 8000;

// const privateKey = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/privkey.pem", "utf8");
// const certificate = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/cert.pem", "utf8")
// const ca = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/chain.pem", "utf8")

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };

// const httpsServer = https.createServer(credentials, app)

const newModify = require('./routes/newModify');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/newModify', cors(), newModify);

app.get("/", (req, res) => res.send("Hello World~!"));

// httpsServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

