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



//firstLevel
let regAtEng = document.getElementById("regAtEng");
let regLvEng = document.getElementById("regLvEng");
let regAtMath = document.getElementById("regAtMath");
let regLvMath = document.getElementById("regLvMath");
//levelTest
let engTestImg = document.getElementById("engTestImg");
let mathTestImg = document.getElementById("mathTestImg");
//newConsulting
let friendShip = document.getElementById("friendShip");
let personality = document.getElementById("personality");
let parentShip = document.getElementById("parentShip");
let concentration = document.getElementById("concentration");
let homework = document.getElementById("homework");
let textbox = document.getElementById("textbox");
//newChecklist
let checkList = document.getElementById("newCheckImg");


let use1 = ["좋음", "보통", "도움필요"];
let use2 = ["외향적", "내향적", "외내향적"];
let use3 = ["좋음", "보통", "개선필요"];

let engImgCnt = 0;
let mathImgCnt = 0;
let checkImgCnt = 0;

let english;
let math;
let checklist;

const id = '?id='+studentID;
const url = "https://archive.top-edu.co.kr:8000/api/newModify";

fetch(url+id).then(function(res){
    res.json().then(function(json){
        //1
        if(json.firstLevel.regEng == null){
            regAtEng.value = 'x';
        }
        else{
            regAtEng.value = json.firstLevel.regEng;
        }

        if(json.firstLevel.lvEnglish == null){
            regLvEng.value = 'x';
        }
        else{
            regLvEng.value = json.firstLevel.lvEnglish;
        }
        
        if(json.firstLevel.regMath == null){
            regAtMath.value = 'x';
        }
        else{
            regAtMath.value = json.firstLevel.regMath;
        }

        if(json.firstLevel.lvMath == null){
            regLvMath.value = 'x';
        }
        else{
            regLvMath.value = json.firstLevel.lvMath;
        }      
        

        //2
        let engImg = json.levelTest.english;
        if(engImg.length > 0){
            for(i=0; i < engImg.length ; i++){
                engTestImg.innerHTML += '<img name="english" class="mini_img" src="' + engImg[i] +'" onclick="delImg(this)"></img>';
            }
        }
        
            
        
        let mathImg = json.levelTest.math;
        if(mathImg.length > 0){
            for(i=0; i < mathImg.length ; i++){
                mathTestImg.innerHTML += '<img name="math" class="mini_img" src="' + mathImg[i] +'" onclick="delImg(this)"></img>';
            }
        }


        //3
        let newc = json.newConsulting;
        for(i=0; i<3; i++){
            var temp = '';

            //friendShip
            temp += '<label class="radioBtn">\
            <input type="radio" name="chk_friendShip" id="friendShip'+i+'" ';

            if(newc.friendship == i){
                temp += 'checked = "checked"';
            }
            temp += '><span>'+use1[i]+'</span></label>';
            friendShip.innerHTML += temp;

            temp = '';
            //personality
            temp += '<label class="radioBtn">\
            <input type="radio" name="chk_personality" id="personality'+i+'" ';

            if(newc.personality == i){
            temp += 'checked = "checked"';
            }
            temp += '><span>'+use2[i]+'</span></label>';
            personality.innerHTML += temp;

            temp = '';
            //parentShip
            temp += '<label class="radioBtn">\
            <input type="radio" name="chk_parentShip" id="parentShip'+i+'" ';

            if(newc.parentship == i){
            temp += 'checked = "checked"';
            }
            temp += '><span>'+use3[i]+'</span></label>';
            parentShip.innerHTML += temp;

            temp = '';
            //concentration
            temp += '<label class="radioBtn">\
            <input type="radio" name="chk_concentration" id="concentration'+i+'" ';

            if(newc.concentration == i){
            temp += 'checked = "checked"';
            }
            temp += '><span>'+use1[i]+'</span></label>';
            concentration.innerHTML += temp;


            temp = '';
            //homework
            temp += '<label class="radioBtn">\
            <input type="radio" name="chk_homework" id="homework'+i+'" ';

            if(newc.homework == i){
            temp += 'checked = "checked"';
            }
            temp += '><span>'+use1[i]+'</span></label>';
            homework.innerHTML += temp;
        }

        textbox.innerHTML += '<textarea>'+newc.comment+'</textarea>';
        
        //4
        let checkListImg = json.newCheckList.checkList;
        if(checkListImg.length > 0){
            for(i=0; i < checkListImg.length ; i++){
                checkList.innerHTML += '<img name="checklist" class="mini_img" src="' + checkListImg[i] +'" onclick="delImg(this)"></img>';
            }
        }
        
    })
})

//이미지 불러오는 코드 넣기
function addEngImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "english");
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

function addMathImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "math");
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


function newCheckImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('type', "checklist");
    formData.append("image", file);

    fetch(uploadURL, {
        method: "POST",
        body: formData
    }).then(res => res.json())
    .then(response => {
        if (response.msg == 'success') {
            location.reload();
        }
        else{
            alert("이미지 저장에 실패했습니다.");
        }
    }).catch(error => alert('이미지 저장에 실패했습니다.'));

};

function delImg(tag){
    let src = tag.src;
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

function doneModify() {
    let regEnglish = regAtEng.value;
    let lvEnglish = regLvEng.value;
    let regMath = regAtMath.value;
    let lvMath = regLvMath.value;

    if(regEnglish == 'x'){
        regEnglish = null;
    }
    if(lvEnglish == 'x'){
        lvEnglish = null;
    }
    if(regMath == 'x'){
        regMath = null;
    }
    if(lvMath == 'x'){
        lvMath = null;
    }

    var temp = '';

    temp = document.querySelector('input[name="chk_friendShip"]:checked').id;
    friendShip = parseInt(temp.substr(-1));

    temp = document.querySelector('input[name="chk_personality"]:checked').id;
    personality = parseInt(temp.substr(-1));

    temp = document.querySelector('input[name="chk_parentShip"]:checked').id;
    parentShip = parseInt(temp.substr(-1));

    temp = document.querySelector('input[name="chk_concentration"]:checked').id;
    concentration = parseInt(temp.substr(-1));

    temp = document.querySelector('input[name="chk_homework"]:checked').id;
    homework = parseInt(temp.substr(-1));

    textbox = document.getElementById('textbox').children[0].value;

    let firstLevel = {
        "regEng" : regEnglish,
        "levelEng" : lvEnglish,
        "regMath" : regMath,
        "levelMath" : lvMath
    }
    let newConsulting = {
        "friendship" : friendShip,
        "personality" : personality,
        "parentship" : parentShip,
        "concentration" : concentration,
        "homework" : homework,
        "comment" : textbox
    }
    
    var formData = new FormData();
    formData.append('id',studentID);
    formData.append('firstLevel', JSON.stringify(firstLevel));
    formData.append("newConsulting",JSON.stringify(newConsulting));
   
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


