function getCookie() {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');
 
        var dic = item.split('=');

        var key = "student";

        if (key === dic[0]) {
            result = dic[1];
            return true;    // break;
        }
    });
    return unescape(result);
}

let studentID = getCookie();

let teacher = document.getElementById("teacherComment");
let student = document.getElementById("studentComment");
let parents = document.getElementById("parentsComment");
let etc = document.getElementById("etcComment");

const url = "https://archive.top-edu.co.kr:8000/api/comment?id="+studentID;

fetch(url).then(function(res){
    res.json().then(function(json){
        teacher.innerHTML += '<textarea id="teacherText" cols="30" rows="10">'+json.ans.teacher+'</textarea>';
        student.innerHTML += '<textarea id="studentText" cols="30" rows="10">'+json.ans.student+'</textarea>';
        parents.innerHTML += '<textarea id="parentsText" cols="30" rows="10">'+json.ans.parents+'</textarea>';
        etc.innerHTML += '<textarea id="etcText" cols="30" rows="10">'+json.ans.etc+'</textarea>';
        
    })
})

function doneModify(){
    teacher = document.getElementById('teacherText').value;
    student = document.getElementById('studentText').value;
    parents = document.getElementById('parentsText').value;
    etc = document.getElementById('etcText').value;
    
    var data = {
        "id" : studentID,
        "teacher" : teacher,
        "student" : student,
        "parents" : parents,
        "etc" : etc
    }

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((res) => console.log(res))
}