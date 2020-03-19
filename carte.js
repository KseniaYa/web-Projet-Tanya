var mymap = L.map('mapid').setView([48.864716, 2.349014], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);



var button = document.getElementById("submit");
var resultats = document.getElementById("resultats");
var elForm = document.getElementById('track');
var recherche = elForm.value;

button.addEventListener('click', function(event){
    event.preventDefault();

    recherche = elForm.value;

	//document.location.href = "#recherche=" + recherche; 
/*	$.ajax({
	          type:"GET",
	          url : "connectbd.php?recherche=",
	          data:{'recherche':recherche}
	});*/
    
    var polyline = L.polyline([[]]);
    polyline.addTo(mymap);
    createLine(polyline);

  
});



function createLine(polyline) {
    const formData = new FormData();
    formData.append('title', recherche);
	fetch('translator.php', {
	    method: 'post',
	    body: formData
	  })

	    .then((result) => result.json())
	    .then((resultJSON) => {
	    	var data = resultJSON;
	    	var altitudes = [];
	    	var line = [];
	    	data["Placemark"]["LineString"]["coordinates"].split(' ').forEach(
		        elem => {
		        var coordinates = elem.split(',');
		        altitudes.push(parseFloat(coordinates[2]));
		        var point = [parseFloat(coordinates[1]), 
		        			parseFloat(coordinates[0])];
		        line.push(point);
		        polyline.addLatLng(point);
			    
		      }
		    )
		    //polyline.addTo(mymap);
		    mymap.fitBounds(polyline.getBounds());
		    /*resultats.innerHTML = */
		    
		    drawProfile(altitudes, line); 
    });
	
}


function drawProfile(array, list){
	var canvas = document.getElementById('resultats');
	var ctx = canvas.getContext('2d');

	if (typeof window.chart != "undefined" || window.chart != null){
		window.chart.destroy();
	}

	window.chart = new Chart(ctx, {
		// type de graphique
		type: 'line',
		// les données
		data: {
			labels: range(array.length),
			datasets: [{
				label: 'Rando',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: array
			}]
		},
		// Les options du graphique
		options: {
			hover: {
				mode: 'index',
				intersect: false },
			tooltips: {
				mode: 'index',
				intersect: false },
			onHover: (evt, array) => {
				//console.log(evt);
				if (typeof window.mark != "undefined" || window.mark != null){
					/*console.log('ttt');*/
					mymap.removeLayer(window.mark);
				}
				window.mark = L.marker(list[array[0]._index]).addTo(mymap);
			/* lors du survol
			evt = l’evenement
			array = un tableau d’objet survolé 
			(un seul objet dans notre cas)
			array[0]._index = indice de l’objet 
			survolé (sa position dans le tableau des
			points)*/
			}
		}
	});

}

function range(n) {
	list = [];
	for (var i=0; i < n; i++){
		list.push(i);
	}
	return list;
}