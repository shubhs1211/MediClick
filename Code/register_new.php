<?php
session_start();

if(!isset($_SESSION['user']))
{
	header("Location: index.php");
}
else if(isset($_SESSION['user'])!="")
{
	header("Location: Homepage.php");
}

if(isset($_GET['register']))
{
	session_destroy();
	unset($_SESSION['user']);
	header("Location: register.php");
}
?>