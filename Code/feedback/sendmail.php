<?php
  $email = $_REQUEST['email'] ;
  $message = $_REQUEST['message'] ;

  mail( "admin_email_id@mediclick.com", "Feedback of MediClick",
    $message, "From: $email" );
  header( "Location: ../" );
?>
