app.controller("loginCtrl", function ($scope, messages,  userAPI, $location, $cordovaToast, generalFuncs){
    $scope.appName = messages.appName;
    
    $scope.isUser = function(login, password){
        userAPI.isUser(login, password).then(function(res){
            if (res.data){
                generalFuncs.setLoggedUser(res.data);
                $location.path("/menu");
            }else{ 
                $scope.password = '';
                $("#password").focus(); 
                console.error("Login/Senha incorreto(a)!");
                $cordovaToast.show("Login/Senha incorreto(a)!", "long", "top");
            } 
        });
    };
    
    $scope.goApp = function(){
        $location.path("/menu");
    };
});