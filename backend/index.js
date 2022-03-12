const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => res.send("Hello World~!"));

app.get("/api/newModify", (req, res) => {
    res.status(200).json({
        firstLevel : {
            regEnglish : "2022-03-12",
            lvEnglish : "lv1",
            regMath : "2022-03-12",
            lvMath : "lv2"
        }
    });
})

app.post("/api/newModify", (req, res) => {
    res.send("post newModify")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
