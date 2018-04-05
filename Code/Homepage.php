<?php
session_start();
include_once 'dbconnect.php';

if(!isset($_SESSION['user']))
{
	header("Location: index.php");
}
$res=mysql_query("SELECT * FROM users WHERE user_id=".$_SESSION['user']);
$userRow=mysql_fetch_array($res);
?>
<!DOCTYPE html>
<html>	
<head>
	<link rel="stylesheet" type="text/css" href="Styleh.css">
	<style>
	a{
		text-decoration:none;
	}
	</style>
	<title>MediClick</title>
</head>
<body>
	<div class="one">
		<div class="logo">
			<a href=""><img src="Images\logo.png"></a>
	    </div>
	    
	    <div class="link">
		    <span>Hello  <?php echo $userRow['username']; ?></span>
	    	<button onclick="window.location.href='About'">ABOUT US</button>
			<button onclick="window.location.href='Contact'">CONTACT US</button>
			<button onclick="window.location.href='logout.php?logout'">LOGOUT</button>
			<?php
	    	//<button onclick="window.location.href='index.php'">LOGIN</button>
	    	//<button onclick="window.location.href='register.php?register'">SIGN UP</button>
			?>
	    	
	    </div>
	    
	   	
	    <div class="connect">
	    	Connect With Us :
	    
	    	<a href="Facebook.html"> <div class=social><img src="Images\Facebook icon.jpg"></div></a>
	   	 	<a href="Twitter.html"> <div class=social><img src="Images\Twitter icon.jpg"></div></a>
	   	 	<a href="Google+.html"> <div class=social><img src="Images\google+ icon.jpg"></div></a>
	    </div>
		

	</div>

	<div class="middle">
		<hr>
  		<img class="background" src="Images\Background image.jpg"/>
  		<hr>
 		<img class="searchbox"src="Images\Search boxx.png"/>
  		
	</div>
	<div class="se">
	    <input type="text" name="df" placeholder="Your Search goes here" style="height: 35px; width: 350px; font-familty: AvenirNext">
		<a href="cart/"><input type="submit" value="Search" style="height: 35px; width: 100px; font-familty: AvenirNext; background-color:blue; Color:white; border:none; margin-left:1% "></a>
	</div>

	<div class="tabs">
		<div><a href="uplode/"><img src="Images\Upload tab.jpg" ></a></div>
		<div><a href="cart/"><img src="Images\Medicines Info tab.jpg"></a></div>
		<div><a href="Doctor"><img src="Images\Call Doctor Tab.jpg"></a></div>
		<div><a href="cart"><img src="Images\Buy tab.jpg"></a></div>
		<div><a href="register_new.php?register"><img src="Images\Register tab.jpg"></a></div>
		<div><a href="Contact/"><img src="Images\Call Us tab.jpg"></a></div>
	</div>

	<div class="bmi">
		<div><a target="_blank" href="BMI Calculator\BMI.html"><img src="Images\BMI Calculator.png"></a></div>
	</div>

	<div class="featured">
		<div class="secone">
		<a href="Featured/"><img src="Images\Featured.png"></a>
		</div>
		<div class="sectwo">
			<div class="optiona">
				<a href="Featured/diabetes.html"><img src="Images\diabetes.jpg">
				<p>Diabetes</p></a>
			</div>
			<div class="optiona">
				<img src="Images\pain-reliever.jpg">
				<p>Pain Reliever</p>
			</div>
			<div class="optiona">
				<img src="Images\skin-care.jpg">
				<p>Skin Care</p>
			</div>			
		</div>
		<div class="secthree">
			<div class="optiona">
				<img src="Images\herbal.jpg">
				<p>Herbal</p>
			</div>
			<div class="optiona">
				<img src="Images\hair-care.jpg">
				<p>Hair Care</p>
			</div>
			<div class="optiona">
				<img src="Images\personal-care.jpg">
				<p>Personal Care</p>
			</div>			
		</div>
	</div>
	<div class="ff">
		<button onclick="window.location.href='First-Aid'">FIRST AID</button>
		<button onclick="window.location.href='Health-Tips'">HEALTH TIPS</button>
	</div>
	<div class="lastsection">

	</div>
	<div class="copyright">
		<img src="Images\Copyright.png">
	</div>
	<div class="feedback">
	    <button onclick="window.location.href='feedback/'">Feedback</button>
	</div>		
	






</body>
</html>