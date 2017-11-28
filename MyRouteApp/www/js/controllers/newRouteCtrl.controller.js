app.controller("newRouteCtrl", function ($scope, uiGmapGoogleMapApi, uiGmapIsReady, $cordovaGeolocation,  messages, mapsAPI, mapSitAPI,  config, generalFuncs){
    var myLatLng = {lat: 0, lng: 0};
    var myCenter = {latitude: myLatLng.lat, longitude: myLatLng.lng}
    var posOptions = {timeout: 20000, enableHighAccuracy: true};
    var map;
    var rangeLimit = 100; // Meters
        
    $scope.map = {center: myCenter}; 
    $scope.myMarkers = [];  
    $scope.loggedUser = generalFuncs.getLoggedUser().login;
    
    document.addEventListener("deviceready", function(){
        uiGmapGoogleMapApi.then(function(googleMaps){ // Google Ready 
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position){ 
                myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
                $scope.map = { 
                    center: {latitude: myLatLng.lat, longitude: myLatLng.lng},
                    zoom: 17,
                    options: {
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true
                    }
                };
                
                // Map Object - Map Ready
                uiGmapIsReady.promise(1).then(function (instances){ 
                    map = instances[0].map;
                    var actualInfo =  new google.maps.InfoWindow({maxWidth: 200});
                    var directionsService = new google.maps.DirectionsService;
                    var directionsDisplay = new google.maps.DirectionsRenderer;
                    var geocoder = new google.maps.Geocoder;
                    
                    // Actual Location
                    var actualMarker = addMarker({
                        title: messages.actualLocation,
                        position: myLatLng,
                        map: map
                    });
                    actualInfo.setContent(messages.actualLocation);

                    google.maps.event.addListener(actualMarker, 'click', function() {
                        mapsAPI.openClose(actualInfo, map, actualMarker);
                    });
                    
                    // Search
                    $scope.findRoute = function(origin, destiny){
                        if (origin == undefined || origin == '' || destiny == undefined || destiny == ''){
                            origin = 'rua raimundo lof, 20';
                            destiny = 'casa dos açores, gravataí'; 
                        }
//                            return;
                        
                        // Trace Route
                        var request = mapsAPI.requestRoute(origin, destiny);
//                        request.waypoints = [{
//                            location: {lat: -29.940981, lng: -50.988464},
//                            stopover: false
//                        }];
//                        request.optimizeWaypoints = true;
                        directionsDisplay.setMap(map);
                        
                        directionsService.route(request, function(res, status) {
                            if (status === 'OK') {
                                // Clear all markers
                                $.each($scope.myMarkers, function(key, value){
                                    $scope.myMarkers[key].setMap(null);
                                });
                                $scope.myMarkers = [];

                                // Set formatted address
                                geocoder.geocode({'placeId': res.geocoded_waypoints[0].place_id}, function(results, status) {
                                    if (results[0])
                                        $scope.origin = results[0].formatted_address;
                                    else 
                                        console.error('Origin results FAIL');
                                });
                                geocoder.geocode({'placeId': res.geocoded_waypoints[1].place_id}, function(results, status) {
                                    if (results[0])
                                        $scope.destiny = results[0].formatted_address;
                                    else 
                                        console.error('Destiny results FAIL');
                                });

                                // SetDirections
                                directionsDisplay.setDirections(res);
                            }else{ 
                                console.error('directionsService FAIL [' + status + ']');
                            }
                            
                            // Show database markers
                            mapSitAPI.getMapSits("1").then(function(mapSitRes){
                                
                                var inRange;
                                // Iterate all mapSituations
                                $.each(mapSitRes.data, function(i, mapsit){
//                                    console.log(mapsit);
                                    inRange = false;
                                    
                                    // Iterate all the route's steps
                                    $.each(res.routes[0].overview_path, function(key, value){
//                                        console.log("Step " + (key + 1) + ": " + value.lat() + ", " + value.lng());
                                        var dist = generalFuncs.haversineFormula(value.lat(), value.lng(), mapsit.latitude, mapsit.longitude);
                                        
                                        if (dist <= rangeLimit){ 
                                            inRange = true;
                                            return false; // Leave iteration
                                        }
                                    });
                                    
                                    if (!inRange){ // Discard situations out of the range
                                        return true; // Skip iteration  
                                    }
                                    

                                    mapSitAPI.getSits("all").then(function(sitRes){
                                        $.each(sitRes.data, function(i, sit){
                                            if(sit.id == mapsit.situation_id){
                                                var markerIcon = (sit.status == "POS" ? "parking_lot_maps.png" : "info-i_maps.png");
                                                
                                                // Marker
                                                var newMarker = addMarker({
                                                    title: "Situação",
                                                    position: {
                                                        lat: mapsit.latitude, 
                                                        lng: mapsit.longitude
                                                    },
                                                    map: map,
                                                    icon: config.googleImg + markerIcon
                                                });

                                                // InfoWindow
                                                var divContent = document.createElement("div");
                                                divContent.append(sit.descricao)
                                                divContent.style["font-size"] = "16px";

                                                var newInfo =  new google.maps.InfoWindow({maxWidth: 200});
                                                newInfo.setContent(divContent);

                                                google.maps.event.addListener(newMarker, 'click', function() {
                                                    mapsAPI.openClose(newInfo, map, this);
                                                });
                                            }
                                        });
                                    });
                                });
                            }, function(err) {
                                console.error(messages.errorMapSitAPI);
                                console.error(err);
                            });
                        }); // Trace Route
                    }; // Search
                }); // Map Object - Map Ready
            }, function(err) {
                console.error('Geolocation error ' + err.message);
            }); // $cordovaGeolocation
        }); // Google Ready
    }); // Device Ready
    
    // Functions    
    var addMarker = function (json) {
        var marker = new google.maps.Marker(json);
        $scope.myMarkers.push(marker);
        return marker;
    }
    
});