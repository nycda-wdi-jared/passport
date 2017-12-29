module.exports = (obj) => {
	var str = "<html>";
	str += "<head><title>" + obj.user.name + "'s Page</title>"
	str += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>";
	str += '<link rel="stylesheet" type="text/css" href="../../../public/css/user_home.css"></head>'
	str += '<body><div class="container"><h1 id="hello">What\'s up ' + obj.user.name + '</h1><br>';
	str += '<h2>What!!!, a Pokemon table. No Way!</h2>';
	str += '<table class="table table-striped table-hover" style="width: 35%">';
	str += '<tr>';
	str += '<th>#</th>';
	str += '<th>Name</th>';
	str += '</tr>';
	str += createTable(obj.pokemon)
	str += "</table>";
	str += '<div class="btn-group" role="group" aria-label="Basic example">'
	str += '<a id="home-button" href="/" type="button" class="btn btn-primary sign-buttons">';
	str += '<span class="glyphicon glyphicon-home" aria-hidden="true"></span>';
	str += '</a>';
	str += '<a id="logout-button" type="button" class="btn btn-danger sign-buttons">Logout</a>'
	str += '</div></div>';
	str += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>";
	str += "<script src='../../../public/js/user_home.js'></script>";
	str += "</body></html>";
	return str;
}

const createTable = (pokemon) => {
	var str = "";
	for(var i = 0; i < pokemon.length; i++){
		str += '<tr><td>' + (i + 1) + '</td><td>' + pokemon[i].name + '</td></tr>';
	}
	return str;
}