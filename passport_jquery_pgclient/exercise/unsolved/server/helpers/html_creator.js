module.exports = (obj) => {
	var str = "<html>";
	str += "<head><title>" + obj.user[0].name + "'s Page</title>"
	str += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'></head>";
	str += '<link rel="stylesheet" type="text/css" href="../../../public/css/user_home.css">'
	str += '<body><div class="container"><h1 id="hello">What\'s up ' + obj.user[0].name + '</h1><br>';
	/* put the profile code here */
	str += '<div class="btn-group" role="group" aria-label="Basic example">'
	str += '<a id="home-button" href="/" type="button" class="btn btn-primary sign-buttons">';
	str += '<span class="glyphicon glyphicon-home" aria-hidden="true"></span>';
	str += '</a>';
	str += '<a id="logout-button" href="/sign-up" type="button" class="btn btn-danger sign-buttons">Logout</a>'
	str += '</div></div>';
	str += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>";
	str += "<script src='../../../public/js/user_home.js'></script>";
	str += "</body></html>";
	return str;
}