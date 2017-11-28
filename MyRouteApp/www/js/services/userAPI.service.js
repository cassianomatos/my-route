app.factory("userAPI", function($http, config){
    var _isUser = function(login, password){
        return $http.get(config.baseUrl + "/api/isUser?login="+login+"&password="+password);    
    };
    
    return{
        isUser: _isUser
    };
});