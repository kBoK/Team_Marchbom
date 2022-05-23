let page5_check = false;
// 글자 한글자씩 타이핑
let max_scroll = 0;
let start_an = 0;


$(function(){
	// 처음 화면에서 모바일이면 꽃 애니메이션 진행
	if(window.innerWidth < 767)
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

		if(page5_check)//개인정보 수집이 체크된 상황
		{
			//솔라피 카카오톡 알림톡 전달
			btn_sendMessage2();
		}
		else//개인정보 수집이 체크 안된 상황
		{
			// alert("개인정보 수집에 동의해주세요");
			document.getElementById('page5_alert_contents2').innerHTML="개인정보 수집 및 <br/>이용동의 체크를 해주세요."
			document.getElementById('page5_alert_block').style.display = "block"
		}
	});



	


	max_scroll = $(document).height() - $(window).height();
	start_an = max_scroll * 0.75;

	// console.log("~~max_scroll~~"+($(document).height() - $(window).height()));
	// console.log("~~start_an~~"+start_an);

	// 글자 한글자씩 타이핑하는 애니메이션
	if(window.scrollY >= start_an)
		setMessage();

	//PC버전
	// if(window.innerWidth > 767)
	// {
	// 	// 글자 한글자씩 타이핑하는 애니메이션
	// 	if(window.scrollY >= 2900)
	// 	{
	// 		setMessage();
	// 	}
	// }
	// // 모바일 버전
	// else
	// {
	// 	// 글자 한글자씩 타이핑하는 애니메이션
	// 	if(window.scrollY >= 2100)
	// 	{
	// 		setMessage();
	// 	}
	// }

	// 스크롤이 맨 밑이면 타이틀 부분을 오른쪽으로 움직이는 애니메이션 하자.
	if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
		$('#page5 .page5_text').addClass('text_right_move');
	}




	//알림창 닫기
	$("#page5_alert_contents3").on('click',function(){
		
		//확인 버튼 클릭시 창닫기
		document.getElementById('page5_alert_block').style.display = "none"
		
		
	});





});

// 스크롤시 PC화면에서 특정 스크롤 좌표에서 꽃 애니메이션 진행
window.addEventListener('scroll', () => {
	console.log(window.scrollY);

	// 스크롤이 맨 밑이면 타이틀 부분을 오른쪽으로 움직이는 애니메이션 하자.
	if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
		$('#page5 .page5_text').addClass('text_right_move');
	}	

	// 글자 한글자씩 타이핑하는 애니메이션
	if(window.scrollY >= start_an)
	{
		setMessage();
	}


/* 
	//PC버전
	if(window.innerWidth > 767)
	{
		// 꽃 색칠 애니메이션
		if(window.scrollY >= 1000)
			$('#page2_imgbox .path').addClass('add_flower_animation');

		// 첫번째 분홍색 글자 나타남 ( 말 한마디 )
		if(window.scrollY >= 600)
		{
			$('#page2_textbox .mark_class1').addClass('mark_on');
		}

		// 두번째 분홍색 글자 나타남 ( 긍정적 )
		if(window.scrollY >= 700)
		{
			$('#page2_textbox .mark_class2').addClass('mark_on');
		}

		// 세번째 분홍색 글자 나타남 ( 행복 )
		if(window.scrollY >= 1200)
		{
			$('#page2_textbox .mark_class3').addClass('mark_on');
		}

		// 글자 한글자씩 타이핑하는 애니메이션
		if(window.scrollY >= 2900)
		{
			setMessage();
		}
	}
	// 모바일 버전
	else
	{
		// 첫번째 분홍색 글자 나타남 ( 말 한마디 )
		if(window.scrollY >= 900)
		{
			$('#page2_textbox .mark_class1').addClass('mark_on');
		}

		// 두번째 분홍색 글자 나타남 ( 긍정적 )
		if(window.scrollY >= 1200)
		{
			$('#page2_textbox .mark_class2').addClass('mark_on');
		}

		// 세번째 분홍색 글자 나타남 ( 행복 )
		if(window.scrollY >= 1800)
		{
			$('#page2_textbox .mark_class3').addClass('mark_on');
		}

		// 글자 한글자씩 타이핑하는 애니메이션
		if(window.scrollY >= 2100)
		{
			setMessage();
		}
	}
 */




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



