$(document).ready(function(){

	$('#logout-button').on('click', function(e){
		e.preventDefault();
		
		$.ajax({
			method: 'DELETE',
			url: '/api/logout-user'
		}).then(function(res){
			window.location.href = "/"
		});
	});

});