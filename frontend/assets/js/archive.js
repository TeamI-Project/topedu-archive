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
console.log(studentID);

const info = "https://archive.top-edu.co.kr:8000/api/studentInfo?id=";

fetch(info+studentID).then(function(res){
    res.json().then(function(json){
        let branch;
        if(json.ans.branch == 'CH'){
            branch="창원점";
        }else if(json.ans.branch == 'MA'){
            branch="마산점";
        }else if(json.ans.branch == 'SA'){
            branch="사천점"
        }
        let header = document.getElementById("header");
        header.innerHTML+='<img class ="profile" src="'+json.ans.img+'" onclick="window.open(this.src)"/>';
		header.innerHTML+='<h1 id="studentID" style="display: inline;">'+json.ans.name+'</h1>';
		header.innerHTML+='<p id="branch" style="display: inline;">'+branch+'</p>';

    })
})

//firstLevel
let regAtEng = document.getElementById("regEnglish");
let regLvEng = document.getElementById("lvEnglish");
let regAtMath = document.getElementById("regMath");
let regLvMath = document.getElementById("lvMath");
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
let checkList = document.getElementById("newCheckList");

let use1 = ["좋음", "보통", "도움필요"];
let use2 = ["외향적", "내향적", "외내향적"];
let use3 = ["좋음", "보통", "개선필요"];
let monthCode = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const id = '?id='+studentID;

const url1 = "https://archive.top-edu.co.kr:8000/api/newModify";

fetch(url1+id).then(function(res){
    res.json().then(function(json){
        //1
        if(json.firstLevel.regEng == null){
            regAtEng.innerText = 'x';
        }
        else{
            regAtEng.innerText = json.firstLevel.regEng;
        }

        if(json.firstLevel.lvEnglish == null){
            regLvEng.innerText = 'x';
        }
        else{
            regLvEng.innerText = json.firstLevel.lvEnglish;
        }
        
        if(json.firstLevel.regMath == null){
            regAtMath.innerText = 'x';
        }
        else{
            regAtMath.innerText = json.firstLevel.regMath;
        }

        if(json.firstLevel.lvMath == null){
            regLvMath.innerText = 'x';
        }
        else{
            regLvMath.innerText = json.firstLevel.lvMath;
        }      
        

        //2
        let engImg = json.levelTest.english;
        if(engImg.length == 0){
            engTestImg.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i < engImg.length ; i++){
                engTestImg.innerHTML += '<img class="mini_img" src="' + engImg[i] +'" onclick="window.open(this.src)"></img>';
            }
        }
        
            
        
        let mathImg = json.levelTest.math;
        if(mathImg.length == 0){
            mathTestImg.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i < mathImg.length ; i++){
                mathTestImg.innerHTML += '<img class="mini_img" src="' + mathImg[i] +'" onclick="window.open(this.src)"></img>';
            }
        }
        
        
        

        //3
        let newc = json.newConsulting;
        var temp = '';

        //friendShip
        temp = '📌 친구들과의 관계 : '+use1[newc.friendship];
        friendShip.innerText += temp;

        //personality
        temp = '📌 평소 성격 : '+use2[newc.personality];
        personality.innerText += temp;

        //parentShip
        temp = '📌 부모님과의 소통 : '+use3[newc.parentship];
        parentShip.innerText += temp;

        //concentration
        temp = '📌 집중력 : '+use1[newc.concentration];
        concentration.innerText += temp;

        //homework
        temp = '📌 과제성실도 : '+use1[newc.homework];
        homework.innerText += temp;

        if(newc.comment == "null" || newc.comment == null){
            temp = '📌 요약 : 내용 없음';
            textbox.innerText += temp;
        }
        else{
            temp = '📌 요약 : ' + newc.comment;
            textbox.innerText += temp
        }
        
        //4

        let newCheckListImg = json.newCheckList.checkList;
        if(newCheckListImg.length == 0){
            checkList.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i < newCheckListImg.length ; i++){
                checkList.innerHTML += '<img class="mini_img" src="'+newCheckListImg[i] +'" onclick="window.open(this.src)"></img>';
            }
        }
        
    })
})


let SCA = document.getElementById("SCA");
let CPS = document.getElementById("CPS");
let careerNet = document.getElementById("careerNet");
let sixSense = document.getElementById("sixSense");
let testEtc = document.getElementById("testEtc");

const url2 = "https://archive.top-edu.co.kr:8000/api/resultModify";

fetch(url2+id).then(function(res){
    res.json().then(function(json){

        let scaImg = json.SCA.sca;
        if(scaImg.length == 0){
            SCA.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i<scaImg.length; i++){
                SCA.innerHTML += '<img class ="mini_img" src="'+scaImg[i]+'" onclick="window.open(this.src)"/>';
            }
        }
        

        let cpsImg = json.CPS.cps;
        if(cpsImg.length == 0){
            CPS.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i<cpsImg.length; i++){
                CPS.innerHTML += '<img class ="mini_img" src="'+cpsImg[i]+'"  onclick="window.open(this.src)"/>';
            }
        }

        let careerImg = json.careerNet.careerNet;
        if(careerImg.length == 0){
            careerNet.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i<careerImg.length; i++){
                careerNet.innerHTML += '<img class ="mini_img" src="'+careerImg[i]+'"  onclick="window.open(this.src)"/>';
            }
        }
        

        let ssImg = json.sixSense.sixSense;
        if(ssImg.length == 0){
            sixSense.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i<ssImg.length; i++){
                sixSense.innerHTML += '<img class ="mini_img" src="'+ssImg[i]+'"  onclick="window.open(this.src)"/>';
            }
        }

        let etcImg = json.testEtc.etc;
        if(etcImg.length == 0){
            testEtc.innerHTML += '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i<etcImg.length; i++){
                testEtc.innerHTML += '<img class ="mini_img" src="'+etcImg[i]+'"  onclick="window.open(this.src)"/>';
            }
        }
    })
})

let middle = document.getElementById("gradeMiddle");
let middleImg = document.getElementById("middleImg");
let high = document.getElementById("gradeHigh");
let highImg = document.getElementById("highImg");

let getMiddle;
let getHigh;

const url3 = "https://archive.top-edu.co.kr:8000/api/gradeModify";

fetch(url3+id).then(function(res){
    res.json().then(function(json){

        getMiddle = json.gradeMiddle;
        getHigh = json.gradeHigh;
        changeMiddle();
        changeHigh();
        
    })
})



let month = document.getElementById("month");
let monthlyImg = document.getElementById("monthlyImg");
let monthData;

const url4 = "https://archive.top-edu.co.kr:8000/api/monthly";

fetch(url4+id).then(function(res){
    res.json().then(function(json){

        monthData = json.month;
        changeMonth();

    })
})

let teacher = document.getElementById("teacherComment");
let student = document.getElementById("studentComment");
let parents = document.getElementById("parentsComment");
let etc = document.getElementById("etcComment");

const url5 = "https://archive.top-edu.co.kr:8000/api/comment";

fetch(url5+id).then(function(res){
    res.json().then(function(json){
        if(json.comment.teacher == "null" || json.comment.teacher == null){
            teacher.innerHTML += '<p>내용없음</p>';
        }
        else{
            teacher.innerHTML += '<pre>'+json.comment.teacher+'</pre>';
        }
        if(json.comment.student == "null" || json.comment.student == null){
            student.innerHTML += '<p>내용없음</p>';
        }
        else{
            student.innerHTML += '<pre>'+json.comment.student+'</pre>';
        }
        if(json.comment.parents == "null" || json.comment.parents == null){
            parents.innerHTML += '<p>내용없음</p>';
        }
        else{
            parents.innerHTML += '<pre>'+json.comment.parents+'</pre>';
        }
        if(json.comment.etc == "null" || json.comment.etc == null){
            etc.innerHTML += '<p>내용없음</p>';
        }
        else{
            etc.innerHTML += '<pre>'+json.comment.etc+'</pre>';
        }
        
    })
})

function changeMiddle(){

    let middleVal = middle.options[middle.selectedIndex].value;
    console.log(middleVal);
    if(getMiddle[middleVal] == null){
        middleImg.innerHTML = '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
    }
    else{
        middleImg.innerHTML = '<img class ="mini_img" src="'+getMiddle[middleVal]+'" onclick="window.open(this.src)"/>';
    }
        

}

function changeHigh(){
    let highVal = high.options[high.selectedIndex].value;
    console.log(highVal);
    if(getHigh[highVal] == null){
        highImg.innerHTML = '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
    }
    else{
        highImg.innerHTML = '<img class ="mini_img" src="'+getHigh[highVal]+'"  onclick="window.open(this.src)"/>';
    }
}

function changeMonth(){

    let monthVal = month.options[month.selectedIndex].value;
    let index = monthCode.indexOf(monthVal);
    let img = monthData[String(index)]
    if(img.length == 0){
        monthlyImg.innerHTML = '<img class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
    }
    else{
        for(i=0; i<img.length; i++){
            monthlyImg.innerHTML = '<img class ="mini_img" src="'+img[i]+'"  onclick="window.open(this.src)"/>';
        }
    }
}