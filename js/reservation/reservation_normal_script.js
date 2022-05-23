 // URL에서 파라미터 값을 저장하기 위한 변수
 let user_name = "";
 let user_tel = "";

let flower_name_str = ["","수국","수선화","안개꽃","장미","카네이션","튤립","프리지아","하이신스"];
let flower_name_price = ["",1100,1200,1300,1400,1500,1600,1700,1800];
let flower_color_str = ["","빨간색","주황색","노랑색","파랑색","보라색","분홍색","흰색"];
let flower_color_price = ["",1.0,1.1,1.2,1.3,1.4,1.5,1.6];
let flower_wrap_price = ["",1.1,5,10];


let flower_name_index = 0;
let flower_color_index = 0;

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


    // 결제 버튼 클릭시
    $("#button").on('click',function(){

        if(all_input_status)
        {
            let send_flower_name = $('#selectbox1').val();
            let send_type1 = $('#selectbox1').val();
            let send_type2 = $('#selectbox2').val();
            let send_type3 = '';
            let send_date = $('#SelectDate').val();
            let send_time = $('#SelectTime').val();
            let send_price = '';
    
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

    console.log(user_name);

    if(user_name != null && user_name != "null" && user_name != "" && user_name != undefined)
    {
        $('.Name input').val(user_name);
        $('.Number input').val(user_tel);
    }
	/* URL에서 파라미터 가져와서 값읽기 ~~끝~~*/


    // type1, type2의 값이 변경되면 type3의 값을 변경해봅니다.
    $(".select_change_check").on('change',function(){
        // console.log(this.value);
        change_price();
    })
})



function change_price(){

    // console.log("~1~"+$('#selectbox1').val())
    // console.log("~2~"+$('#selectbox2').val())
    // console.log("~11~"+typeof $('#selectbox1').val())
    // console.log("~22~"+typeof $('#selectbox2').val())

    let select1_val = $('#selectbox1').val();
    let select2_val = $('#selectbox2').val();
    
    if(select1_val.indexOf("꽃 종류를 선택해주세요") == -1 && select2_val.indexOf("색상 타입을 선택해주세요") == -1 )
    {
        // 현재 선택된 꽃이름이 몇번째 인덱스인지 확인
        for(let i = 1; i< flower_name_str.length; i++)
        {
            if(flower_name_str[i].indexOf(select1_val) >= 0)
            {
                flower_name_index = i;
                break;
            }
        }

        // 현재 선택된 꽃 색깔이 몇번째 인덱스인지 확인
        for(let ii = 1; ii< flower_color_str.length; ii++)
        {
            if(flower_color_str[ii].indexOf(select2_val) >= 0)
            {
                flower_color_index = ii;
                break;
            }
        }


        // console.log(flower_name_index)
        // console.log(flower_color_index)

        if(flower_name_index == 0 || flower_color_index == 0 )
        {
            console.log("오류가 발생 일단 기본값으로 셋팅하자")
        }
        else
        {

            let price = flower_name_price[flower_name_index] * flower_color_price[flower_color_index];

            document.getElementById("selectbox3").innerHTML = 
                    "<option selected='selected'>타입을 선택해주세요.</option>"+
                    "<option>꽃 다발&nbsp;&nbsp;"+utilGetNumber_withComma(""+Math.floor(price*flower_wrap_price[1]))+"원</option>"+
                    "<option>꽃 바구니&nbsp;&nbsp;"+utilGetNumber_withComma(""+Math.floor(price*flower_wrap_price[2]))+"원</option>"+
                    "<option>서프라이즈 박스&nbsp;&nbsp;"+utilGetNumber_withComma(""+Math.floor(price*flower_wrap_price[3]))+"원</option>";

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
    // console.log($("#selectbox1").val().includes("꽃 종류를 선택해주세요"))
    // console.log($("#selectbox2").val().includes("색상 타입을 선택해주세요"))
    // console.log($("#selectbox3").val().includes("타입을 선택해주세요"))
    // console.log(all_input_status)


    if(!all_input_status)//모두 입력이 안된경우
    {
        if($('.Name input').val() == "" || 
            $('.Number input').val() == "" || 
            $("#selectbox1").val().includes("꽃 종류를 선택해주세요") ||
            $("#selectbox2").val().includes("색상 타입을 선택해주세요") ||
            $("#selectbox3").val().includes("타입을 선택해주세요"))
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




//천단위 콤마 찍어주는 함수
function utilGetNumber_withComma(value)
{
	var str1, str2, str3, str;
	var num1, num2, strLen;
	strLen = value.length;
	if (strLen > 6)
	{
		num1 = strLen - 3;
		str1 = value.slice(num1, strLen);
		num2 = strLen - 6;
		str2 = value.slice(num2, num1);
		str3 = value.slice(0, num2);
		str = str3+','+ str2 + ',' + str1;
	} else if (strLen > 3)
	{
		num1 = strLen - 3;
		str1 = value.slice(num1, strLen);
		str2 = value.slice(0, num1);
		str = str2 + ',' + str1;
	} else
	{
		str = value;
	}
		return str;

}
