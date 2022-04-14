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
const uploadURL = "https://archive.top-edu.co.kr:8000/api/upload";
const deleteURL = "https://archive.top-edu.co.kr:8000/api/delete";

let SCA = document.getElementById("scaImg");
let CPS = document.getElementById("cpsImg");
let careerNet = document.getElementById("careerPath");
let sixSense = document.getElementById("ssImg");
let testEtc = document.getElementById("etcImg");

let scaCnt = 0;
let cpsCnt = 0;
let ssCnt = 0;
let etcCnt = 0;

const url = "https://archive.top-edu.co.kr:8000/api/resultModify?id="+studentID;

fetch(url).then(function(res){
    res.json().then(function(json){

        let scaImg = json.SCA.sca;
        for(i=0; i<scaImg.length; i++){
            SCA.innerHTML += '<img name="sca" class ="mini_img" src="'+scaImg[i].substr(14)+'" onclick="delImg(this)"/>';
        }

        let cpsImg = json.CPS.cps;
        for(i=0; i<cpsImg.length; i++){
            CPS.innerHTML += '<img name="cps" class ="mini_img" src="'+cpsImg[i].substr(14)+'" onclick="delImg(this)"/>';
        }

        let careerImg = json.careerNet.careerNet;
        for(i=0; i<careerImg.length; i++){
            careerNet.innerHTML += '<img name="career" class ="mini_img" src="'+careerImg[i].substr(14)+'" onclick="delImg(this)"/>';
        }

        let ssImg = json.sixSense.sixSense;
        for(i=0; i<ssImg.length; i++){
            sixSense.innerHTML += '<img name="ss" class ="mini_img" src="'+ssImg[i].substr(14)+'" onclick="delImg(this)"/>';
            ssCnt+=1;
        }

        let etcImg = json.testEtc.etc;
        for(i=0; i<etcImg.length; i++){
            testEtc.innerHTML += '<img name="etc" class ="mini_img" src="'+etcImg[i].substr(14)+'" onclick="delImg(this)"/>';
            etcCnt+=1;
        }
    })
})

// img code
function addSCAImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "sca");
    formData.append("image", file);

    fetch(uploadURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            location.reload();
        }
        else{
            alert("이미지 저장에 실패했습니다.");
        }
    }).catch(error => alert('이미지 저장에 실패했습니다.'));

};


function addCPSImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "cps");
    formData.append("image", file);

    fetch(uploadURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            location.reload();
        }
        else{
            alert("이미지 저장에 실패했습니다.");
        }
    }).catch(error => alert('이미지 저장에 실패했습니다.'));
};

function addCareerImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "careerNet");
    formData.append("image", file);

    fetch(uploadURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            location.reload();
        }
        else{
            alert("이미지 저장에 실패했습니다.");
        }
    }).catch(error => alert('이미지 저장에 실패했습니다.'));
};

function addSSImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "sixSense");
    formData.append("image", file);

    fetch(uploadURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            location.reload();
        }
        else{
            alert("이미지 저장에 실패했습니다.");
        }
    }).catch(error => alert('이미지 저장에 실패했습니다.'));
};

function addEtcImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "etc");
    formData.append("image", file);

    fetch(uploadURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg === 'success') {
            location.reload();
        }
        else{
            alert("이미지 저장에 실패했습니다.");
        }
    }).catch(error => alert('이미지 저장에 실패했습니다.'));
};

//사진 삭제
function delImg(tag){
    let temp = tag.src.split("/");
    let src = "/var/www/html/uploads/testResult/"+tag.name+"/"+temp[temp.length-1];
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', tag.name);
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

function doneModify(){
    location.href = "archive.html";
}