let grade = ['middle1-1-1', 'middle1-1-2', 'middle1-2-1', 'middle1-2-2', 'middle2-1-1', 'middle2-1-2', 'middle2-2-1', 'middle2-2-2', 'middle3-1-1', 'middle3-1-2', 'middle3-2-1', 'middle3-2-2', 'high1-1-1', 'high1-1-2', 'high1-2-1', 'high1-2-2', 'high2-1-1', 'high2-1-2', 'high2-2-1', 'high2-2-2', 'high3-1-1', 'high3-1-2']

let select = document.getElementById("grade");
let show = document.getElementById("showImg");

const url = "http://top-edu.co.kr:8000/api/gradeModify";

let middle;
let high;

let imgCnt = 0;

fetch(url).then(function(res){
    res.json().then(function(json){

        middle = json.gradeMiddle;
        high = json.gradeHigh;
        
    })
})

function changeImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newPath = '<img id='+imgCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" ></img>';
    imgCnt+=1;

    //이미지를 image-show div에 추가
    var pathList = document.getElementById('showImg');
    pathList.innerHTML = newPath;
}

function delImg(input){
    
    var file = input;
    let remove = document.getElementById(file);

    remove.remove();
}


function doneModify(){

    let selectVal = select.options[select.selectedIndex].value;
    let img = document.getElementById('showImg').children;
    if(img.length == 0){
        alert("ERROR : 이미지가 없습니다.");
    }
    else{
        img = img[0].src;
        //이미지 있을 때 데이터 전송 여기에 작성
    }

    var data = {
        "gradeType" : selectVal,
        "gradePath" : img
    }

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((res) => console.log(res))
}