module.exports = (obj) => {
	var str = "<html>";
	str += "<head><title>" + obj.user.name + "'s Page</title>"
	str += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'></head>";
	str += '<link rel="stylesheet" type="text/css" href="../../../public/css/user_home.css">'
	str += '<body><div class="container"><h1 id="hello">What\'s up ' + obj.user.name + '</h1><br>';
	str += '<div class="well">';
	str += '<h3>Favorite Veggie: ' + obj.profile.fav_veggie + '</h3>';
	str += '<h3>Favorite Fruit: ' + obj.profile.fav_fruit + '</h3>';
	str += '</div>';
	str += '<div class="well">';
	str += '<h2>Posts</h2>'
	/* call you postCreator(param) method here */
	str += '</div>'
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

function postCreator(posts){
	/* append your posts to the html here, you will have to loop */
}