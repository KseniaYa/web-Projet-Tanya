<!DOCTYPE html> 
<html>
<head>
    <meta charset="UTF-8">
    <title>Where is your altitude</title>
    
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
   <link rel="stylesheet" href="style_all.css">
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.css" integrity="sha256-IvM9nJf/b5l2RoebiFno92E5ONttVyaEEsdemDC6iQA=" crossorigin="anonymous" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css" integrity="sha256-aa0xaJgmK/X74WM224KMQeNQC2xYKwlAt08oZqjeF0E=" crossorigin="anonymous" />
   <?php include("connectbd.php"); ?>
</head>

<header>
  <div>
    <h3 class="text">Quelle direction choisissez-vous ?</h3>
    <form action="#" method="get" id="tracking">
      <fieldset>
        <div class="flex-container">
          <div>
            <select id="track" class="custom-button leaflet-control-zoom leaflet-control">
              <option value="Track 1">Tour de la Dent d'Oche</option>
              <option value="Track 2">Brèche S Le Pain de Sucre</option>
            </select>
          </div>
          <div>
            <input id="submit" class="custom-button leaflet-control-zoom leaflet-control" type="submit" name="ok" value="C'est parti !" onclick=openPopup()>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</header>

<body>    
    <div id="mapid"></div>
    <!-- <div id="resultats"></div> -->
    <!-- <canvas id="resultats" width="400" height="400"></canvas> -->
     <div id="hover-popup-window" class="hover-popup-window">
        <span class="helper"></span>
        <div>
            <div class="popupCloseButton" onclick=closePopup()>&times;</div>
            <canvas id="resultats"></canvas>
        </div>
      </div>
      <script>
          function openPopup() {
              popup_window = document.getElementById("hover-popup-window");
              popup_window.style.display = "inline-block";
          }
          function closePopup() {
              popup_window = document.getElementById("hover-popup-window");
              popup_window.style.display = "none";
          }
      </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
   <script src="carte.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js" integrity="sha256-nZaxPHA2uAaquixjSDX19TmIlbRNCOrf5HO1oHl5p70=" crossorigin="anonymous"></script>
</body>
</html> 