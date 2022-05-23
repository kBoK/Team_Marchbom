<?php
	$db_con = mysqli_connect("localhost", "kbk83354119", "tkfkd2357!");
	$db_select = mysqli_select_db($db_con,"kbk83354119");
	mysqli_query($db_con,"set names utf8");

	function db_close()
	{
		$db_close = mysqli_close($db_con);
	}
?>