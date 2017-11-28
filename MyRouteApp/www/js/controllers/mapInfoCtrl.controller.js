app.controller("mapInfoCtrl", function ($scope, mapsAPI, $cordovaGeolocation, uiGmapGoogleMapApi, uiGmapIsReady, mapSitAPI, messages,  config, generalFuncs, $cordovaToast){
    var myLatLng = {lat: 0, lng: 0};
    var myCenter = {latitude: myLatLng.lat, longitude: myLatLng.lng}
    var posOptions = {timeout: 20000, enableHighAccuracy: true};
    var map;
      
    $scope.map    = {center: myCenter};   
    $scope.markers = [];
    $scope.loggedUser = generalFuncs.getLoggedUser().login;
    
    document.addEventListener("deviceready", function(){
        uiGmapGoogleMapApi.then(function(googleMaps){ // Google Ready            
            // Initial position
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
                    var actualInfo =  new google.maps.InfoWindow();
                    
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
                    
                    // User click
                    google.maps.event.addListener(map, 'click', function(event){
                        var _lat = event.latLng.lat();
                        var _lng = event.latLng.lng();
                        var newInfo =  new google.maps.InfoWindow();
                        
                        // Marker
                        var msgSit = 'Enviar Situação';
                        var newMarker = addMarker({
                            title: msgSit,
                            position: {lat: _lat, lng: _lng},
                            map: map,
                            icon: config.googleImg + "library_maps.png"
                        });
                        
                        // InfoWindow
                        var infoContent = document.createElement("a");
                        var ta = document.createElement("textarea");
                        var select = document.createElement("select");
                        var selectOptions = [{value: "", text: "Selecione uma situação"}];
                        var divContent = document.createElement("div");
                        var divSit = document.createElement("div");
                        
                        ta.rows = 4;
                        ta.cols = 40;
                        ta.placeholder = "Descreva a situação...";
                        
                        infoContent.href = "javascript:void(0)";
                        infoContent.textContent = msgSit;
                        infoContent.setAttribute("class", "btn btn-primary btn-success btn-xs");
                        
                        google.maps.event.addDomListener(infoContent, 'click', function () {
                            if (select.value != ''){
                                createMapSit(_lat, _lng, ta.value, select.value, newMarker);
                            }else{
                                $cordovaToast.show("Selecione uma situação!", "long", "top");
                                if(select.value === '') select.focus();
                            }
                        });
                        
                        divSit.style["text-align"] = "left";
                        divSit.append("Situação:");
                        
                        // Fill selected element and finish HTML
                        mapSitAPI.getSits("all").then(function(sitRes){
                            $.each(sitRes.data, function(i, sit){
                                selectOptions.push({value: sit.id, text: sit.descricao});
                            });
                            
                            for (var i = 0; i < selectOptions.length; i++) {
                                var option = document.createElement("option");
                                option.value = selectOptions[i].value;
                                option.text = selectOptions[i].text;
                                select.appendChild(option);
                            }
                            select.style["width"] = "80%";
                            select.style["font-size"] = "16px";
                            select.style["margin-left"] = "10px";
                            
                            divSit.appendChild(select);
                        
                            divContent.appendChild(document.createElement("br"));
                            divContent.appendChild(ta);
                            divContent.appendChild(document.createElement("br"));
                            divContent.appendChild(document.createElement("br"));
                            divContent.appendChild(divSit);
                            divContent.appendChild(document.createElement("br"));
                            divContent.appendChild(document.createElement("br"));
                            divContent.append(infoContent);
                            divContent.appendChild(document.createElement("br"));
                        });
                        
                        newInfo.setContent(divContent);
                        mapsAPI.openClose(newInfo, map, newMarker);
                        
                        google.maps.event.addListener(newMarker, 'click', function() {
                            mapsAPI.openClose(newInfo, map, this);
                        });
                    }); // User Click
                }); // Map Object - Map Ready
            }, function(err) {
                console.error('Geolocation error ' + err.message);
            }); // $cordovaGeolocation
        }); // Google Ready
    }, false); // Device Ready
    
    // Functions    
    var createMapSit = function(lat, lng, desc, sitId, marker){  
        console.log('createMapSit ' + lat + ", " + lng + "| " + sitId);
        var active = 0;
        
        mapSitAPI.getMapSits("all").then(function(mapSitRes){
            var approximateRange = 20; // Meters
            var amountParam = 5; // Amount for a situation become a variable for the map
            var countParam = 0;
            var sitRegistered = false;
             
            // Iterate all mapSituations
            $.each(mapSitRes.data, function(i, mapsit){
                var dist = generalFuncs.haversineFormula(mapsit.latitude, mapsit.longitude, lat, lng);
                
                if (dist <= approximateRange){
                    if (mapsit.active == 1){
                        sitRegistered = true;
                        return false; // Leave iteration 
                    }else{
                        countParam++;
                    }
                }
            });
            
            if (sitRegistered){
                console.log("Situação já cadastrada!");
                marker.setMap(null);
                return false; // Don't insert
            }
            
            console.log("countParam " + countParam);
            if (countParam >= amountParam){
                active = 1;
            }
            
            insertMapSit();
        }).catch(function(res){
            console.error(messages.errorMapSitAPI);
            console.error(res);
        });
        
        
        var insertMapSit = function(){
            console.log("Active: " + active);  
            
            var jsonMapSit = {
                user_id: generalFuncs.getLoggedUser().id,
                situation_id: sitId,
                latitude: lat,
                longitude: lng, 
                description: desc,
                active: active
            }
            
            mapSitAPI.setMapSit(jsonMapSit).then(function(res){
                console.log('MapSit cadastrada com sucesso!');
                marker.setMap(null);            
            }).catch(function(res){
                console.error(messages.errorMapSitAPI);
                console.error(res);
            });
        };
    };
    
    var addMarker = function (json) {
        var marker = new google.maps.Marker(json);
        $scope.markers.push(marker);
        return marker;
    }
}); 