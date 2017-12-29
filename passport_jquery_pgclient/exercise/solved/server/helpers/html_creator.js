module.exports = (obj) => {
	var str = "<html>";
	str += "<head><title>" + obj.user[0].name + "'s Page</title>"
	str += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>";
	str += '<link rel="stylesheet" type="text/css" href="../../../public/css/user_home.css"></head>'
	str += '<body><div class="container"><h1 id="hello">What\'s up ' + obj.user[0].name + '</h1><br>';
	str += '<div class="well">';
	str += '<h3>Favorite Movie: ' + obj.profile[0].fav_movie + '</h3>';
	str += '<h3>Favorite Song: ' + obj.profile[0].fav_song + '</h3>';
	str += '<h3>Favorite Pizza: ' + obj.profile[0].fav_pizza + '</h3>';
	str += '</div>';
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