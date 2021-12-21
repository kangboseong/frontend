// 보그 PJ 회원가입 JS - member.js ///

///////////// 로딩구역 /////////////////
$(()=>{ /////////// jQB //////////////////////

    console.log("회원가입 로딩완료!");

    ///// 모든 공백처리 함수 /////////////////////
    // cv 는 전달변수 : 공백처리할 문자값을 전달함
    let groSpace = cv => cv.replace(/\s/g,"");
    // replace(바꿀값, 바뀔값)
    // 바꿀값 -> /\s/ -> 슬래쉬사이에 쓰면 '정규식'
    // 역슬래쉬s -> \s 는 '공백문자'
    // g -> global 즉, 모두 찾아서
    // 빈값으로 만들어라! 즉, 지워라!
    // () => 명령어 -> 리턴값(중괄호와 return키워드 생략!)
    //////// groSpace 함수 ////////////////////

    ///////////////////////////////////////////////////////
    ///// 입력요소에서 포커스가 빠질때 발생하는 이벤트는? ////
    ///////////////////////////////////////////////////////
    // focus의 반대!!! ->>>>>>>>> blur(블러~!!!!!)
    // 대상: input[type=text],input[type=password]
    $("input[type=text],input[type=password]")
    .blur(function(){

        // 방금 블러발생한 요소의 id는?
        let cid = $(this).attr("id");
        // cid 는 current id 즉, 현재 아이디
        // attr(속성명) -> 해당속성값을 읽어옴!

        // 블러발생 요소의 값은?
        let cv = $(this).val();
        // cv는 current value 즉, 현재값
        // val() -> 선택요소에 입력값을 읽어옴!
        // trim() -> 문자열 앞뒤공백 제거

        // '이름'일 경우 앞뒤공백만 제거
        if(cid==="mnm") cv = cv.trim();
        // 기타 모든 경우는 모든공백 제거
        else cv = groSpace(cv);
        // groSpace함수를 호출하여 모든공백제거함!

        console.log("블러발생~!!!!",cid,"\n값:",cv);

        // 트림처리된 데이터를 다시 넣어주기!
        $(this).val(cv);

        /************ 1. 빈값 여부 체크하기 ************/
        if(cv===""){
            // 메시지 출력
            $(this).siblings(".msg").text("필수입력!");
            // siblings(요소)-다른형제중 특정요소를 선택
        } ///////// if : 빈값체크 //////////

        /********* 2. 아이디일 경우 유효성검사하기 *********/
        // 검사기준 : 영문자로 시작하는 6~20글자 영문자/숫자
        else if(cid === "mid"){
            // console.log("검사결과:",vReg(cv,cid));

            // 검사결과 불통과이면 /////////////////////
            if(!vReg(cv,cid)){ // !(NOT) 반대로 들어감
                $(this).siblings(".msg")
                .text("영문자로 시작하는 6~20글자 영문자/숫자")
                .removeClass("on");
                // 글자색 변경 클래스지우기!(들어갈경우 있으므로)
            } ////// if ////////

            // 검사결과 통과이면 ///////////////////
            else{
                // 원래 아이디 중복여부 판단을 해야함!
                $(this).siblings(".msg")
                .text("훌륭한 아이디네요~!")
                .addClass("on");
                // 글자색 변경 클래스주기!(녹색글자)
            } /////// else ///////

        } /////// else if : 아이디일 경우 ///////

        /************ 3. 비밀번호일때 검사하기 ************/
        else if(cid === "mpw") {
            // console.log("검사결과:",vReg(cv,cid));

            // 검사 결과 불통과이면 ////////////////
            // 기준: 특수문자,문자,숫자포함 형태의 5~15자리
            if(!vReg(cv,cid)){ // !(NOT) 반대일 경우 들어감

                $(this).siblings(".msg")
                .text("특수문자,문자,숫자포함 형태의 5~15자리");

            } /////////// if ///////////

            // 검사 결과 통과이면 //////////////
            else {
                // 메시지 지우기
                $(this).siblings(".msg").empty();
                // empty() - 텍스트 지우기
            } //////////// else //////////////

        } ///////// else if : 비밀번호일 경우 ////////

        /************ 4. 비밀번호확인일때 검사하기 ************/
        else if(cid === "mpw2"){

            // 비밀번호 입력값과 비밀번호확인값이 ///
            // 불일치하면 메시지출력 ///////////////
            if(cv !== $("#mpw").val()) {

                $(this).siblings(".msg")
                .text("비밀번호가 일치하지 않습니다!");

            } ////////// if ////////////

            // 비밀번호가 일치할 경우 ///////////////
            else {

                // 메시지 지우기
                $(this).siblings(".msg").empty();
                
            } ///////// else //////////////

        } ////////// else if : 비밀번호확인일 경우 //////////

        /************ 5. 이메일 입력일때 검사하기 ************/
        else if(cid === "email1"){

            // 이메일 주소 만들기
            let comp = eml1.val() + "@" +
            (seleml.val() === "free" ? eml2.val() : seleml.val());
            // 이메일 뒷주소는 조건연산자(비?집:놀이동산)로
            // 직접입력일 경우("free")는 뒷주소입력 이메일 값을 넣고
            // 그 밖의 경우에는 선택박스의 값을 넣는다!
            // console.log("이메일주소:",comp);

            // 이메일 검사처리함수 호출!
            resEml(comp);

        } //////////// else if : 이메일 입력일 경우 ///////////


        else{ // 통과시 //
            $(this).siblings(".msg").empty();
            // empty() - 메시지 지우기
        } ///////// else : 통과시 ////////////


    }); ////////////// blur ///////////////////////
    ////////////////////////////////////////////////

    /********************************************** 
        함수명: resEml (result Email)
        기능: 이메일 검사결과 처리
    **********************************************/
   const resEml = comp => { // comp - 완성된 이메일주소
        // console.log("결과처리함수:",comp);
        // console.log("검사결과:",vReg(comp,"eml"));

        // 1. 이메일 정규식 검사하기!
        if(vReg(comp,"eml")){ ///// 통과시 ////////

            eml1.siblings(".msg")
            .text("적합한 이메일 형식입니다!")
            .addClass("on");// 글자색변경(녹색)

        } ///////////// if문 : 통과시 //////////////

        else { ////// 불통과시 /////////////////////

            eml1.siblings(".msg")
            .text("맞지않는 이메일 형식입니다")
            .removeClass("on");//글자색복원(빨간색)

        } //////////// else : 불통과시 /////////////



   } /////////// resEml 함수 /////////////////////


    /*************************************************************** 
        키보드 입력시 이메일 체크하기
        _______________________________

        - 키보드 관련 이벤트 : keypress, keyup, keydown
        1. keypress : 키가 눌려졌을때
        2. keyup : 키가 눌렸다가 올라올때
        3. keydown : 키가 눌려져서 내려갈때
        -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 써야할까?
        -> keyup - 현재 입력된 글자가 바로 반영됨!
    ***************************************************************/

        // 이메일 관련 대상선정:

        // 이메일 앞주소
        let eml1 = $("#email1");
        // 이메일 뒷주소
        let eml2 = $("#email2");
        // 이메일 선택박스
        let seleml = $("#seleml");

        ///// 이벤트 대상: #email1, #email2 /////////
        $("#email1, #email2").on("keyup",function(){
            
            // 1. 현재 이벤트 대상 아이디 읽어오기
            let cid = $(this).attr("id");
            console.log("현재아이디:",cid);

            // 2. 현재 입력된 값 읽어오기
            let cv = $(this).val();
            console.log("입력값:",cv);

            // 3. 이메일 뒷주소 셋팅하기
            let backeml = 
                cid === "email1" ? seleml.val() : eml2.val();
                // 변수 = 조건연산자
                // 변수 = 조건식?값1:값2
                // -> 조건연산자에서 결정된 값이 변수에 할당됨!

            // 4. 선택박스의 선택값이 "free"(직접입력)이면 이메일 뒷주소변경
            if(seleml.val()==="free") backeml = eml2.val();

            // 5. 이메일 전체주소 조합하기!
            let comp = eml1.val() + "@" + backeml;
            console.log("이멜주소:",comp);
            
            // 6. 이메일 검사결과함수 호출!
            resEml(comp);

        }); ////////////// keyup //////////////////


        /****************************************** 
            선택박스 변경시 이메일 검사하기
            _______________________________

            검사시점: 선택박스 변경할때
            이벤트: change
            이벤트대상: #seleml -> seleml변수
        ******************************************/
        seleml.change(function(){

            // 1. 선택박스 변경된 값 읽어오기
            let cv = $(this).val();
            console.log("선택값",cv);

            // 2. 선택옵션별 분기문
            if(cv === "init") { // "선택해주세요" 선택시

                // 1. 메시지 출력
                eml1.siblings(".msg")
                .text("이메일 옵션 선택필수!")
                .removeClass("on");// 글자색복원

                // 2. 직접입력창 숨기기(보이는 상태일수 있음!)
                eml2.fadeOut(300);

            } //////// if ////////////
            else if(cv === "free") { // "직접입력" 선택시

                // 1. 직접입력창 보이기(fadeIn)
                eml2.fadeIn(300).val("").focus();
                // 서서히 나타나고 값지우고 입력상태!

                // 2. 이메일 주소 만들기
                let comp = eml1.val() + "@" + eml2.val();

                // 3. 이메일 검사처리함수 호출!
                resEml(comp);
                
            } /////// else if /////////
            else{ /// 기타 이메일 주소 선택시

                // 1. 직접입력창 숨기기
                eml2.fadeOut(300);

                // 2. 이메일 전체주소 조합하기
                let comp = eml1.val() + "@" + cv;
                // cv변수는 select의 선택값!

                // 3. 이메일 검사 결과처리함수 호출!
                resEml(comp);

            } /////////// else ////////////

        }); /////////// change ///////////


}); ////////////// jQB ////////////////////////
///////////////////////////////////////////////



/*////////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////

