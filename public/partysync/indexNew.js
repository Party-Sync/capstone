console.log("yoyo");

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
                        // Get the address from firebase and mark them on the map
                        snapshot.forEach(function(data) {
                                // console.log(data.val().address);
                                var partyAddresses = data.val().address;
                                var partyDescription = data.val().description;
                                var partyTime = data.val().time;
                                var guestSpace = data.val().guestLimit;
                                var ageLimit = data.val().ageRestriction;
                                var email = data.val().email;
                                var phone = data.val().phone;

                                // Call the codeAddress() function to place marker on each address
                                codeAddress(partyAddresses, partyDescription, partyTime, guestSpace, ageLimit, address, email, phone);
                                // empties previous search result
                                $("#side-bar-data").empty();
                        });
                });
        });
// Social Account User Authentication

var myFirebaseRef = new Firebase("https://partysync2.firebaseio.com/");

        $('.btn-facebook').click(function(){
        var ref = new Firebase("https://partysync2.firebaseio.com");
        ref.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $("#register").modal('hide')
            $('.hostParty, .attendParty').css('display', 'inherit');
            $('.signUp').css('display', 'none');
            $('.form-container').css('display', 'inherit');
            $('ul').append("<div class='profileWelcome'><span>Welcome " + authData.facebook.displayName + "</span><img src='"+ authData.facebook.profileImageURL + "' class='profilePic'></div>");
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
            $("#register").modal('hide')
            $('.hostParty, .attendParty').css('display', 'inherit');
            $('.signUp').css('display', 'none');
            $('ul').append("<div class='profileWelcome'><span>Welcome " + authData.twitter.displayName + "</span><img src='" + authData.twitter.profileImageURL + "' class='profilePic'></div>");
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
            $("#register").modal('hide');
            $('.hostParty, .attendParty').css('display', 'inherit');
            $('.signUp').css('display', 'none');
            $('ul').append("<div class='profileWelcome'><span>Welcome " + authData.google.displayName + "</span><img src='" + authData.google.profileImageURL + "' class='profilePic'></div>");
          }
        });
        });

}); // END OF $(document).ready().

