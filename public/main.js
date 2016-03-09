console.log("yoyo");

"use strict";
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> d7ef61dd1047620729774922cfdaade2275aae5d
	var geocoder;
	var map;
	
	// setup initial map
	function initialize() {
		geocoder = new google.maps.Geocoder();							
		var latlng = new google.maps.LatLng(29.423017, -98.48527);			
		var mapOptions = {												
			zoom: 10,
			center: latlng
		}
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}
	
	// function to geocode an address and plot it on a map
	function codeAddress(address, description, time, space, age, search, partyDate, email, phone) {


		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (description != undefined) {
					var index = results[0].formatted_address.toLowerCase().indexOf(search.toLowerCase());
					if (index != -1) {
						var marker = new google.maps.Marker({					
							map: map,
							position: results[0].geometry.location
						});
						
						console.log(address);
						console.log(results);
						
						var infowindow = new google.maps.InfoWindow({
		    				content: "<h4>Party Info:</h4>" + "<p><strong>Party description:</strong> " + description +
		    				 "</p><p><strong>Age Restriction:</strong> " + age + 
		    				 "</p><p><strong>Guest Limit:</strong> " + space + 
		    				 "</p><p><strong>Date:</strong> " + date + "</p><p><strong>Time:</strong> " 
		    				 + time + "</p>" + "<h4>Contact Host:</h4>" + "<p><strong>Email:</strong> " + email + "</p><p><strong>Phone Number:</strong> " 
		    				 + phone + "</p><p><strong>Address:</strong> " + address + "</p>"
						});							

						// Open the window using our map and marker
						marker.addListener("click", function() {
							infowindow.open(map, marker);
						});

						// add data to side bar here
						$("#side-bar-data").append( "<div class='side-bar-border'>" + "<h4>Party Info:</h4>" + "<p><strong>Party description:</strong> " + description +
		    				 "</p><p><strong>Age Restriction:</strong> " + age + 
		    				 "</p><p><strong>Guest Limit:</strong> " + space + 
		    				 "</p><p><strong>Date:</strong> " + date + "</p><p><strong>Time:</strong> " 
		    				 + time + "</p>" + "<h4>Contact Host:</h4>" + "<p><strong>Email:</strong> " + email + "</p><p><strong>Phone Number:</strong> " 
		    				 + phone + "</p><p><strong>Address:</strong> " + address + "</p></div>");
					}
				} else {
					map.setCenter(results[0].geometry.location);
				}		
<<<<<<< HEAD
=======

			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	
	}
	google.maps.event.addDomListener(window, 'load', initialize);


	// FIREBASE
	var fireDB = new Firebase("https://partysync16.firebaseio.com/");

	fireDB.child("post-party").on("value", function(snapshot) {
		console.log(snapshot.val());
	});

	$(document).ready(function() {	
		/*
			POST - host only
		*/ 
		$("#post-party-btn").click(function() {
			event.preventDefault();

			var address = $("#address").val();
			var description = $("#description").val();
			var age = $("#age").val();
			var guestMax = $("#guest-max").val();
			var time = $("#time").val();

			var date = $("#date").val();
			var email = $("#email").val();
			var phone = $("#phoneNumber").val();
			// Users input
			var data = {
				"address": address,
				"description": description,
				"ageRestriction": age,
				"guestLimit": guestMax,
				"time": time,
				"date": date,
				"email": email,
				"phone": phone
			}
			// this will push data
			fireDB.child("post-party").push(data);
			console.log(data)
			
		});

		/*
			GET - display each party info on the map when user searches location
		*/ 
		$("#map-address-btn").click(function() {
			event.preventDefault();	
			

		fireDB.child("post-party").on("value", function(snapshot) {
			// User input address
			var address = $("#location-address").val();	
			// Call the codeAddress() function to place marker on input location
			codeAddress(address);		
			
>>>>>>> d7ef61dd1047620729774922cfdaade2275aae5d
=======
var geocoder;
var map;

// setup initial map
function initialize() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(29.423017, -98.48527);
	var mapOptions = {
		zoom: 10,
		center: latlng
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	// Re-centers and displays map properly when modal is displayed
	$('#testModal').on('shown.bs.modal', function() {
		 var currentCenter = map.getCenter(); 
		 google.maps.event.trigger(map, "resize");
		 map.setCenter(currentCenter); 
	});

}

// function to geocode an address and plot it on a map
function codeAddress(address, description, time, space, age, search, email, phone) {

	geocoder.geocode( {'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (description != undefined) {
				var index = results[0].formatted_address.toLowerCase().indexOf(search.toLowerCase());
				if (index != -1) {
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
					console.log(address);
					console.log(results);

					var infowindow = new google.maps.InfoWindow({
					   	content: "<div class='info-window-text'>" + "<h4 style='text-decoration:underline;'>Party Info:</h4>" + "<p><strong>Party description:</strong> " + description +
					   	"</p><p><strong>Age Restriction:</strong> " + age + 
					   	"</p><p><strong>Guest Limit:</strong> " + space + 
					   	"</p><p><strong>Time:</strong> " 
					   	+ time + "</p>" + "<h4 style='text-decoration:underline;'>Contact Host:</h4>" + "<p><strong>Email:</strong> " + email + "</p><p><strong>Phone Number:</strong> " 
					   	+ phone + "</p>" + "<div>"
					});
					// Open the window using our map and marker
					marker.addListener("click", function() {
						infowindow.open(map, marker);
					});

					// displays only searched location parties.
					$("#side-bar-data").append( "<div class='side-bar-border'>" + "<h4 style='text-decoration:underline;'>Party Info:</h4>" + "<p><strong>Party description:</strong> " + description +
					   	"</p><p><strong>Age Restriction:</strong> " + age + 
					   	"</p><p><strong>Guest pmit:</strong> " + space + 
					   	"</p><p><strong>Time:</strong> " + time + "</p>" + "<h4 style='text-decoration:underline;'>Contact Host:</h4>" + "<p><strong>Email:</strong> " + email + "</p><p><strong>Phone Number:</strong> " 
					   	+ phone + "</p>" + "</div>");
				}
			} else {
				map.setCenter(results[0].geometry.location);
			}

		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
google.maps.event.addDomListener(window, 'load', initialize);
>>>>>>> 71ea4dd871f68b96d9d100c69bea98104b2f43f7

			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	
	}
	google.maps.event.addDomListener(window, 'load', initialize);

<<<<<<< HEAD

	// FIREBASE
	var fireDB = new Firebase("https://partysync16.firebaseio.com/");

	fireDB.child("post-party").on("value", function(snapshot) {
		console.log(snapshot.val());
	});

	$(document).ready(function() {	
		/*
			POST - host only
		*/ 
		$("#post-party-btn").click(function() {
			event.preventDefault();

			var address = $("#address").val();
			var description = $("#description").val();
			var age = $("#age").val();
			var guestMax = $("#guest-max").val();
			var time = $("#time").val();

			var date = $("#date").val();
			var email = $("#email").val();
			var phone = $("#phoneNumber").val();
			// Users input
			var data = {
				"address": address,
				"description": description,
				"ageRestriction": age,
				"guestLimit": guestMax,
				"time": time,
				"date": date,
				"email": email,
				"phone": phone
			}
			// this will push data
			fireDB.child("post-party").push(data);
			console.log(data)
			
		});

		/*
			GET - display each party info on the map when user searches location
		*/ 
		$("#map-address-btn").click(function() {
			event.preventDefault();	
			

		fireDB.child("post-party").on("value", function(snapshot) {
			// User input address
			var address = $("#location-address").val();	
			// Call the codeAddress() function to place marker on input location
			codeAddress(address);		
			
=======
// FIREBASE
var fireDB = new Firebase("https://partysync16.firebaseio.com/");

fireDB.child("post-party").on("value", function(snapshot) {
	console.log(snapshot.val());
	// displays "all parties" in side bar.
	snapshot.forEach(function(snap) {
		$("#side-bar-data").append( "<div class='side-bar-border'>" + "<h4 style='text-decoration:underline;'>Party Info:</h4>" + "<p><strong>Party description:</strong> " + snap.val().description +
		   	"</p><p><strong>Age Restriction:</strong> " + snap.val().age + 
		   	"</p><p><strong>Guest Limit:</strong> " + snap.val().space + 
		   	"</p><p><strong>Time:</strong> " 
		   	+ snap.val().time + "</p>" + "<h4 style='text-decoration:underline;'>Contact Host:</h4>" + "<p><strong>Email:</strong> " + snap.val().email + "</p><p><strong>Phone Number:</strong> " 
		   	+ snap.val().phone + "</p>" + "</div>");

	});
});

$(document).ready(function() {
	/*
		POST - host only
	*/ 
	$("#post-party-btn").click(function() {
		event.preventDefault();

		var address = $("#address").val();
		var description = $("#description").val();
		var age = $("#age").val();
		var guestMax = $("#guest-max").val();
		var time = $("#time").val();
		// var date = $("#date").val();
		var email = $("#email").val();
		var phone = $("#phoneNumber").val();
		// Users input
		var data = {
			"address": address,
			"description": description,
			"ageRestriction": age,
			"guestLimit": guestMax,
			"time": time,
			// "date": date,
			"email": email,
			"phone": phone
		}
		// this will push data to firebase
		fireDB.child("post-party").push(data);
		console.log(data)
		// alert user party has been posted
		alert("Event has been posted");
		// clear the inputs when sumbit button is clicked
		$("input").val("");
	});

	/*
		GET - display each party info on the map when user searches location
	*/ 
	$("#map-address-btn").click(function() {
	event.preventDefault();

		fireDB.child("post-party").on("value", function(snapshot) {
			// User input address
			var address = $("#location-address").val();
			// Call the codeAddress() function to place marker on input location
			codeAddress(address);
>>>>>>> 71ea4dd871f68b96d9d100c69bea98104b2f43f7
			// Get the address from firebase and mark them on the map
			snapshot.forEach(function(data) {
				// console.log(data.val().address);
				var partyAddresses = data.val().address;
				var partyDescription = data.val().description;
				var partyTime = data.val().time;
				var guestSpace = data.val().guestLimit;
				var ageLimit = data.val().ageRestriction;
<<<<<<< HEAD

				var partyDate = data.val().partyDate;
=======
>>>>>>> 71ea4dd871f68b96d9d100c69bea98104b2f43f7
				var email = data.val().email;
				var phone = data.val().phone;

				// Call the codeAddress() function to place marker on each address
<<<<<<< HEAD
				codeAddress(partyAddresses, partyDescription, partyTime, guestSpace, ageLimit, address, partyDate, email, phone);
				
				// empties previous search result
				$("#side-bar-data").empty();
				$(".side-bar").css("display", "inherit");
			});
		
		});
	});
});
<<<<<<< HEAD
=======



// Social Account User Authentication 

var myFirebaseRef = new Firebase("https://partysync2.firebaseio.com/");

	$('.btn-facebook').click(function(){
	var ref = new Firebase("https://partysync2.firebaseio.com");
	ref.authWithOAuthPopup("facebook", function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    $('.form-container').css('display', 'inherit');
	    $('.form-container').append("<img src='"+ authData.facebook.profileImageURL + "'>");
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
>>>>>>> d7ef61dd1047620729774922cfdaade2275aae5d
=======
				codeAddress(partyAddresses, partyDescription, partyTime, guestSpace, ageLimit, address, email, phone);
				// empties previous search result
				$("#side-bar-data").empty();
			});
		});
	});
}); // END OF $(document).ready().


>>>>>>> 71ea4dd871f68b96d9d100c69bea98104b2f43f7
