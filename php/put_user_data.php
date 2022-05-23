<?php
/*
	파일명: put_user_data.php
	하는일:
		서버에 사용자 정보를 등록
*/
	header("Content-Type: text/html; charset=UTF-8");
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

	include './config.php';

	//기본값 설정
	$USER_NAME = $_REQUEST["USER_NAME"];
	$TEL = $_REQUEST["TEL"];

	//테이블정의
	$TABLE_A = "kbk83354119.Team_project1_user_data";

	$query = "INSERT INTO $TABLE_A (NAME,TEL)
							VALUES ('$USER_NAME', '$TEL')";
	$result = mysqli_query($db_con, $query) or die("mysql_error");


	//종료한다.
	$db_close = mysqli_close($db_con);
?>