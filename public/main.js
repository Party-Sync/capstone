// Social Account User Authentication 

	var myFirebaseRef = new Firebase("https://partysync2.firebaseio.com/");

	$('.btn-facebook').click(function(){
	var ref = new Firebase("https://partysync2.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    $('body').append("<img src='"+ authData.facebook.profileImageURL + "'>");
	    // $('.modal-dialog');  ---Need to find a way to dismiss the modal here.
	  }
	});
	});

	$('.btn-twitter').click(function(){
		var ref = new Firebase("https://partysync2.firebaseio.com");
	ref.authWithOAuthPopup("twitter", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);

	  }
	});
	});

	$('.btn-google').click(function(){
		var ref = new Firebase("https://partysync2.firebaseio.com");
		ref.authWithOAuthPopup("google", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	});
	});
