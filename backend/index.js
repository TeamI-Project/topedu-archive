const express = require("express");
const cors = require('cors')
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
