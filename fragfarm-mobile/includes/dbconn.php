<?php
  $mysqli = mysqli_connect("localhost", "suyeonn", "Hh0468139@", "suyeonn") or
             die("Connection failed: " . mysqli_connect_error());
    mysqli_select_db($mysqli, "suyeonn");
?>
