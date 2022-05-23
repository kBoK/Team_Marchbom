 // URL에서 파라미터 값을 저장하기 위한 변수
 let user_name = "";//사용자 이름
 let user_tel = "";//사용자 번호
 let user_coupon = "";//사용자 쿠폰
 let get_type1 = "";//꽃 이름 
 let get_type2 = "";//꽃 색
 let get_type3 = "";//꽃 형태 ( 한 송이, 한 다발 , 한 바구니)
 let get_date = "";//날짜
 let get_time = "";//시간
 let get_price = "";//가격

$(function(){
})

$(document).ready(function(){ 
	/* URL에서 파라미터 가져와서 값읽기 ~~시작~~ */
	const url = window.location.search;
	const urlParams = new URLSearchParams(url);

	user_name = decodeURI(decodeURIComponent(urlParams.get('user_name')));
	user_tel = urlParams.get('user_tel');
	user_coupon = urlParams.get('user_coupon');
	get_type1 = urlParams.get('type1');
	get_type2 = urlParams.get('type2');
	get_type3 = urlParams.get('type3');
	get_date = urlParams.get('get_date');
	get_time = urlParams.get('get_time');
	get_price = urlParams.get('get_price');
	get_page = urlParams.get('page');

    let str = "";
    if(get_page == "week")
    {//이번주 꽃
        str = "<p>name : "+user_name+"</p>"+
            "<p>number : "+user_tel+"</p>"+
            "<p>TYPE1 : "+get_type1+"</p>"+
            "<p>TYPE2 : "+get_type2+"</p>"+
            "<p>TYPE3 : "+get_type3+"</p>"+
            "<p>DATE : "+get_date+"</p>"+
            "<p>TIME : "+get_time+"</p>"+
            "<p>Price : "+get_price+"</p>";

        // 이번주 꽃에 대한 이미지 변경
        $(".imgbox img").attr("src", "./img/Confirmation/reservationWeekflower.png");
    }
    else
    {//일반 꽃
        str = "<p>name : "+user_name+"</p>"+
            "<p>number : "+user_tel+"</p>"+
            "<p>TYPE1 : "+get_type1+"</p>"+
            "<p>TYPE2 : "+get_type2+"</p>"+
            "<p>DATE : "+get_date+"</p>"+
            "<p>TIME : "+get_time+"</p>"+
            "<p>Price : "+get_price+"</p>";

        // 일반 꽃에 대한 이미지 변경
        $(".imgbox img").attr("src", "./img/Confirmation/normal.png");
    }
    

    $('.textbox').html(str);
	/* URL에서 파라미터 가져와서 값읽기 ~~끝~~*/

    
})
