app.controller("menuCtrl", function ($scope, messages, generalFuncs){
    $scope.appName = messages.appName;
    $scope.loggedUser = generalFuncs.getLoggedUser().login;
});