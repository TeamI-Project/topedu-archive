let SCA = document.getElementById("SCA");
let CPS = document.getElementById("CPS");
let careerNet = document.getElementById("careerNet");
let sixSence = document.getElementById("sixSence");
let testEtc = document.getElementById("testEtc");


const url = "http://top-edu.co.kr:8000/api/resultModify";

fetch(url).then(function(res){
    res.json().then(function(json){

        let scaImg = json.SCA.sca;
        for(i=0; i<scaImg.length; i++){
            SCA.innerHTML += '<img class ="mini_img" src="'+scaImg[i]+'" onclick="window.open(this.src)"/>';
        }

        let cpsImg = json.CPS.cps;
        for(i=0; i<cpsImg.length; i++){
            CPS.innerHTML += '<img class ="mini_img" src="'+cpsImg[i]+'" onclick="window.open(this.src)"/>';
        }

        let careerPdf = json.careerNet.careerNet;
        careerNet.innerHTML += '<p style="text-align: center;"><a href="'+careerPdf+'">PDF로 제공됩니다. 누르면 이동</a></p>';

        let sixImg = json.sixSence.sixSence;
        for(i=0; i<sixImg.length; i++){
            sixSence.innerHTML += '<img class ="mini_img" src="'+sixImg[i]+'" onclick="window.open(this.src)"/>';
        }

        let etcImg = json.testEtc.etc;
        for(i=0; i<etcImg.length; i++){
            testEtc.innerHTML += '<img class ="mini_img" src="'+etcImg[i]+'" onclick="window.open(this.src)"/>';
        }
    })
})