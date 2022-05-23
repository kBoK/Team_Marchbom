let page5_check = false;
// 글자 한글자씩 타이핑
let max_scroll = 0;
let start_an = 0;
// 중단점 768 이상이면 PC이고,    767이하이면 모바일
let breakpoint = 767;

// PC버전에서 타이핑 애니메이션 나오는 시점 (화면 스크롤 최대치 기준으로 75% 지점에서 실행)
let message_typing_pc = 0.75;
// 모바일 버전에서 타이핑 애니메이션 나오는 시점 (화면 스크롤 최대치 기준으로 70% 지점에서 실행)
let message_typing_m = 0.70;

// PC버전에서 꽃 애니메이션 시점 (화면 스크롤 최대치 기준으로 20% 지점에서 실행)
// 모바일 버전을 새로고침시 바로 실행되기에 % 지점이 필요없다
let flower_animation_pc = 0.20;


// PC버전에서 분홍색 글자가 나타나는 시점들 (화면 스크롤 최대치 기준으로 20% 지점에서 실행)
let text_show_pc = ["", 0.20, 0.30, 0.40];
let text_show_m = ["", 0.40, 0.45, 0.60];


$(function(){
	// 처음 화면에서 모바일이면 꽃 애니메이션 진행
	if(window.innerWidth < breakpoint)
		$('#page2_imgbox .path').addClass('add_flower_animation');

	// 스크롤이 맨 밑이면 타이틀 부분을 오른쪽으로 움직이는 애니메이션 하자.
	if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
		$('#page5 .page5_text').addClass('text_right_move');
	}

	// 개인정보 수집 및 이용 동의 부분 클릭에 대한 부분 ~~ 시작 ~~
	$("#page5_checkbox").on('click',function(){
		if(page5_check)
		{
			page5_check = false;

			// 체크이미지 변경
			$('#page5_checkbox div:first-child').css({
					background: "url('img/Landing/page5_check.png') center center no-repeat",
					'background-size': '20px 20px',
					'-webkit-appearance': 'none',
					'padding': '1em',
					'border-radius': '50%'
			});

			// 글자 색 변경
			$('#page5_checkbox div:last-child').css({
					color: "#8F8F8F"
			});

			// 뒷 배경 변경
			$('#page5_checkbox').css({
					'background-color': "#F8F8F8"
			});

			// 알림톡 부분 이미지 변경
			$('#page5_input_button').css({
					'background-color': "#8F8F8F"
			});


		}
		else
		{
			page5_check = true;
			// 체크이미지 변경
			$('#page5_checkbox div:first-child').css({
					background: "url('img/Landing/page5_checked.png') center center no-repeat",
					'background-size': '20px 20px',
					'-webkit-appearance': 'none',
					'padding': '1em',
					'border-radius': '50%'
			});

			// 글자 색 변경
			$('#page5_checkbox div:last-child').css({
					color: "#fff"
			});

			// 뒷 배경 변경
			$('#page5_checkbox').css({
					'background-color': "#82D166"
			});

			// 알림톡 부분 이미지 변경
			$('#page5_input_button').css({
				'background-color': "#000"
			});
		}
	});
	// 개인정보 수집 및 이용 동의 부분 클릭에 대한 부분 ~~ 끝 ~~

	$("#page5_input_button").on('click',function(){
		// console.log($('input[name=userName]').val());
		// console.log($('input[name=userNumber]').val());

		// 입력값이 없으면 입력하라는 알람을 띠우자.
		if($('#page5_input input:nth-of-type(1)').val() != "" && $('#page5_input input:nth-of-type(1)').val() != undefined && $('#page5_input input:nth-of-type(1)').val() != null)
		{
			if($('#page5_input input:nth-of-type(2)').val() != "" && $('#page5_input input:nth-of-type(2)').val() != undefined && $('#page5_input input:nth-of-type(2)').val() != null)
			{
				// 솔라피 카카오톡 알림톡 전달
				// btn_sendMessage2();
				if(page5_check)//개인정보 수집이 체크된 상황
				{			
					//솔라피 카카오톡 알림톡 전달
					// btn_sendMessage2();
					
					//20220522 php를 추가 해봄  ( 정보가 없으면 등록하고 알림톡 발생 )
					let user_name = $('#page5_input input:nth-of-type(1)').val();
					let user_tel = $('#page5_input input:nth-of-type(2)').val();
					PHP.get_user_data(user_name, user_tel);
				}
				else//개인정보 수집이 체크 안된 상황
				{
					// alert("개인정보 수집에 동의해주세요");
					document.querySelector('body').style.overflow = "hidden"
					document.getElementById('page5_alert_contents2').innerHTML="개인정보 수집 및 <br/>이용동의 체크를 해주세요."
					document.getElementById('page5_alert_block').style.display = "block"
				}
			}
			else
			{
				document.querySelector('body').style.overflow = "hidden"
				document.getElementById('page5_alert_contents2').innerHTML="전화번호를 <br/>입력 해주세요."
				document.getElementById('page5_alert_block').style.display = "block"
			}
		}
		else
		{
			document.querySelector('body').style.overflow = "hidden"
			document.getElementById('page5_alert_contents2').innerHTML="이름을 <br/>입력 해주세요."
			document.getElementById('page5_alert_block').style.display = "block"
		}


		
	});



	

/* 글자 한글자씩 타이핑하는 애니메이션 ~~시작~~ */
	// 글자 한글자씩 타이핑하는 애니메이션
	max_scroll = $(document).height() - $(window).height();
	
	
	//PC버전
	if(window.innerWidth > breakpoint)
	{
		// 글자 한글자씩 타이핑하는 시점 저장
		start_an = max_scroll * message_typing_pc;

		// 분홍색 글자 나타남 ( 말 한마디, 긍정적, 행복 )
		for(let i = 1; i < text_show_pc.length; i++)
		{
			let target_scroll = max_scroll *text_show_pc[i];
			if(window.scrollY >= target_scroll)
				$('#page2_textbox .mark_class'+i).addClass('mark_on');
		}

	}
	// 모바일 버전
	else
	{
		// 글자 한글자씩 타이핑하는 시점 저장
		start_an = max_scroll * message_typing_m;

		// 분홍색 글자 나타남 ( 말 한마디, 긍정적, 행복 )
		for(let i = 1; i < text_show_m.length; i++)
		{
			let target_scroll = max_scroll *text_show_m[i];
			if(window.scrollY >= target_scroll)
				$('#page2_textbox .mark_class'+i).addClass('mark_on');
		}

	}

	// 글자 한글자씩 타이핑하는 애니메이션
	if(window.scrollY >= start_an)
		setMessage();
	
/* 글자 한글자씩 타이핑하는 애니메이션 ~~끝~~ */

	// 스크롤이 맨 밑이면 타이틀 부분을 오른쪽으로 움직이는 애니메이션 하자.
	if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
		$('#page5 .page5_text').addClass('text_right_move');
	}


	//알림창 닫기
	$("#page5_alert_contents3").on('click',function(){
		//확인 버튼 클릭시 창닫기
		document.querySelector('body').style.overflow = "visible"
		document.getElementById('page5_alert_block').style.display = "none"
		
		
	});


	// 스크롤시 PC화면에서 특정 스크롤 좌표에서 꽃 애니메이션 진행
	window.addEventListener('scroll', () => {

		// console.log("~~~scroll~"+window.scrollY);

		// 스크롤이 맨 밑이면 타이틀 부분을 오른쪽으로 움직이는 애니메이션 하자.
		if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
			$('#page5 .page5_text').addClass('text_right_move');
		}	

		//PC버전
		if(window.innerWidth > breakpoint)
		{
			// 꽃 색칠 애니메이션
			if(window.scrollY >= (max_scroll * flower_animation_pc))//화면 스크롤에서 20% 정도 내려오면 애니메이션 진행
				$('#page2_imgbox .path').addClass('add_flower_animation');


			// 분홍색 글자 나타남 ( 말 한마디, 긍정적, 행복 )
			for(let i = 1; i < text_show_pc.length; i++)
			{
				let target_scroll = max_scroll *text_show_pc[i];
				if(window.scrollY >= target_scroll)
					$('#page2_textbox .mark_class'+i).addClass('mark_on');
			}

			// PC버전에서는 한글자씩 타이핑 하는 것을 스크롤이 화면의 75% 내려왔을때 진행
			start_an = max_scroll * message_typing_pc;
		}
		// 모바일 버전
		else
		{
			// 분홍색 글자 나타남 ( 말 한마디, 긍정적, 행복 )
			for(let i = 1; i < text_show_m.length; i++)
			{
				let target_scroll = max_scroll *text_show_m[i];
				if(window.scrollY >= target_scroll)
					$('#page2_textbox .mark_class'+i).addClass('mark_on');
			}

			// PC버전에서는 한글자씩 타이핑 하는 것을 스크롤이 화면의 75% 내려왔을때 진행
			start_an = max_scroll * message_typing_m;
		}




		// 글자 한글자씩 타이핑하는 애니메이션
		if(window.scrollY >= start_an)
			setMessage();

	});






});






/* 글자 한글자씩 타이핑하는 애니메이션  ~~ 시작 ~~*/
// 글자 한글자씩 표시
var init_msg = ["",
	"좋은 꽃말과 할인된 가격으로",
	"평범한 일상속에서",
	"작은 행복을 선물해보세요."];
var msg = "";
var count = 0;
var tag_count = 0;
var message_count = 0;

function setMessage(){
	if(message_count == 0)//한번 실행되면 다시 실행하지 마라.
	{
		message_count = 1;
		let loop_an = function(){
			if(count < init_msg[tag_count].length)
			{
				msg += init_msg[tag_count][count];
				$('#page4_text_an'+tag_count).text(msg);
				count++;
				setTimeout(loop_an,50);
			}
			else
			{
				if(tag_count < 3)
				{
					msg = "";
					count = 0;
					tag_count++;
					setTimeout(loop_an,50);
				}
			}
		}
		loop_an();
	}
}
// setMessage();
/* 글자 한글자씩 타이핑하는 애니메이션 ~~ 끝 ~~*/



