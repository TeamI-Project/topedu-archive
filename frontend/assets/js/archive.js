//firstLevel
let regAtEng = document.getElementById("regAtEng");
let regLvEng = document.getElementById("regLvEng");
let regAtMath = document.getElementById("regAtMath");
let regLvMath = document.getElementById("regLvMath");
//levelTest
let engTestImg = document.getElementById("engTestImg");
let mathTestImg = document.getElementById("mathTestImg");
//newConsulting
let friendShip = document.getElementById("friendShip");
let personality = document.getElementById("personality");
let parentShip = document.getElementById("parentShip");
let concentration = document.getElementById("concentration");
let homework = document.getElementById("homework");
let textbox = document.getElementById("textbox");
//newChecklist
let checkList = document.getElementById("newCheckImg");

const url = "http://top-edu.co.kr:8000/api/all";

fetch(url).then(function(res){
    res.json().then(function(json){
        
        
    })
})