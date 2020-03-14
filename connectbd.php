<?php
//echo gogo;

?>
<?php
$user = 'root';
$password = 'root';
$db = 'BD';
$host = 'localhost';
$port = 3306;

$link = mysqli_connect($host, $user, $password, $db);
//if(empty($_POST[recherche]))
if (!$link) {
    die('Erreur de connexion');
}
?>