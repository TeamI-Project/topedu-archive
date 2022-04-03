let gradeMiddle = document.getElementById("gradeMiddle");
let gradeHigh = document.getElementById("gradeHigh");
let middleImg = document.getElementById("middleImg");
let highImg = document.getElementById("highImg");

const url = "http://top-edu.co.kr:8000/api/gradeModify";

let middle;
let high;

fetch(url).then(function(res){
    res.json().then(function(json){

        middle = json.gradeMiddle;
        high = json.gradeHigh;
        
    })
})

function chengeMiddle(){
    let selectMiddle = gradeMiddle.options[gradeMiddle.selectedIndex].value;
    let imgs = middle[selectMiddle];
    for(i=0; i < imgs.length ; i++){
        middleImg.innerHTML += '<img class ="mini_img" src="'+imgs[i]+'" onclick="window.open(this.src)"/>';
    }
}

function changeHigh(){
    let selectHigh = gradeHigh.options[gradeHigh.selectedIndex].value;
    let imgs = high[selectHigh];
    for(i=0; i < imgs.length ; i++){
        highImg.innerHTML += '<img class ="mini_img" src="'+imgs[i]+'" onclick="window.open(this.src)"/>';
    }
}