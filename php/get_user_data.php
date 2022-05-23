<?php
/*
	파일명: get_user_data.php
	하는일:
		서버에 사용자 정보가 있는가?
*/
	header("Content-Type: text/html; charset=UTF-8");
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

	include './config.php';

	//기본값 설정
	$TEL = $_REQUEST["TEL"];

	//테이블정의
	$TABLE_A = "kbk83354119.Team_project1_user_data";
	
	$query = "SELECT * FROM $TABLE_A WHERE TEL = '$TEL'";
	$result = mysqli_query($db_con,$query) or die("mysql_error");
	$row = mysqli_fetch_row($result);

	if($row[0])
		echo $row[2];
	else
		echo "X";

	//종료한다.
	$db_close = mysqli_close($db_con);
?>