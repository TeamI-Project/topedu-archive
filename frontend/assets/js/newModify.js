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
let checkList = document.getElementById("newChecklist");


let use1 = ["좋음", "보통", "도움필요"];
let use2 = ["외향적", "내향적", "외내향적"];
let use3 = ["좋음", "보통", "개선필요"];

let engImgCnt = 0;
let mathImgCnt = 0;


const url = "http://top-edu.co.kr:8000/api/newModify";

fetch(url).then(function(res){
    res.json().then(function(json){
        //1
        regAtEng.placeholder = json.firstLevel.regEnglish;
        regLvEng.placeholder = json.firstLevel.lvEnglish;
        regAtMath.placeholder = json.firstLevel.regMath;
        regLvMath.placeholder = json.firstLevel.lvMath;

        //2
        let engImg = json.levelTest.english;
        if (engImg.length == 0){
            engTestImg.innerHTML += '<img class="mini_img" src="noimg_url" onclick="delImg(this.id)"></img>';
        }
        else{
            for(i=0; i < engImg.length ; i++){
                engTestImg.innerHTML += '<img class="mini_img" src="' + engImg[i] +'" onclick="delImg(this.id)"></img>';
                engImgCnt+=1;
            }
        }
        
        
        let mathImg = json.levelTest.math;
        if (mathImg.length == 0){
            mathTestImg.innerHTML += '<img class="mini_img" src="noimg_url" onclick="delImg(this.id)"></img>';
        }
        else{
            for(i=0; i < engImg.length ; i++){
                mathTestImg.innerHTML += '<img class="mini_img" src="' + mathImg[i] +'" onclick="delImg(this.id)"></img>';
                mathImgCnt+=1;
            }
        }
        

        //3
        let newc = json.newConsulting;
        for(i=0; i<3; i++){

            //friendShip
            friendShip.innerHTML += '<label class="radioBtn">\
                                        <input type="radio" name="chk_friendShip" id="friendShip'+i+'" ';

            if(newc.friendShip == i){
                friendShip.innerHTML += 'checked = "checked"';
            }
            friendShip.innerHTML += '><span>'+use1[i]+'</span></label>';

            //personality
            personality.innerHTML += '<label class="radioBtn">\
            <input type="radio" name="chk_personality" id="personality'+i+'" ';

            if(newc.personality == i){
            personality.innerHTML += 'checked = "checked"';
            }
            personality.innerHTML += '><span>'+use1[i]+'</span></label>';

            //parentShip
            parentShip.innerHTML += '<label class="radioBtn">\
            <input type="radio" name="chk_parentShip" id="parentShip'+i+'" ';

            if(newc.parentShip == i){
            parentShip.innerHTML += 'checked = "checked"';
            }
            parentShip.innerHTML += '><span>'+use1[i]+'</span></label>';


            //concentration
            concentration.innerHTML += '<label class="radioBtn">\
            <input type="radio" name="chk_concentration" id="concentration'+i+'" ';

            if(newc.concentration == i){
            concentration.innerHTML += 'checked = "checked"';
            }
            concentration.innerHTML += '><span>'+use1[i]+'</span></label>';


            //homework
            homework.innerHTML += '<label class="radioBtn">\
            <input type="radio" name="chk_homework" id="homework'+i+'" ';

            if(newc.homework == i){
            homework.innerHTML += 'checked = "checked"';
            }
            homework.innerHTML += '><span>'+use1[i]+'</span></label>';
        }


        textbox.innerHTML += '<textarea>'+newc.comment+'</textarea>';

        //4
        checkList.innerHTML += '<img class="mini_img" src="' + json.newCheckList.checkList +'" onclick="window.open(this.src)"></img>';

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
    console.log("running");
    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id="checkListImg" class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('newChecklist');
    imgList.innerHTML += (newImage);
};

function delImg(input){
  var file = input;
  let remove = document.getElementById(file);

  remove.remove();
}



