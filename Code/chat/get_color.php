<?php 
// the name of the image file 
$imgfile='palette.png'; 
// load the image file 
$img=imagecreatefrompng($imgfile); 
// obtain the coordinates of the point clicked by the user 
$offsetx=$_GET['offsetx']; 
$offsety=$_GET['offsety']; 
// get the clicked color 
$rgb = ImageColorAt($img, $offsetx, $offsety); 
$r = ($rgb >> 16) & 0xFF; 
$g = ($rgb >> 8) & 0xFF; 
$b = $rgb & 0xFF; 
// return the color code 
printf('#%02s%02s%02s', dechex($r), dechex($g), dechex($b)); 
?>