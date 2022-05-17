function teacherCookie() {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');
 
        var dic = item.split('=');

        var key = "teacherID";

        if (key === dic[0]) {
            result = dic[1];
            return true;    // break;
        }
    });
    return result;
}

if (teacherCookie() == null){
    alert("로그인 하세요.")
    location.href = "loginPage.html"
}