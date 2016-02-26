"use strict";
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
	function codeAddress(address, description, time, space, age, search) {
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
		    				content: "<p><strong>Party description:</strong> "
		    				 + description + "</p><p class='hide-party-location'><strong>Party Location:</strong> "
		    				  + address + "</p><p><strong>Time:</strong> " + time + "</p><p><strong>Guest Limit:</strong> "
		    				   + space + "</p><p><strong>Age Restriction:</strong> " + age + "</p>" + 
		    				   "<button id='attend-button' class='btn btn-primary btn-sm'>Attend</button>"
						});							

						// Open the window using our map and marker
						marker.addListener("click", function() {
							infowindow.open(map, marker);
						});

						// add data to side bar here
						$("#side-bar-data").append( "<div class='side-bar-border'><p><strong>Party description:</strong> "
		    				 + description + "</p><p class='hide-party-location'><strong>Party Location:</strong> "
		    				  + address + "</p><p><strong>Time:</strong> " + time + "</p><p><strong>Guest Limit:</strong> "
		    				   + space + "</p><p><strong>Age Restriction:</strong> " + age + "</p>" + 
		    				   "<button id='attend-button' class='btn btn-primary btn-sm'>Attend</button></div>");
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


	// FIREBASE
	var fireDB = new Firebase("https://partysync16.firebaseio.com/");

	fireDB.child("post-party").on("value", function(snapshot) {
	/*
		POST - host only
	*/ 
	$(document).ready(function() {
		$("#post-party-btn").click(function() {
			event.preventDefault();

			var address = $("#address").val();
			var description = $("#description").val();
			var age = $("#age").val();
			var guestMax = $("#guest-max").val();
			var time = $("#time").val();
			// Users input
			var data = {
				"address": address,
				"description": description,
				"ageRestriction": age,
				"guestLimit": guestMax,
				"time": time
			}
			// this will push data
			fireDB.child("post-party").push(data);
			console.log(data)
			console.log(snapshot.val());
		});

		/*
			GET - display each party info on the map when user searches location
		*/ 
		$("#map-address-btn").click(function() {
			event.preventDefault();	
			// User input address
			var address = $("#location-address").val();	
			// Call the codeAddress() function to place marker on input location
			codeAddress(address);		
			
			// Get the address from firebase and mark them on the map
			snapshot.forEach(function(data) {
				// console.log(data.val().address);
				var partyAddresses = data.val().address;
				var partyDescription = data.val().description;
				
				var partyTime = data.val().time;
				var guestSpace = data.val().guestLimit;
				var ageLimit = data.val().ageRestriction;

				// Call the codeAddress() function to place marker on each address
				codeAddress(partyAddresses, partyDescription, partyTime, guestSpace, ageLimit, address);
				
				// empties previous search result
				$("#side-bar-data").empty();
				$("#map-canvas").css("display", "inherit");
			});
		});
	});
});



