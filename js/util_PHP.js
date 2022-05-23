/**************************************************************
 * Server 와의 연결을 담당하는 js파일
 *
 * @file name util_PHP.js
 * @history 	
 *
 **************************************************************/

var PHP =
{
};

/**
 * server로 부터 전화번호를 요청한다.
 * @return {[type]} [description]
 */
PHP.get_user_data = function(user_name,user_tel)
{
	var server_url = "http://"+DOTHOME_URL + "php/get_user_data.php";

	$.post(server_url,
	{
		'TEL'				: user_tel
	},
	function(data) // first success
	{
		console.log("~success~ PHP.get_user_data ~ data : "+data);
		if(data == "X")//처음 등록하는거 정보가 없는것 
		{
			// 정보가 없으므로 새로 등록
			PHP.put_user_data(user_name,user_tel);
		}
		else
		{
			document.querySelector('body').style.overflow = "hidden"
			document.getElementById('page5_alert_contents2').innerHTML="이미 등록된 <br/>전화번호입니다."
			document.getElementById('page5_alert_block').style.display = "block"
		}
	})
	.fail(function(e){
		console.log("Error in PHP.get_user_data().fail:"+e); 
		// console.log(e); 
	});
}

PHP.put_user_data = function(user_name, user_tel)
{
	var server_url = "http://"+DOTHOME_URL + "php/put_user_data.php";

	$.post(server_url,
	{
		'USER_NAME'			: user_name,
		'TEL'				: user_tel
	},
	function(data) // first success
	{
		console.log("~success~ PHP.put_user_data ~ data : "+data);
		// 등록 완료되었으니 솔라피로 카톡 전달
		//솔라피 카카오톡 알림톡 전달
		btn_sendMessage2();
	})
	.fail(function(e){
		console.log("Error in PHP.put_user_data().fail:"+e); 
		// console.log(e); 
	});
}
