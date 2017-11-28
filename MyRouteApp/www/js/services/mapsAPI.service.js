app.factory("mapsAPI", function($http, config, $cordovaGeolocation) {
    var _requestRoute = function(origin, destiny){
        return {
            origin: origin,
            destination: destiny,
            travelMode: 'WALKING', 
            unitSystem: 0 //Metric
        };
    };
    
    var _openClose = function(info, map, marker){
        if (!info.isOpen())
            info.open(map, marker);    
        else
            info.close();
    };
    
    return{ 
        requestRoute: _requestRoute,
        openClose: _openClose
    };
}); 