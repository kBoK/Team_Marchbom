// URL에서 파라미터 값을 저장하기 위한 변수
let user_name = "";
let user_tel = "";
let user_coupon = "";

$(function(){

	/* 지도 API 사용하기 ~~시작~~*/
	var container = document.getElementById('openapi_map');
	var options = {
		center: new kakao.maps.LatLng(35.870465050421316, 128.69545894944764),
		level: 3
	};

	var map = new kakao.maps.Map(container, options);

	// 마커가 표시될 위치입니다 
	var markerPosition  = new kakao.maps.LatLng(35.870465050421316, 128.69545894944764); 

	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
		position: markerPosition
	});

	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
	/* 지도 API 사용하기 ~~끝~~*/
});



$(document).ready(function(){
	/* URL에서 파라미터 가져와서 값읽기 ~~시작~~ */
	const url = window.location.search;
	const urlParams = new URLSearchParams(url);
	// console.log(urlParams.get('user_name'));
	// console.log(urlParams.get('user_tel'));
	// console.log(urlParams.get('user_coupon'));

	user_name = decodeURI(decodeURIComponent(urlParams.get('user_name')));
	user_tel = urlParams.get('user_tel');
	user_coupon = urlParams.get('user_coupon');

	console.log(user_name);
	console.log(user_tel);
	console.log(user_coupon);

	$('#button button a').attr('href',"./Purchase.html?user_name="+user_name+"&user_tel="+user_tel+"&user_coupon="+user_coupon);
	/* URL에서 파라미터 가져와서 값읽기 ~~끝~~*/
})




// 스크롤시 PC화면에서 특정 스크롤 좌표에서 꽃 애니메이션 진행
window.addEventListener('scroll', () => {
	// console.log(window.scrollY);

	//PC버전
	if(window.innerWidth > 767)
	{
		// 상단의 헤더 부분을 스크롤시 고정 ~~시작~~
		$('#main_gnb').css({	display: 'block'	});
		if(window.scrollY>=1)
		{
			$('#main_gnb').addClass('main_class');
			$('#main_gnb a').addClass('main_class_a');
		}
		else
		{
			$('#main_gnb').removeClass('main_class');
			$('#main_gnb a').removeClass('main_class_a');
		}
		// 상단의 헤더 부분을 스크롤시 고정 ~~끝~~


		/* 스크롤시 카드를 뒤집기 위한 부분~~시작~~ */
		if(window.scrollY >= 800)
		{
			for(let i = 1; i <= 3; i++)
			{
				$('#content_02_page_02_imgbox_0'+i+' img').attr('src','./img/main/main_'+(i+1)+'.png');
				$('#content_02_page_02_imgbox_0'+i+' img').addClass('add_keyframe');
			}
		}
		/* 스크롤시 카드를 뒤집기 위한 부분~~끝~~ */


	}
	// 모바일 버전
	else
	{
		$('#main_gnb').css({	display: 'none'	});

		/* 스크롤시 카드를 뒤집기 위한 부분~~시작~~ */
		if(window.scrollY >= 800 && window.scrollY < 1499)
		{
			$('#content_02_page_02_imgbox_01 img').attr('src','./img/main/main_2.png');
			$('#content_02_page_02_imgbox_01 img').addClass('add_keyframe');
		}
		else if(window.scrollY >= 1500 && window.scrollY < 2199)
		{
			$('#content_02_page_02_imgbox_02 img').attr('src','./img/main/main_3.png');
			$('#content_02_page_02_imgbox_02 img').addClass('add_keyframe');
		}
		else if(window.scrollY >= 2200)
		{
			$('#content_02_page_02_imgbox_03 img').attr('src','./img/main/main_4.png');
			$('#content_02_page_02_imgbox_03 img').addClass('add_keyframe');
		}
		/* 스크롤시 카드를 뒤집기 위한 부분~~끝~~ */
	}
});

window.onresize = function(){
	//PC버전
	if(window.innerWidth > 767)
	{
		$('#main_gnb').css({	display: 'block'	});
	}
	// 모바일 버전
	else
	{
		$('#main_gnb').css({	display: 'none'	});
	}
}
