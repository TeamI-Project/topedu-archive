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

const info = "https://archive.top-edu.co.kr:8000/api/studentInfo?id=";

fetch(info+studentID).then(function(res){
    res.json().then(function(json){
        let branch;
        if(json.branch == 'CH'){
            branch="창원점";
        }else if(json.branch == 'MA'){
            branch="마산점";
        }else if(json.branch == 'SA'){
            branch="사천점"
        }
        let header = document.getElementById("header");
        header.innerHTML+='<img class ="profile" src="../uploads/studentImg/'+json.img+'" onclick="window.open(this.src)"/>';
		header.innerHTML+='<h1 id="studentID" style="display: inline;">'+json.name+'</h1>';
		header.innserHTML+='<p id="branch" style="display: inline;">'+branch+'</p>';

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

        if(json.firstLevel.levelEng == null){
            regLvEng.innerText = 'x';
        }
        else{
            regLvEng.innerText = json.firstLevel.levelEng;
        }
        
        if(json.firstLevel.regMath == null){
            regAtMath.innerText = 'x';
        }
        else{
            regAtMath.innerText = json.firstLevel.regMath;
        }

        if(json.firstLevel.levelMath == null){
            regLvMath.innerText = 'x';
        }
        else{
            regLvMath.innerText = json.firstLevel.levelMath;
        }      
        

        //2
        let engImg = json.levelTest.english;
        if (engImg.length == 0){
            engTestImg.innerHTML += '<img class="mini_img" src="../backend/uploads/noimg_url" onclick="window.open(this.src)"></img>';
        }
        else{
            for(i=0; i < engImg.length ; i++){
                engTestImg.innerHTML += '<img class="mini_img" src="../backend/uploads/levelTest/' + engImg[i] +'" onclick="window.open(this.src)"></img>';
            
            }
        }
        
        
        let mathImg = json.levelTest.math;
        if (mathImg.length == 0){
            mathTestImg.innerHTML += '<img class="mini_img" src="../backend/uploads/noimg_url" onclick="window.open(this.src)"></img>';

        }
        else{
            for(i=0; i < engImg.length ; i++){
                mathTestImg.innerHTML += '<img class="mini_img" src="../backend/uploads/levelTest/' + mathImg[i] +'" onclick="window.open(this.src)"></img>';

            }
        }
        

        //3
        let newc = json.newConsulting;
        for(i=0; i<3; i++){
            var temp = '';

            //friendShip
            temp = '📌 친구들과의 관계 : '+use1[i];
            friendShip.innerText += temp;

            //personality
            temp = '📌 평소 성격 : '+use2[i];
            personality.innerText += temp;

            //parentShip
            temp = '📌 부모님과의 소통 : '+use3[i];
            parentShip.innerText += temp;

            //concentration
            temp = '📌 집중력 : '+use1[i];
            concentration.innerText += temp;

            //homework
            temp = '📌 과제성실도 : '+use1[i];
            homework.innerText += temp;
        }

        if(newc.comment == null){
            textbox.innerText += '내용 없음';
        }
        else{
            textbox.innerText += newc.comment;
        }
        
        //4
        checkList.innerHTML += '<img id="checkListImg" class="mini_img" src="../backend/uploads/etcImg/' + json.newCheckList.checklist +'" onclick="window.open(this.src)"></img>';
    })
})


let SCA = document.getElementById("SCA");
let CPS = document.getElementById("CPS");
let careerNet = document.getElementById("careerNet");
let sixSence = document.getElementById("sixSence");
let testEtc = document.getElementById("testEtc");

const url2 = "https://archive.top-edu.co.kr:8000/api/resultModify";

fetch(url2+id).then(function(res){
    res.json().then(function(json){

        let scaImg = json.SCA.sca;
        for(i=0; i<scaImg.length; i++){
            SCA.innerHTML += '<img class ="mini_img" src="../backend/uploads/testResult/sca/'+scaImg[i]+'" onclick="window.open(this.src)"/>';
        }

        let cpsImg = json.CPS.cps;
        for(i=0; i<cpsImg.length; i++){
            CPS.innerHTML += '<img class ="mini_img" src="../backend/uploads/testResult/cps/'+cpsImg[i]+'" onclick="window.open(this.src)"/>';
        }

        let careerPdf = json.careerNet.careerNet;
        careerNet.innerHTML += '<p style="text-align: center;"><a href="../backend/uploads/testResult/career/'+careerPdf+'">PDF로 제공됩니다. 누르면 이동</a></p>';

        let ssImg = json.sixSence.sixSence;
        for(i=0; i<ssImg.length; i++){
            sixSence.innerHTML += '<img class ="mini_img" src="../backend/uploads/testResult/ss/'+ssImg[i]+'" onclick="window.open(this.src)"/>';
        }

        let etcImg = json.testEtc.etc;
        for(i=0; i<etcImg.length; i++){
            testEtc.innerHTML += '<img class ="mini_img" src="../backend/uploads/testResult/etc/'+etcImg[i]+'" onclick="window.open(this.src)"/>';
        }
    })
})

//let grade = ['middle1-1-1', 'middle1-1-2', 'middle1-2-1', 'middle1-2-2', 'middle2-1-1', 'middle2-1-2', 'middle2-2-1', 'middle2-2-2', 'middle3-1-1', 'middle3-1-2', 'middle3-2-1', 'middle3-2-2', 'high1-1-1', 'high1-1-2', 'high1-2-1', 'high1-2-2', 'high2-1-1', 'high2-1-2', 'high2-2-1', 'high2-2-2', 'high3-1-1', 'high3-1-2']

let middle = document.getElementById("gradeMiddle");
let middleImg = document.getElementById("middleImg");
let high = document.getElementById("gradeMiddle");
let highImg = document.getElementById("middleImg");

const url3 = "http://archive.top-edu.co.kr:8000/api/gradeModify";

fetch(url3+id).then(function(res){
    res.json().then(function(json){

        getMiddle = json.gradeMiddle;
        getHigh = json.gradeHigh;

        let middleVal = middle.options[middle.selectedIndex].value;
        middleImg.innerHTML = '<img class ="mini_img" src="../backend/uploads/grade/middle/'+getMiddle[middleVal]+'" onclick="window.open(this.src)"/>';
        
        let highVal = high.options[high.selectedIndex].value;
        highImg.innerHTML = '<img class ="mini_img" src="../backend/uploads/grade/high/'+getHigh[highVal]+'" onclick="window.open(this.src)"/>';

    })
})


let month = document.getElementById("month");
let monthlyImg = document.getElementById("monthlyImg");

const url4 = "https://archive.top-edu.co.kr:8000/api/gradeModify";

fetch(url+id).then(function(res){
    res.json().then(function(json){

        let monthData = json.month;
        let monthVal = month.options[month.selectedIndex].value;
        let img = monthData[monthVal]
        for(i=0; i<img.length; i++){
            monthlyImg.innerHTML += '<img class ="mini_img" src="../backend/uploads/monthly/'+img[i]+'" onclick="window.open(this.src)"/>';
        }
        
    })
})

let teacher = document.getElementById("teacherComment");
let student = document.getElementById("studentComment");
let parents = document.getElementById("parentsComment");
let etc = document.getElementById("etcComment");

const url = "https://archive.top-edu.co.kr:8000/api/commentModify";

fetch(url).then(function(res){
    res.json().then(function(json){
        if(json.teacherComment == null){
            teacher.innerHTML += '<p>내용없음</p>';
        }
        else{
            teacher.innerHTML += '<p>'+json.teacherComment+'</p>';
        }

        teacher.innerHTML += '<p>'+json.teacherComment+'</p>';
        student.innerHTML += '<p>'+studentComment+'</p>';
        parents.innerHTML += '<p>'+parentsComment+'</p>';
        etc.innerHTML += '<p>'+etcComment+'</p>';
    })
})
