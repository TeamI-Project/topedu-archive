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

let monthCode = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const url = "https://archive.top-edu.co.kr:8000/api/monthly?id="+studentID;
const deleteURL = "https://archive.top-edu.co.kr:8000/api/delete";

let monthData;
let ImgCnt=0;

fetch(url).then(function(res){
    res.json().then(function(json){

        monthData = json.month;
        changeMonth()
        
    })
})

function changeMonth(){
    monthlyImg.innerHTML = "";


    let monthVal = month.options[month.selectedIndex].value;
    let index = monthCode.indexOf(monthVal);
    let img = monthData[index]

    for(i=0; i<img.length; i++){
        monthlyImg.innerHTML += '<img class ="mini_img" src="'+img[i]+'" onclick="delImg(this)"/>';
    }
   
}



function addEngImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기
    let selectVal = select.options[select.selectedIndex].value;

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
            location.reload();
        }
        else{
            alert("error");
        }
    }).catch(error => alert('error'));
};

function delImg(input){

    let src = input.src;
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "monthly");
    formData.append("image", src);

    fetch(deleteURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            tag.remove();
        }
        else{
            alert("이미지 삭제에 실패했습니다.");
        }
    }).catch(error => alert('이미지 삭제에 실패했습니다.'));
}
