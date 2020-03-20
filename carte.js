var mymap = L.map('mapid').setView([48.864716, 2.349014], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);



var button = document.getElementById("submit");
var resultats = document.getElementById("resultats");
var elForm = document.getElementById('track');
var recherche = null;
var polyline = null;

button.addEventListener('click', function(event){
    event.preventDefault();

    if (recherche === elForm.value & recherche != null) {
    	mymap.fitBounds(polyline.getBounds(), {paddingBottomRight: [350,0]});
    	return;
    }

    recherche = elForm.value;
  
    polyline = L.polyline([[]]);
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

		    mymap.fitBounds(polyline.getBounds(), {paddingBottomRight: [350,0]});
		    
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
		type: 'line',
		data: {
			labels: range(array.length),
			datasets: [{
				label: elForm.selectedOptions[0].innerText,
				backgroundColor: 'rgba(235, 235, 235, 0.6)',
				borderColor: 'rgb(235, 235, 235)',
				fontColor: '#fff',
				data: array,
				pointRadius: 1,
				pointBorderWidth: 0
			}]
		},
		options: {

			scales: {
	            yAxes: [{
	                ticks: {
	                    fontColor: '#fff'
	                },
	            }],
	          	xAxes: [{
	                ticks: {
	                    fontColor: '#fff'
	                },
	            }]
	        },
			legend: {
				labels: {
					fontColor: '#fff'
				}
			},
			hover: {
				mode: 'index',
				intersect: false },
			tooltips: {
				mode: 'index',
				intersect: false },
			onHover: (evt, array) => {
				if (typeof window.mark != "undefined" || window.mark != null){
					mymap.removeLayer(window.mark);
				}
				if (array[0] != undefined){
					window.mark = L.marker(list[array[0]._index]).addTo(mymap);
				}
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