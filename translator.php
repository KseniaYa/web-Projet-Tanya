<?php
include("connectbd.php");

$title = $_POST['title'];

$file = get_file_name_from_bd($title);

$xml_str = file_get_contents($file);
$xml = simplexml_load_string($xml_str);
$json = json_encode($xml);
$array = json_decode($json,TRUE);
echo $json;
//print_r ($array);

?>