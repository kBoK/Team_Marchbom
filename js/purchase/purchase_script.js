 // URL에서 파라미터 값을 저장하기 위한 변수
let user_name = "";
let user_tel = "";
let user_coupon = "";

$(document).ready(function(){ 

    document.querySelector('.BT1').addEventListener("mouseover", function() {
        document.getElementById("black1").style.display = "block";
    });
    document.querySelector('.BT1').addEventListener("mouseout", function() {
        document.getElementById("black1").style.display = "none";
     });
    
     document.querySelector('.BT2').addEventListener("mouseover", function() {
        document.getElementById("black2").style.display = "block";
    });
    document.querySelector('.BT2').addEventListener("mouseout", function() {
        document.getElementById("black2").style.display = "none";
     });

	/* URL에서 파라미터 가져와서 값읽기 ~~시작~~ */
	const url = window.location.search;
	const urlParams = new URLSearchParams(url);
	// console.log(urlParams.get('user_name'));
	// console.log(urlParams.get('user_tel'));
	// console.log(urlParams.get('user_coupon'));

	user_name = decodeURI(decodeURIComponent(urlParams.get('user_name')));
	user_tel = urlParams.get('user_tel');
	user_coupon = urlParams.get('user_coupon');

	$('.thisweek a').attr('href',"./reservationWeek.html?user_name="+user_name+"&user_tel="+user_tel+"&user_coupon="+user_coupon);
	$('.normal a').attr('href',"./reservationNormal.html?user_name="+user_name+"&user_tel="+user_tel+"&user_coupon="+user_coupon);
	/* URL에서 파라미터 가져와서 값읽기 ~~끝~~*/
})