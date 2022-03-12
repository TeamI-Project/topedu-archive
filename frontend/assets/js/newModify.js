var regAtEng = document.getElementById("regAtEng");
var regLvEng = document.getElementById("regLvEng");
var regAtMath = document.getElementById("regAtMath");
var regLvMath = document.getElementById("regLvMath");

const url = "https://localhost:8000/api/newModify"

fetch(url).then(function(res){
    res.json().then(function(json){
        regAtEng.placeholder = json.firstLevel.regEnglish;
        regLvEng.placeholder = json.firstLevel.lvEnglish;
        regAtMath.placeholder = json.firstLevel.regMath;
        regLvMath.placeholder = json.firstLevel.lvMath;
    })
})