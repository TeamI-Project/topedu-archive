// function teacherCookie() {
//     var result = null;
//     var cookie = document.cookie.split(';');
//     cookie.some(function (item) {
//         // 공백을 제거
//         item = item.replace(' ', '');
 
//         var dic = item.split('=');

//         var key = "teacherID";

//         if (key === dic[0]) {
//             result = dic[1];
//             return true;    // break;
//         }
//     });
//     return result;
// }
// var teacherID = teacherCookie();
// if (teacherID == null){
//     alert("로그인 하세요.")
//     location.href = "loginPage.html"
// }

const getBranch = "https://archive.top-edu.co.kr:8000/api/teacher?id="+teacherID;
var branch = "";
fetch(getBranch).then(res => res.json())
.then(response => {
    branch = response.branch;
}).catch(error => alert('error'));

var file = "";

//이미지 불러오는 코드 넣기
function addImg(input) {

    file = input.files[0];	//선택된 파일 가져오기

    var screen = document.getElementById("Img");
    screen.innerHTML =  '<img name="face" class="mini_img" src="' + URL.createObjectURL(file) +'"></img>';

};


const url = "https://archive.top-edu.co.kr:8000/api/register/student";


function register() {

    

    let name = document.getElementById("name").value;
    let studentID = document.getElementById("id").value;
    const doubleCheck = "https://archive.top-edu.co.kr:8000/api/student?id="+studentID;
    if(name && studentID && file){
        console.log("good")
    }
    else{
        console.log("bad")
        alert("정보가 부족합니다.")
        return
    }

    fetch(doubleCheck).then(res => res.json())
    .then(response => {
        if (response.msg === 'double') {
            alert("아이디가 중복됩니다.");
        }
        else{
            var formData = new FormData();
            formData.append("name", name);
            formData.append('id',studentID);
            formData.append('passwd', passwd);
            formData.append("image", file);
            formData.append("branch", branch);
            formData.append("status", 1);
        
            fetch(url, {
                method: "POST",
                body: formData
            }).then(res => res.json())
            .then(response => {
                if (response.msg === 'success') {
                    alert("등록되었습니다.");
                    location.href = "index.html";
                }
                else{
                    alert("등록에 실패했습니다.");
                }
            }).catch(error => alert('등록에 실패했습니다.'));
        }
    }).catch(error => alert('error'));
 
};


