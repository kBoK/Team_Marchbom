<?php
	$db_con = mysqli_connect("localhost", "아이디", "비번");
	$db_select = mysqli_select_db($db_con,"아이디");
	mysqli_query($db_con,"set names utf8");

	function db_close()
	{
		$db_close = mysqli_close($db_con);
	}
?>
