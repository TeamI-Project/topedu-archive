let imgCount = 0;

//이미지 불러오는 코드 넣기 (불러온만큼 imgCount++)


function addImg(input) {
  console.log("running");
    var file = input.files[0];	//선택된 파일 가져오기

  	//새로운 이미지 div 추가
    var newImage = '<img id='+imgCount+' class="mini_img" src="' + URL.createObjectURL(file) +'" onclick="delImg(this.id)"></img>';
    imgCount+=1;

    //이미지를 image-show div에 추가
    var imgList = document.getElementById('imgList');
    imgList.innerHTML += (newImage);
};

function delImg(input){
  var file = input;
  let remove = document.getElementById(file);

  remove.remove();
}

