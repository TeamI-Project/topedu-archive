const express = require("express");
const cors = require('cors')
const https = require('https')
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

const privateKey = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/cert.pem", "utf8")
const ca = fs.readFileSync("/etc/letsencrypt/live/top-edu.co.kr/chain.pem", "utf8")

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpsServer = https.createServer(credentials, app)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World~!"));

app.get("/api/newModify", cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        res.status(200).json({
            firstLevel : {
                regEnglish : "2022-03-12",
                lvEnglish : "lv1",
                regMath : "2022-03-12",
                lvMath : "lv2"
            }
        });
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
})

app.post("/api/newModify", (req, res) => {
    res.send("post newModify")
})

httpsServer.listen(port, () => console.log(`Example app listening on port ${port}!`));
