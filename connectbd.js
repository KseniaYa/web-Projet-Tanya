/*var e = document.getElementById("track");
e.addEventListener('submit', valider);*/

/*var e = document.addEventListener('submit', valider);
function valider(event){
    console.log('ok');
}
*/

var button = document.getElementById("submit");
var resultats = document.getElementById("resultats");
var elForm = document.getElementById('track');
var recherche = elForm.value;

button.addEventListener('click', function(event){
    event.preventDefault();
    /*var data = new FormData();*/
    recherche = elForm.value;
    
    var line = createLine();
    console.log(line);
    /*data.append('track', recherche);*/
    
});

//console.log(recherche);


function createLine() {
	var line = [];
	fetch('translator.php', {
	    method: 'post',
	    body: JSON.stringify({'title': recherche})
	  })

	    .then((result) => result.json())
	    .then((resultJSON) => {
	    	var data = resultJSON;
	    	//console.log(data);
	    	//console.log(data['Placemark']['LineString']['coordinates']);
		    data["Placemark"]["LineString"]["coordinates"].split(' ').forEach(
		        elem => {
		        var coordinates = elem.split(',');
		        line.push([parseFloat(coordinates[0]), 
		        			parseFloat(coordinates[1]), 
		        			parseFloat(coordinates[2])]);
		      }
		    )
		    resultats.innerHTML = line; 
    });	
	return line;
}




