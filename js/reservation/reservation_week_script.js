// URL에서 파라미터 값을 저장하기 위한 변수
let user_name = "";
let user_tel = "";
let user_coupon = "";
 
// 쿠폰 사용여부
let coupon_status = false; // true면 사용 ,   false 사용하지 않음 

//모두 입력되었는지 확인하는 부분 
let all_input_status = false;// true면 모두 입력 ,   false 입력되지 않음

$(function(){

    // 날짜 선택 부분
    let now = new Date();
    let dateObj = document.getElementById('SelectDate');
    dateObj.value= now.toISOString().slice(0, 10);
    dateObj.min= now.toISOString().slice(0, 10);
    dateObj.max= new Date(now.setDate(now.getDate() + 7)).toISOString().slice(0, 10);

    $('#SelectTime').timepicker({        
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '10',
        maxTime: '6:00pm',
        defaultTime: '10',
        startTime: '10:00',
        dynamic: true,
        dropdown: true,
        scrollbar: true
    });


    // 기본 셀렉트 리스트 들의 항목들을 변경한다.
    selecte_list_style()


    /* 셀렉트 박스 클릭 관련 소스 ~~시작~~ */    
    // 셀렉트 박스    
    for(let i = 1; i <= 3; i++)
    {
        $('.select ul li:nth-of-type('+i+')').on('click',function(){
            // 스타일을 적용해보자
            selected_style(i);
        })
    }

    const selectBoxElements = document.querySelectorAll(".select");

    function toggleSelectBox(selectBox) {
        selectBox.classList.toggle("active");
    }

    selectBoxElements.forEach(selectBoxElement => {
        selectBoxElement.addEventListener("click", function (e) {
            toggleSelectBox(selectBoxElement);
        });
    });

    document.addEventListener("click", function (e) {
        const targetElement = e.target;
        const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

        if (isSelect) {
            return;
        }

        const allSelectBoxElements = document.querySelectorAll(".select");

        allSelectBoxElements.forEach(boxElement => {
            boxElement.classList.remove("active");
        });
    });
    /* 셀렉트 박스 클릭 관련 소스 ~~끝~~ */



    /* 쿠폰 여부에 따른 클릭시 이벤트 관련 내용 ~~시작~~ */
    $("#checkbox").on('click',function(){
        if(user_coupon == "O")
        {
            if(coupon_status)//쿠폰 사용을 체크한 상황에서 클릭을 했기에 다시 사용하기 전으로 내용 변경
            {
                coupon_status = false;
                $("#checkbox div").html("&nbsp;&nbsp;쿠폰 사용 가능");
                $("#checkbox div").css({'color':'#7B7B7B'});
                // $("#checkbox").css({'background-color': 'white'});
            }
            else//쿠폰 사용하지 않은 상황으로 쿠폰을 사용하도록 변경
            {
                coupon_status = true;
                $("#checkbox div").html("&nbsp;&nbsp;쿠폰 적용 완료");
                $("#checkbox div").css({'color':'red'});
                // $("#checkbox").css({'background-color': 'rgb(138, 136, 136)'});
            }

            // 쿠폰을 적용했으니 실시간으로 스타일을 변경하자
            let tmp_str = $(".selected-value").text();
            if(tmp_str.includes("꽃 다발"))
                selected_style(1);
            else if(tmp_str.includes("꽃 바구니"))
                selected_style(2);
            else if(tmp_str.includes("서프라이즈 박스"))
                selected_style(3);            

            selecte_list_style();
        }
    })
    /* 쿠폰 여부에 따른 클릭시 이벤트 관련 내용 ~~끝~~ */


    // 결제 버튼 클릭시
    $("#button").on('click',function(){

        if(all_input_status)
        {
            let send_flower_name = '프리지아';
            let send_type1 = '프리지아';
            let send_type2 = '노란색';
            let send_type3 = '';
            let send_date = $('#SelectDate').val();
            let send_time = $('#SelectTime').val();
            let send_price = '';
    
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
            
    
            btn_sendMessage3(send_flower_name,send_type1,send_type2,send_type3,send_date,send_time,send_price);
        }
    })
    


    // 입력을 모두 확인하여 구매하기 버튼 활성화 처리하기
    setTimeout(all_input_check,1000);


    // 시간 선택하는 부분에서 글자크기 조정하기
    if(window.innerWidth > 768)
    {//PC
        $('.ui-timepicker-container').removeClass('time_m');
        $('.ui-timepicker-container').addClass('time_pc');
    }
    else
    {
        $('.ui-timepicker-container').removeClass('time_pc');
        $('.ui-timepicker-container').addClass('time_m');
    }

})



$(document).ready(function(){ 
	/* URL에서 파라미터 가져와서 값읽기 ~~시작~~ */
	const url = window.location.search;
	const urlParams = new URLSearchParams(url);

	user_name = decodeURI(decodeURIComponent(urlParams.get('user_name')));
	user_tel = urlParams.get('user_tel');
	user_coupon = urlParams.get('user_coupon');

    // 처음 화면이 보여질때의 텍스트 ( 쿠폰을 보유 X )  -  쿠폰 사용 불가
    // 처음 화면이 보여질때의 텍스트 ( 쿠폰을 보유 O 사용X )  -  쿠폰 사용 가능
    // 처음 화면이 보여질때의 텍스트 ( 쿠폰을 보유 O 사용O )  -  이미 쿠폰을 사용하였습니다.
    
    //사용자 쿠폰 기본 셋팅
    $("#checkbox div").html("&nbsp;&nbsp;사용가능한 쿠폰 없음");
    $("#checkbox div").css({'color' : 'white'});
    $("#checkbox").css({'background-color' : 'rgb(138, 136, 136)'});
    
    if(user_name != null && user_name != "null" && user_name != "" && user_name != undefined)
    {        
        $('.Name input').val(user_name);
        $('.Number input').val(user_tel);
        if(user_coupon == "O")
        {
            $("#checkbox div").html("&nbsp;&nbsp;쿠폰 사용 가능");
            $("#checkbox div").css({'color' : '#7B7B7B'});
            $("#checkbox").css({'background-color': 'white'});
        }
        else
        {
            $("#checkbox div").html("&nbsp;&nbsp;사용가능한 쿠폰 없음");
            $("#checkbox div").css({'color' : 'white'});
            $("#checkbox").css({'background-color' : 'rgb(138, 136, 136)'});
        }
    }
	/* URL에서 파라미터 가져와서 값읽기 ~~끝~~*/
})


// 선택된 항목 스타일 적용 ( 꽃 다발 , 꽃 바구니 , 서프라이즈 박스)
function selected_style(target_index){

    let type_text = ["","꽃 다발","꽃 바구니","서프라이즈 박스"];
    let money = ["","2,000","50,000","100,000"];
    let money_sale = ["","1,800","45,000","90,000"];

    if(coupon_status)//쿠폰 적용
    {
        document.querySelector(".selected-value").innerHTML = 
            "<div>&nbsp;&nbsp;"+type_text[target_index]+"<span>(할인적용)</span></div>"+
            "<div>&nbsp;&nbsp;<span>"+money[target_index]+"원</span></div>"+
            "<div>&nbsp;&nbsp;10%</div>"+
            "<div>&nbsp;&nbsp;"+money_sale[target_index]+"원</div>";

        $('.selected-value div:nth-of-type(2) span').css({
            'text-decoration': 'line-through',
            'color': '#afafaf'
        })
        $('.selected-value div:nth-of-type(3)').css({
            'color': 'red'
        })

        if(window.innerWidth > 768)
        {//PC
            $('.selected-value div, .selected-value div:nth-of-type(2) span').css({
                'font-size': '1.8vmax'
            })
        }
        else
        {
            $('.selected-value div, .selected-value div:nth-of-type(2) span').css({
                'font-size': '2.8vmax'
            })
        }

    }
    else
    {
        document.querySelector(".selected-value").innerHTML = 
            "<div>&nbsp;&nbsp;"+type_text[target_index]+"<span></span></div>"+
            "<div>&nbsp;&nbsp;<span>"+money[target_index]+"원</span></div>"+
            "<div>&nbsp;&nbsp;</div>"+
            "<div>&nbsp;&nbsp;</div>";

        
        $('.selected-value div:nth-of-type(2) span').css({
            'text-decoration': 'none',
            'color': '#7B7B7B'
        })
        $('.selected-value div:nth-of-type(3)').css({
            'color': 'red'
        })

        if(window.innerWidth > 768)
        {//PC
            $('.selected-value div, .selected-value div:nth-of-type(2) span').css({
                'font-size': '1.8vmax'
            })
        }
        else
        {
            $('.selected-value div, .selected-value div:nth-of-type(2) span').css({
                'font-size': '2.8vmax'
            })
        }
    }
}



// 선택된 항목 목록들 스타일 적용 ( 꽃 다발 , 꽃 바구니 , 서프라이즈 박스)
function selecte_list_style(){

    let type_text = ["","꽃 다발","꽃 바구니","서프라이즈 박스"];
    let money = ["","2,000","50,000","100,000"];
    let money_sale = ["","1,800","45,000","90,000"];

    for(let i = 1; i <= 3; i++)
    {
        if(coupon_status)//쿠폰 적용
        {
            document.querySelector(".select ul li:nth-of-type("+i+")").innerHTML = 
                "<div>&nbsp;&nbsp;"+type_text[i]+"<span>(할인적용)</span></div>"+
                "<div>&nbsp;&nbsp;<span>"+money[i]+"원</span></div>"+
                "<div>&nbsp;&nbsp;10%</div>"+
                "<div>&nbsp;&nbsp;"+money_sale[i]+"원</div>";

            $('.select .option div:nth-of-type(2) span').css({
                    'text-decoration': 'line-through',
                    'color': '#afafaf'
                })
        }
        else
        {
            document.querySelector(".select ul li:nth-of-type("+i+")").innerHTML = 
                "<div>&nbsp;&nbsp;"+type_text[i]+"<span></span></div>"+
                "<div>&nbsp;&nbsp;<span>"+money[i]+"원</span></div>"+
                "<div>&nbsp;&nbsp;</div>"+
                "<div>&nbsp;&nbsp;</div>";

            $('.select .option div:nth-of-type(2) span').css({
                    'text-decoration': 'none',
                    'color': '#7B7B7B'
                })
        }
    }
}


//모든 입력창이 입력되었는지 확인 후 구매를 누르도록 변경
// all_input_status = false;// true면 모두 입력 ,   false 입력되지 않음
function all_input_check(){
    
    // $('.Name input').val("홍길동");
    // $('.Number input').val("010-xxxx-xxxx");
    // $(".selected-value").text()

    // console.log($('.Name input').val())
    // console.log($('.Number input').val())
    // console.log($(".selected-value").text().includes("원하시는 타입을 선택하세요"))
    // console.log(all_input_status)


    if(!all_input_status)//모두 입력이 안된경우
    {
        if($('.Name input').val() == "" || 
            $('.Number input').val() == "" || 
            $(".selected-value").text().includes("원하시는 타입을 선택하세요"))
        {
            $("button").css({
                'background-color': 'rgb(150, 150, 150)'
            })
            setTimeout(all_input_check,100);
        }
        else
        {
            all_input_status = true;
            $("button").css({
                'cursor': 'pointer',
                'background-color': 'black'
            })
        }
    }
}