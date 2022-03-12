var regAtEng = document.getElementById("regAtEng");
var regLvEng = document.getElementById("regLvEng");
var regAtMath = document.getElementById("regAtMath");
var regLvMath = document.getElementById("regLvMath");

fetch('localhost:8000/api/newModify').then(function(res){
    res.json().then(function(json){
        regAtEng.placeholder = json.regEnglish;
        regLvEng.placeholder = json.lvEnglish;
        regAtMath.placeholder = json.regMath;
        regLvMath.placeholder = json.lvMath;
    })
})