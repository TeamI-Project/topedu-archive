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

//let grade = ['middle1-1-1', 'middle1-1-2', 'middle1-2-1', 'middle1-2-2', 'middle2-1-1', 'middle2-1-2', 'middle2-2-1', 'middle2-2-2', 'middle3-1-1', 'middle3-1-2', 'middle3-2-1', 'middle3-2-2', 'high1-1-1', 'high1-1-2', 'high1-2-1', 'high1-2-2', 'high2-1-1', 'high2-1-2', 'high2-2-1', 'high2-2-2', 'high3-1-1', 'high3-1-2']

let select = document.getElementById("grade");
let show = document.getElementById("showImg");

const url = "http://localhost:8000/api/gradeModify?id="+studentID;

let middle;
let high;

let imgCnt = 0;

fetch(url).then(function(res){
    res.json().then(function(json){

        middle = json.gradeMiddle;
        high = json.gradeHigh;
        
    })
})

let file;

function changeImg(input) {

    file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newPath = '<img id='+imgCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" ></img>';
    imgCnt+=1;

    //이미지를 image-show div에 추가
    var pathList = document.getElementById('showImg');
    pathList.innerHTML = newPath;
}

function delImg(input){
    
    var tmp = input;
    let remove = document.getElementById(tmp);

    remove.remove();
    file = null;
}


function doneModify(){

    let selectVal = select.options[select.selectedIndex].value;
    let img = document.getElementById('showImg').children;
    if(file == null){
        alert("ERROR : 이미지가 없습니다.");
        return
    }

    var formData = new FormData();
    console.log(formData);
    formData.append('id',studentID);
    formData.append('gradeType', selectVal);
    formData.append("gradePath", file);

    var data = {
        "id" : studentID,
        "gradeType" : selectVal,
        "gradePath" : file
    }

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    }).then((res) => console.log(res))
}