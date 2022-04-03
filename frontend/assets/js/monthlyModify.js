let month = document.getElementById("month");
let monthlyImg = document.getElementById("monmonthlyImgth");

const url = "http://top-edu.co.kr:8000/api/gradeModify";

let monthData;

fetch(url).then(function(res){
    res.json().then(function(json){

        monthData = json.month;
        
    })
})

function changeMonth(){
    let selectMonth = month.options[month.selectedIndex].value;
    monthlyImg.innerHTML += '<img class ="mini_img" src="'+monthData[selectMonth]+'" onclick="window.open(this.src)"/>';
}
