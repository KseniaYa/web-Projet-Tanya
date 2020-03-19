<?php

    function get_file_name_from_bd($title){
        $user = 'ksenia';
        $password = 'kseniakse';
        $db = 'bd_gps_tracks';
        $host = 'localhost';
        $port = 3306;

        $link = mysqli_connect($host, $user, $password, $db);
            //if(empty($_POST[recherche]))
        if (!$link) {
            die('Erreur de connexion');
        } //else {echo "success ";}
        //echo "la ";

        /*$test = $_POST['title'];
        echo $test;*/

        //$variable=GET$_["track"];
        $requete = "SELECT * FROM information_gps WHERE title = \"".$title."\"";

        $result = mysqli_query($link, $requete);
            
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
               return $row["nom_fichier"];
                
            }
        }
        return NULL;
        //$text=$_GET['title'];
        //echo $text
    }
?>