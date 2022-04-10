let SCA = document.getElementById("SCA");
let CPS = document.getElementById("CPS");
let careerNet = document.getElementById("careerNet");
let sixSense = document.getElementById("sixSense");
let testEtc = document.getElementById("testEtc");

let scaCnt = 0;
let cpsCnt = 0;
let ssCnt = 0;
let etcCnt = 0;

const url = "http://top-edu.co.kr:8000/api/resultModify";

fetch(url).then(function(res){
    res.json().then(function(json){

        let scaImg = json.SCA.sca;
        for(i=0; i<scaImg.length; i++){
            SCA.innerHTML += '<img id="'+scaCnt+'" class ="mini_img" src="'+scaImg[i]+'" onclick="delImg(this.id)"/>';
            scaCnt+=1;
        }

        let cpsImg = json.CPS.cps;
        for(i=0; i<cpsImg.length; i++){
            CPS.innerHTML += '<img id="'+cpsCnt+'" class ="mini_img" src="'+cpsImg[i]+'" onclick="delImg(this.id)"/>';
            cpsCnt+=1;
        }

        let careerPdf = json.careerNet.careerNet;
        careerNet.innerHTML += '<p style="text-align: center;"><a href="'+careerPdf+'">PDF로 제공됩니다. 누르면 이동</a></p>';

        let ssImg = json.sixSense.sixSense;
        for(i=0; i<ssImg.length; i++){
            sixSense.innerHTML += '<img id="'+ssCnt+'" class ="mini_img" src="'+ssImg[i]+'" onclick="delImg(this.id)"/>';
            ssCnt+=1;
        }

        let etcImg = json.testEtc.etc;
        for(i=0; i<etcImg.length; i++){
            testEtc.innerHTML += '<img id="'+etcCnt+'" class ="mini_img" src="'+etcImg[i]+'" onclick="delImg(this.id)"/>';
            etcCnt+=1;
        }
    })
})

// img code
function addSCAImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+scaCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    scaCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('scaImg');
    imgList.innerHTML += (newImage);
};

function addCPSImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+cpsCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    cpsCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('cpsImg');
    imgList.innerHTML += (newImage);
};

function addSSPdf(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var path = URL.createObjectURL(file);
    var newPath = '<a href=' + path + '>' + path + '</a>';

    //이미지를 image-show div에 추가
    var pathList = document.getElementById('careerPath');
    pathList.innerHTML = (newPath);
};

function addSSImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+ssCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    ssCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('ssImg');
    imgList.innerHTML += (newImage);
};

function addEtcImg(input) {

    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+etcCnt+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    etcCnt+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('etcImg');
    imgList.innerHTML += (newImage);
};

//사진 삭제
function delImg(input){
    
    var file = input;
    let remove = document.getElementById(file);
  
    remove.remove();
  }

function doneModify(){

    let scaPath = []
    let cpsPath = []
    let pdfList = document.getElementById('careerPath').children[0].src;
    let ssPath = []
    let etcPath = []


    var imgList = document.getElementById('scaImg').children;
    for(i=0; i< imgList.length; i++){
        scaPath.push(imgList[i].src);
    }

    var imgList = document.getElementById('cpsImg').children;
    for(i=0; i< imgList.length; i++){
        cpsPath.push(imgList[i].src);
    }

    var imgList = document.getElementById('ssImg').children;
    for(i=0; i< imgList.length; i++){
        ssPath.push(imgList[i].src);
    }

    var imgList = document.getElementById('etcImg').children;
    for(i=0; i< imgList.length; i++){
        etcPath.push(imgList[i].src);
    }

    var data = {
        "SCA" : {
            "sca" : scaPath
        },
        "CPS" : {
            "cps" : cpsPath
        },
        "careerNet" : {
            "careerNet" : pdfList
        },
        "sixSense" : {
            "sixSense" : ssPath
        },
        "testEtc" : {
            "etc" : etcPath
        }
    }

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((res) => console.log(res))

  }