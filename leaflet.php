<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="description" content="dom">
    <title> leaflet </title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
   <link rel="stylesheet" href="../Style.css">
   
</head>
<body>

    <div id="id"></div>
    
    <h1>Leaflet</h1>
    
    <div id="coords"></div>
    <div id="mapid"></div>

    <form action="#" method="get" id="adress">
        <fieldset>
        <p><input type="text" name="adress"></input></p>
        <p><input type="submit" name="valider" value="Valider"></p>
    </fieldset>
    </form>

    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
   <script src="leaflet.js"></script>
</body>