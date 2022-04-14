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

let month = document.getElementById("month");
let monthlyImg = document.getElementById("monthlyImg");
let select = document.getElementById("month");

const url = "https://archive.top-edu.co.kr:8000/api/monthly?id="+studentID;

let monthData;
let ImgCnt=0;
let file;

fetch(url).then(function(res){
    res.json().then(function(json){

        monthData = json.month;
        
    })
})

function changeMonth(){
    monthlyImg.innerHTML = "";
    let selectMonth = month.options[month.selectedIndex].value;
    let img = monthData[selectMonth]
    monthlyImg.innerHTML += '<img class ="mini_img" src="'+monthData[selectMonth]+'" onclick="window.open(this.src)"/>';
}

function addEngImg(input) {
    if(file != null){
        alert("하나의 이미지만 추가할 수 있습니다.");
        return;
    }

    file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="window.open(this.src)"></img>';

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('monthlyImg');
    imgList.innerHTML += (newImage);
};

function delImg(input){
    
    var file = input;
    let remove = document.getElementById(file);

    remove.remove();
}

function doneModify(){
    let selectVal = select.options[select.selectedIndex].value;
    let img = document.getElementById('monthlyImg').children;

    let imgPath = []
    for(i=0; i < img.length ; i++){
        imgPath.push(img[i].src);
    }
    
    var data = {
        "id" : studentID,
        "month" : selectVal,
        "imgPath" : imgPath
    }

    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('month', selectVal);
    formData.append("imgPath",file);
   
    fetch(url, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            alert("success")
            location.href="archive.html";
        }
        else{
            alert("error");
        }
    }).catch(error => alert('error'));
}