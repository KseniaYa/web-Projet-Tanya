//var mymap = L.map('mapid').setView([51.505, -0.09], 13);
var mymap = L.map('mapid').setView([0, 0], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
    [51.5115, -0.04]
]).addTo(mymap);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

/*var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

*/
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}




let coords = document.getElementById('coords');

navigator.geolocation.getCurrentPosition(onPosition);
    
mymap.on('mousemove', onMouseMove);
    
function onPosition (position){
    let coords = [position.coords.latitude,position.coords.longitude];
    L.marker(coords).bindPopup('Ici !').addTo(mymap);
    mymap.setView(coords, 15);

}
function onMouseMove (event){
    //console.log(event);
    coords.innerHTML=event.latlng.lat+'/'+event.latlng.lng;
    let mouse={x:event.originalEvent.clientX+10, y:event.originalEvent.clientY};
    console.log(mouse);
    
    coords.style.transform='translate('+mouse.x+'px,'+mouse.y+'px)';

}


/*var data = new FormData();
data.append('nom', 'toto');
data.append('prenom', 'tata');

fetch('page.php', {
  method: 'post',
  body: data
})
.then(function (result) {
    // retourne le résultat binaire en text
    return result.json();
})
.then(function (result) {
    // result (le résultat au format texte)
    // par ex, on l’intègre brut dans la page
    document.getElementById('id').innerHTML = result;
})*/

/*var data = new FormData();
data.append('nom', 'toto');
data.append('prenom', 'tata');

fetch('page.php', {
  method: 'post',
  body: data
})
.then(function (result) {
    // retourne le résultat binaire en text
    return result.json();
})
.then(function (result) {
    // result (le résultat au format texte)
    // par ex, on l’intègre brut dans la page
    document.getElementById('id').innerHTML = result;
})


let elForm = document.getElementById('adress');
elForm.addEventListener('submit', valider);

let champ_coordonne = elForm.elements["nom"];
let champ_prenom = elForm.elements["prenom"];
let champ_telephone = elForm.elements["telephone"];
let champ_email = elForm.elements["mail"];
event.preventDefault();*/


let elForm = document.getElementById('adress');
elForm.addEventListener('submit', validation);

let champ_adress = elForm.elements["adress"];

let markers = L.featureGroup().addTo(mymap);

function validation (event){
    event.preventDefault();
    
    let url = 'http://api-adresse.data.gouv.fr/search/?q='+champ_adress.value;
    fetch(url)
    .then(function(result){
    return result.json();
    })
    .then(function (json) {
        markers.clearLayers();
        json.features.forEach(function(feature){
            L.marker(feature.geometry.coordinates.reverse())
            .bindPopup(feature.properties.label+'|'+feature.properties.context)
            .addTo(markers);
        });
        let markersBounds=markers.getBounds();
        mymap.fitBounds(markersBounds);

    });
}
