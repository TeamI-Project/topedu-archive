let teacher = document.getElementById("teacherComment");
let student = document.getElementById("studentComment");
let parents = document.getElementById("parentsComment");
let etc = document.getElementById("etcComment");

const url = "http://top-edu.co.kr:8000/api/";

fetch(url).then(function(res){
    res.json().then(function(json){
        teacher.innerHTML += '<textarea id="teacherText" cols="30" rows="10"></textarea>';
        student.innerHTML += '<textarea id="studentText" cols="30" rows="10"></textarea>';
        parents.innerHTML += '<textarea id="parentsText" cols="30" rows="10"></textarea>';
        etc.innerHTML += '<textarea id="etcText" cols="30" rows="10"></textarea>';
        
    })
})