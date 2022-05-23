const api_key = 'NCSJTUHVWWQ0EWKT'
const api_secret = 'AU16IKRS7CVUPXXWOWP3ECGMEFBB7VCQ'

function getAuthorization(){
    let salt = getSalt();
    let date = getDate();
    let value = date + salt;
    let signature = getSignature(value, api_secret);
    let authoriztion = 'HMAC-SHA256 apiKey='+api_key+', date='+date+', salt='+salt+', signature='+signature;
    return authoriztion;
}

function getSalt(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 30; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getDate(){
    let today = new Date();
    return today.toISOString();
}

function getSignature(value, key){
    let signature = CryptoJS.HmacSHA256(value, key);
    return signature;
}

var request;

function getPlusfriend(pfid){
    let url = 'https://api.solapi.com/kakao/v1/plus-friends/' + pfid;

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function getPlusfriends(){
    let url = 'https://api.solapi.com/kakao/v1/plus-friends';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function getTemplate(templateId){
    let url = 'https://api.solapi.com/kakao/v1/templates/' + templateId;

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function getTemplates(){
    let url = 'https://api.solapi.com/kakao/v1/templates';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('GET', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);
    request.send();
}

function sendMessage(name, tel, btn_url, pfid, templateId){
    let url = 'https://api.solapi.com/messages/v4/send';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);

    var message = '{"message": {"to": "'+tel+'","from": "01033528779","text": "'+ name +' TESTTEST알림톡 \n 테스트입니다.","type": "ATA","kakaoOptions": {"pfId": "'+pfid+'","templateId": "'+templateId+'","buttons": [{"buttonType": "WL","buttonName": "링크테스트","linkMo": "https://'+btn_url+'", "linkPc":"https://'+btn_url+'"}]}}}';

    request.send(message);
    return;
}

// 4조_신청완료
// 템플릿에 대한것
// sendMessage1(name, tel, benefit, pfid, templateId, btn_url);
function sendMessage1(name, tel, benefit, pfid, templateId, btn_url){
    let url = 'https://api.solapi.com/messages/v4/send';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);

    var message = {
        "message": {
            "to": tel,
            "from": "01033528779",
            "text": "안녕하세요, "+name+" 님\n'MarchBom' 가입해주셔서\n감사합니다.\n\n"+benefit+"\n\n스트레스엔 플라워테라피!",
            "type": "ATA",
            "kakaoOptions": {
                "pfId": pfid,
                "templateId": templateId,
                "buttons": [
                    {
                        "buttonType": "WL",
                        "buttonName": "꽃 보러가기",
                        "linkMo": "http://"+btn_url,
                        "linkPc":"http://"+btn_url
                    }
                ]
            }
        }
    };


    const obj = JSON.stringify(message);    
    request.send(obj);
    return;
}

// 4조_신청완료.
// 템플릿에 대한것
// sendMessage2(name, tel, guide1, guide2, flower, flower_language, pfid, templateId, btn_url);
function sendMessage2(name, tel, guide1, guide2, flower, flower_language, pfid, templateId, btn_url){
    let url = 'https://api.solapi.com/messages/v4/send';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);

    var message = {
        "message": {
            "to": tel,
            "from": "01033528779",
            // "text": "안녕하세요, "+name+" 님께서\n요청하신 "+guide1+"월 "+guide2+"주\n꽃말 정보입니다.\n\n"+flower+"\n"+flower_language+"\n\n스트레스엔 플라워테라피!\n\n * 이 메시지는 'MarchBom'의 매주 꽃말 안내를 신청하신 분에게만 매주 발송되는 메시지 입니다.\n * 신청 메세지 취소를 원하시는 경우 아래 버튼을 눌러주세요.",
            // 4조_이주의꽃  ( 템플릿이 통과하여 아래내용으로 변경 )
            "text": "안녕하세요, "+name+"님께서\n요청하신 "+guide1+"월 "+guide2+"주\n꽃말 정보입니다.\n\n"+flower+"\n"+flower_language+"\n\n스트레스엔 플라워테라피!\n\n * 이 메시지는 'MarchBom'의 매주 꽃말 안내를 신청하신 분에게만 발송되는 메시지 입니다.\n",
            "type": "ATA",
            "kakaoOptions": {
                "pfId": pfid,
                "templateId": templateId,
                "buttons": [
                    {
                        "buttonType": "WL",
                        "buttonName": "꽃 보러가기",
                        "linkMo": "http://"+btn_url,
                        "linkPc":"http://"+btn_url
                    },
                    // 4조_이주의꽃  ( 템플릿이 통과하여 주석처리 )
                    // {
                    //     "buttonType": "WL",
                    //     "buttonName": "메세지 요청취소",
                    //     "linkMo": "http://"+btn_url,
                    //     "linkPc":"http://"+btn_url
                    // }
                ]
            }
        }
    };


    const obj = JSON.stringify(message);    
    request.send(obj);
    return;
}


// 4조_결제알림
// 템플릿에 대한것
// sendMessage3(name, tel, flower, pfid, templateId, btn_url);
function sendMessage3(name, tel, flower, pfid, templateId, btn_url){
    let url = 'https://api.solapi.com/messages/v4/send';

    request = new XMLHttpRequest();

    if(!request){
        alert('request create fail');
        return;
    }

    let authoriztion = getAuthorization();

    request.onreadystatechange = requestResult;
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", authoriztion);

    var message = {
        "message": {
            "to": tel,
            "from": "01033528779",
            "text": "안녕하세요\nMarchBom입니다.\n"+name+"님 주문하신 "+flower+"\n결제완료 되었습니다.\n\n자세한 결제 내역은 아래의 버튼을 통해 확인가능합니다.",
            "type": "ATA",
            "kakaoOptions": {
                "pfId": pfid,
                "templateId": templateId,
                "buttons": [
                    {
                        "buttonType": "WL",
                        "buttonName": "결제내역 확인하기",
                        "linkMo": "http://"+btn_url,
                        "linkPc":"http://"+btn_url
                    }
                ]
            }
        }
    };


    const obj = JSON.stringify(message);    
    request.send(obj);
    return;
}

function requestResult(){
    if(request.readyState == XMLHttpRequest.DONE){
        // alert(request.responseText);
        console.log(request.responseText);
        if(request.responseText == "" || request.responseText == undefined)
        {
            // alert("알림 신청 중 오류 발생");            
            let url = window.location.href;
            if(url.indexOf("reservationWeek") >= 0 || url.indexOf("reservationNormal") >= 0)
            {
                alert("알림 신청 중 오류 발생");
            }
            else
            {
                document.querySelector('body').style.overflow = "hidden";
                document.getElementById('page5_alert_contents2').innerHTML="오류가 발생했습니다. <br/>다시 시도해주세요.";
                document.getElementById('page5_alert_block').style.display = "block";
            }
        }
        else
        {
            // alert("알림 신청이 완료되었습니다");
            let url = window.location.href;
            // console.log(url.indexOf("reservationWeek"))
            if(url.indexOf("reservationWeek") >= 0 || url.indexOf("reservationNormal") >= 0)
            {
                alert("결제가 완료되었습니다.");
                document.location.href = "./Confirmation.html?"+return_params();
            }
            else
            {
                document.querySelector('body').style.overflow = "hidden"
                document.getElementById('page5_alert_contents2').innerHTML="꽃말 알림톡 구독 서비스 <br/>신청이 완료되었습니다."
                document.getElementById('page5_alert_block').style.display = "block"
            }

            
        }
    }
}




function getPfInfo(){
    let pfid = document.getElementById('pfid').value;
    getPlusfriend(pfid);
}

function getPfInfos(){
    getPlusfriends();
}

function getTemplateInfo(){
    let templateId = document.getElementById('template-id').value;
    getTemplate(templateId);
}

function getTemplateInfos(){
    getTemplates();
}

function btn_sendMessage(){
    let name = document.getElementById('name').value;
    let tel = document.getElementById('tel').value;
    let templateId = document.getElementById('template-id').value;
    let pfid = document.getElementById('pfid').value;

    console.log(name);
    console.log(tel);
    console.log(btn_url);
    console.log(templateId);

    sendMessage(name, tel, btn_url, pfid, templateId);
}

// 4조_신청완료
// 템플릿에 대한것ㅇ
function btn_sendMessage1(){
    let name = document.getElementById('name').value;
    let tel = document.getElementById('tel').value;
    let benefit = "가입혜택이 들어가야하는 부분\n입니다~ 그럴껄? ";
    let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";
    let templateId = "KA01TP220506070416057KqM9s5ly5P8";
    let btn_url = "www.naver.com";

    sendMessage1(name, tel, benefit, pfid, templateId, btn_url);

}
// 4조_신청완료.
// 템플릿에 대한것
function btn_sendMessage2(){
    // let name = document.getElementById('name').value;
    // let tel = document.getElementById('tel').value;
    let name = $('input[name=userName]').val();
    let tel = $('input[name=userNumber]').val();
    let guide1 = "5";//월
    let guide2 = "4";//주
    let flower = "당신의 시작을 응원합니다."//꽃 ( 실제로는 꽃말 )
    let flower_language = "- 프리지아 -"//꽃말 ( 실제로는 꽃 이름 )

    let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";
    // 4조 _신청완료.
    // let templateId = "KA01TP220506071246963FQGTYFPI3gE";
    // 4조_이주의꽃  ( 템플릿 통과해서 밑에꺼로 사용 )
    let templateId = "KA01TP220517055404054jnKuB29puZY";

    let btn_url = DOTHOME_URL+"Mainpage.html?user_name="+name+"&user_tel="+tel+"&user_coupon=O";

    sendMessage2(name, tel, guide1, guide2, flower, flower_language, pfid, templateId, btn_url);

}

// 4조_결제알림
// 템플릿에 대한것
function btn_sendMessage3(get_flower_name,get_type1,get_type2,get_type3,get_date,get_time,get_price){
    let name = $('input[name=userName]').val();
    let tel = $('input[name=userNumber]').val();
    let flower = get_flower_name//꽃

    // const url = window.location.search;
    // console.log(url.indexOf("reservationWeek"))

    let pfid = "KA01PF22041206411o33TFWW9Sl71Ppp";
    let templateId = "KA01TP220506073013202eVHOIpHPItH";

    // 현재 페이지가 어떤페이지인지에 따라서 화면을 다르게 그리기 위해서 선언
    let cur_url = window.location.href;
    if(cur_url.indexOf("reservationWeek.html") >= 0)
        send_page = "week";
    else if(cur_url.indexOf("reservationNormal.html") >= 0)
        send_page = "normal";


    let btn_url = DOTHOME_URL+"Confirmation.html?user_name="+name+"&user_tel="+tel+
    "&user_coupon=O&type1="+get_type1+"&type2="+get_type2+"&type3="+get_type3+
    "&get_date="+get_date+"&get_time="+get_time+"&get_price="+get_price+"&page="+send_page;

    sendMessage3(name, tel, flower, pfid, templateId, btn_url);

}




function return_params()
{
    let name = $('input[name=userName]').val();
    let tel = $('input[name=userNumber]').val();
    let send_type1 = '프리지아';
    let send_type2 = '노란색';
    let send_type3 = '';
    let send_date = $('#SelectDate').val();
    let send_time = $('#SelectTime').val();
    let send_price = '';
    let send_page = "";
    
    if($(".selected-value").text().includes("꽃 다발"))
    {
        send_type3 = "꽃 다발";

        if(coupon_status)
            send_price = "1,800원";
        else
            send_price = "2,000원";

    }
    else if($(".selected-value").text().includes("꽃 바구니"))
    {
        send_type3 = "꽃 바구니";

        if(coupon_status)
            send_price = "45,000원";
        else
            send_price = "50,000원";
    }
    else if($(".selected-value").text().includes("서프라이즈 박스"))
    {
        send_type3 = "서프라이즈 박스";

        if(coupon_status)
            send_price = "90,000원";
        else
            send_price = "100,000원";
    }

    // 현재 페이지가 어떤페이지인지에 따라서 화면을 다르게 그리기 위해서 선언
    let cur_url = window.location.href;
    if(cur_url.indexOf("reservationWeek.html") >= 0)
    {
        send_page = "week";
    }
    else if(cur_url.indexOf("reservationNormal.html") >= 0)
    {
        send_page = "normal";
        send_flower_name = $('#selectbox1').val();
        send_type1 = $('#selectbox1').val();
        send_type2 = $('#selectbox2').val();
        send_date = $('#SelectDate').val();
        send_time = $('#SelectTime').val();

        let price = flower_name_price[flower_name_index] * flower_color_price[flower_color_index];            
        if($("#selectbox3").val().includes("꽃 다발"))
        {
            send_type3 = "꽃 다발";            
            send_price = utilGetNumber_withComma(""+Math.floor(price*flower_wrap_price[1]))+"원";
        }
        else if($("#selectbox3").val().includes("꽃 바구니"))
        {
            send_type3 = "꽃 바구니";
            send_price = utilGetNumber_withComma(""+Math.floor(price*flower_wrap_price[2]))+"원";
        }
        else if($("#selectbox3").val().includes("서프라이즈 박스"))
        {
            send_type3 = "서프라이즈 박스";
            send_price = utilGetNumber_withComma(""+Math.floor(price*flower_wrap_price[3]))+"원";
        }
    }


    return "user_name="+name+"&user_tel="+tel+
    "&user_coupon=O&type1="+send_type1+"&type2="+send_type2+"&type3="+send_type3+
    "&get_date="+send_date+"&get_time="+send_time+"&get_price="+send_price+"&page="+send_page;
}


