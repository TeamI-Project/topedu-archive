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
        header.innerHTML+='<img class ="profile" src="'+json.img+'" onclick="window.open(this.src)"/>';
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
        if(json.firstLevel.regEnglish == null){
            regAtEng.innerText = 'x';
        }
        else{
            regAtEng.innerText = json.firstLevel.regEnglish;
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
            engTestImg.innerHTML += '<img name="english" class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i < engImg.length ; i++){
                engTestImg.innerHTML += '<img name="english" class="mini_img" src="' + engImg[i].substr(14) +'" onclick="window.open(this.src)"></img>';
            }
        }
        
            
        
        let mathImg = json.levelTest.math;
        if(mathImg.length == 0){
            mathTestImg.innerHTML += '<img name="math" class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            for(i=0; i < engImg.length ; i++){
                mathTestImg.innerHTML += '<img name="math" class="mini_img" src="' + mathImg[i].substr(14) +'" oonclick="window.open(this.src)"></img>';
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
            temp = '📌 요약 : 내용 없음';
            textbox.innerText += temp;
        }
        else{
            temp = '📌 요약 : ' + newc.comment;
            textbox.innerText += temp
        }
        
        //4
        if(json.newCheckList.checkList == null){
            checkList.innerHTML += '<img id="checkListImg" class="mini_img" src="images/background_logo.png" onclick="window.open(this.src)"></img>';
        }else{
            checkList.innerHTML += '<img id="checkListImg" class="mini_img" src="'+json.newCheckList.checklist.substr(14) +'" onclick="window.open(this.src)"></img>';
        }
        
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
            SCA.innerHTML += '<img class ="mini_img" src="'+scaImg[i].substr(14)+'" onclick="window.open(this.src)"/>';
        }

        let cpsImg = json.CPS.cps;
        for(i=0; i<cpsImg.length; i++){
            CPS.innerHTML += '<img class ="mini_img" src="'+cpsImg[i].substr(14)+'"  onclick="window.open(this.src)"/>';
        }

        let careerPdf = json.careerNet.careerNet;
        careerNet.innerHTML += '<p style="text-align: center;"><a href="'+careerPdf[i].substr(14)+'">PDF로 제공됩니다. 누르면 이동</a></p>';

        let ssImg = json.sixSence.sixSence;
        for(i=0; i<ssImg.length; i++){
            sixSence.innerHTML += '<img class ="mini_img" src="'+ssImg[i].substr(14)+'"  onclick="window.open(this.src)"/>';
        }

        let etcImg = json.testEtc.etc;
        for(i=0; i<etcImg.length; i++){
            testEtc.innerHTML += '<img class ="mini_img" src="'+etcImg[i].substr(14)+'"  onclick="window.open(this.src)"/>';
        }
    })
})

let middle = document.getElementById("gradeMiddle");
let middleImg = document.getElementById("middleImg");
let high = document.getElementById("gradeMiddle");
let highImg = document.getElementById("middleImg");

const url3 = "https://archive.top-edu.co.kr:8000/api/gradeModify";

fetch(url3+id).then(function(res){
    res.json().then(function(json){

        getMiddle = json.gradeMiddle;
        getHigh = json.gradeHigh;

        let middleVal = middle.options[middle.selectedIndex].value;
        middleImg.innerHTML = '<img class ="mini_img" src="'+getMiddle[middleVal].substr(14)+'" onclick="window.open(this.src)"/>';
        
        let highVal = high.options[high.selectedIndex].value;
        highImg.innerHTML = '<img class ="mini_img" src="'+getHigh[highVal].substr(14)+'"  onclick="window.open(this.src)"/>';

    })
})


let month = document.getElementById("month");
let monthlyImg = document.getElementById("monthlyImg");

const url4 = "https://archive.top-edu.co.kr:8000/api/monthly";

fetch(url4+id).then(function(res){
    res.json().then(function(json){

        let monthData = json.month;
        let monthVal = month.options[month.selectedIndex].value;
        let img = monthData[monthVal]
        for(i=0; i<img.length; i++){
            monthlyImg.innerHTML += '<img class ="mini_img" src="'+Img[i].substr(14)+'"  onclick="window.open(this.src)"/>';
        }
        
    })
})

let teacher = document.getElementById("teacherComment");
let student = document.getElementById("studentComment");
let parents = document.getElementById("parentsComment");
let etc = document.getElementById("etcComment");

const url5 = "https://archive.top-edu.co.kr:8000/api/comment";

fetch(url5+id).then(function(res){
    res.json().then(function(json){
        if(json.comment.teacherComment == null){
            teacher.innerHTML += '<p>내용없음</p>';
        }
        else{
            teacher.innerHTML += '<p>'+json.comment.teacherComment+'</p>';
        }
        if(json.comment.studentComment == null){
            student.innerHTML += '<p>내용없음</p>';
        }
        else{
            student.innerHTML += '<p>'+json.comment.studentComment+'</p>';
        }
        if(json.comment.parentsComment == null){
            parents.innerHTML += '<p>내용없음</p>';
        }
        else{
            parents.innerHTML += '<p>'+json.comment.parentsComment+'</p>';
        }
        if(json.comment.etcComment == null){
            etc.innerHTML += '<p>내용없음</p>';
        }
        else{
            etc.innerHTML += '<p>'+json.comment.etcComment+'</p>';
        }
        
    })
})
