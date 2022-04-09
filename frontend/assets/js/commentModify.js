let teacher = document.getElementById("teacherComment");
let student = document.getElementById("studentComment");
let parents = document.getElementById("parentsComment");
let etc = document.getElementById("etcComment");

const url = "http://top-edu.co.kr:8000/api/commentModify";

fetch(url).then(function(res){
    res.json().then(function(json){
        teacher.innerHTML += '<textarea id="teacherText" cols="30" rows="10">'+json.teacherComment+'</textarea>';
        student.innerHTML += '<textarea id="studentText" cols="30" rows="10">'+studentComment+'</textarea>';
        parents.innerHTML += '<textarea id="parentsText" cols="30" rows="10">'+parentsComment+'</textarea>';
        etc.innerHTML += '<textarea id="etcText" cols="30" rows="10">'+etcComment+'</textarea>';
        
    })
})

function doneModify(){
    teacher = document.getElementById('teacherText').value;
    student = document.getElementById('studentText').value;
    parents = document.getElementById('parentsText').value;
    etc = document.getElementById('etcText').value;
    
    var data = {
        teacher : teacher,
        student : student,
        parents : parents,
        etc : etc
    }
}