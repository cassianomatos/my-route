app.factory("mapSitAPI", function ($http, config){

    var _setMapSit = function(mapSit){
        return $http.post(config.baseUrl + "/api/insertMapSit", mapSit);    
    };
    
    var _getMapSits = function(active){
        return $http.get(config.baseUrl + "/api/getMapSits?active="+active);
    };
    
    var _getSits = function(status){
        return $http.get(config.baseUrl + "/api/getSits?status="+status);
    };
    
    var _setUserFeedback = function(userFeedback){
        return $http.post(config.baseUrl + "/api/insertUserFeedback", userFeedback);    
    }
    
    var _updtUserFeedback = function(userFeedback){
        return $http.post(config.baseUrl + "/api/updateUserFeedback", userFeedback);    
    }
    
    var _getUserFeedbacks = function(feedback){
        return $http.get(config.baseUrl + "/api/getUserFeedbacks?feedback="+feedback);
    };
    
    return {
        setMapSit: _setMapSit,
        getMapSits: _getMapSits,
        getSits: _getSits,
        setUserFeedback: _setUserFeedback,
        updtUserFeedback: _updtUserFeedback,
        getUserFeedbacks: _getUserFeedbacks
    };
});