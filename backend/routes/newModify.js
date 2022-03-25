const express = require('express');
const router = express.Router();
// const cors = require('cors');

router.get("/", (req, res) => {
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

module.exports = router;