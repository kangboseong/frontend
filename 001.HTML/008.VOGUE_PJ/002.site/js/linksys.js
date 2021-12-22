// 보그PJ 링크시스템 JS - linksys.js

$(()=>{
    // 사이드 메뉴 클릭시 이동설정
    // 대상: .smsub a
    $(".smsub a").click(function (e){
        // 기본이동막기
        e.preventDefault();
        
        // 클릭된 a요소의 글자 읽어오기
        let txt=$(this).text();
        console.log("메뉴:",txt);

        // 2. 글자별로 분기하여 url만들기
        let url;
        switch(txt){
            case "보그 로그인": url="login.html"; break;
            case "보그 회원가입": url="member.html"; break;
            case "보그 갤러리": url="gallery.html"; break;
        }
        location.href = url;
    });
})
// 로딩구역///////////////////////////
window.addEventListener("DOMContentLoaded", () => {

    // console.log("링크시스 로딩완료")

    /************************************** 
        GNB 메뉴 링크 연결하기
        대상: .gnb a
        변경내용: a의 텍스트를 읽어서 링크구성
    **************************************/
    let gnb = document.querySelectorAll(".gnb a");
    //    console.log("메뉴개수:",gnb.length);

    // GNB click이벤트 연결하기 //
    for (let x of gnb) {
        // 클릭설정하기
        x.onclick = () => {
            // 1. GNB a요소 텍스트 읽기
            let txt = x.innerText.toLowerCase().trim();
            // toLowerCase() 는 소문자변환
            // trim() 앞뒤공백제거
            // 참고) toUpperCase() 는 대문자변환
            console.log(txt);


            // 2. 서브페이지 호출하기!
            // Get방식으로 데이타를 넘긴다
            // 넘길데이타: 메뉴텍스트(소문자로!)
            // 조건: 값이 "search"가 아닌경우
            if(txt!=="search")
            location.href="sub.html?cat="+txt;
            // 파라미터 키=값을 넘길때
            // cat이름은 내가 지은 이름

            // search인 경우는 아무일도 없게처리
            else return false;



        };
    }

}) // 로딩구역///////////////////////////