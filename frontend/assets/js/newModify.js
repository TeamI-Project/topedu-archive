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

const id = '?id=mtop1234'
const url = "https://top-edu.co.kr:8000/api/newModify";

fetch(url+id).then(function(res){
    res.json().then(function(json){
        //1
        if(json.firstLevel.regEng == null){
            regAtEng.value = 'x';
        }
        else{
            regAtEng.value = json.firstLevel.regEng;
        }

        if(json.firstLevel.levelEng == null){
            regLvEng.value = 'x';
        }
        else{
            regLvEng.value = json.firstLevel.levelEng;
        }
        
        if(json.firstLevel.regMath == null){
            regAtMath.value = 'x';
        }
        else{
            regAtMath.value = json.firstLevel.regMath;
        }

        if(json.firstLevel.levelMath == null){
            regLvMath.value = 'x';
        }
        else{
            regLvMath.value = json.firstLevel.levelMath;
        }      
        

        //2
        let engImg = json.levelTest.english;
        if (engImg.length == 0){
            engTestImg.innerHTML += '<img id='+engImgCnt+' class="mini_img" src="noimg_url" onclick="delImg(this.id)"></img>';
            engImgCnt+=1;
        }
        else{
            for(i=0; i < engImg.length ; i++){
                engTestImg.innerHTML += '<img id='+engImgCnt+' class="mini_img" src="' + engImg[i] +'" onclick="delImg(this.id)"></img>';
                engImgCnt+=1;
            }
        }
        
        
        let mathImg = json.levelTest.math;
        if (mathImg.length == 0){
            mathTestImg.innerHTML += '<img id='+mathImgCnt+' class="mini_img" src="noimg_url" onclick="delImg(this.id)"></img>';
            mathImgCnt+=1;
        }
        else{
            for(i=0; i < engImg.length ; i++){
                mathTestImg.innerHTML += '<img id='+mathImgCnt+' class="mini_img" src="' + mathImg[i] +'" onclick="delImg(this.id)"></img>';
                mathImgCnt+=1;
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

        if(newc.comment == null){
            textbox.innerHTML += '<textarea>'+"내용 없음"+'</textarea>';
        }
        else{
            textbox.innerHTML += '<textarea>'+newc.comment+'</textarea>';
        }
        
        //4
        checkList.innerHTML += '<img id="checkListImg" class="mini_img" src="' + json.newCheckList.checklist +'" onclick="delImg(this.id)"></img>';
        checkImgCnt += 1;
    })
})

//이미지 불러오는 코드 넣기 (불러온만큼 imgCount++)


function addEngImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+engImgCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    engImgCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('engTestImg');
    imgList.innerHTML += (newImage);
};

function addMathImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+mathImgCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    mathImgCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('mathTestImg');
    imgList.innerHTML += (newImage);
};


function newCheckImg(input) {
    if(checkImgCnt >= 1){
        alert("체크리스트는 하나의 이미지만 추가할 수 있습니다.");
        return;
    }
    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id="checkListImg" class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    checkImgCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('newCheckImg');
    imgList.innerHTML += (newImage);

};

function delImg(input){
    
  var file = input;
  let remove = document.getElementById(file);

  if(file == "checkListImg"){
    checkImgCnt -=1;
  }

  remove.remove();
}

function doneModify() {
    let regEnglish = regAtEng.value;
    let lvEnglish = regLvEng.value;
    let regMath = regAtMath.value;
    let lvMath = regLvMath.value;
    let english = [];
    let math = [];

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

    var imgList = document.getElementById('engTestImg').children;
    for(i=0; i< imgList.length; i++){
        english.push(imgList[i].src);
    }

    var imgList = document.getElementById('mathTestImg').children;
    for(i=0; i< imgList.length; i++){
        math.push(imgList[i].src);
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
    
    checkList = document.getElementById('newCheckImg').children[0].src;

    var data = {
        id : "mtop1234",

        firstLevel : {
            regEng : regEnglish,
            levelEng : lvEnglish,
            regMath : regMath,
            levelMath : lvMath
        },
        levelTest : {
            english : english,
            math : math
        },
        newConsulting : {
            friendship : friendShip,
            personality : personality,
            parentship : parentShip,
            concentration : concentration,
            homework : homework,
            comment : textbox
        },
        newCheckList : {
            checklist : checkList
        }
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data
})
        .then((response) => response.json())
        .then((res) => console.log(res))
}