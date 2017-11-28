app.config(function ($routeProvider){
	$routeProvider.when("/login", {
		templateUrl: "view/login.html",
		controller: "loginCtrl"
	});
    
    $routeProvider.when("/menu", {
		templateUrl: "view/menu.html",
		controller: "menuCtrl"
	});

	$routeProvider.when("/mapInfo", { 
		templateUrl: "view/mapInfo.html",
		controller: "mapInfoCtrl"
	});
    
    $routeProvider.when("/newRoute", { 
		templateUrl: "view/newRoute.html",
		controller: "newRouteCtrl"
	});
    
    $routeProvider.when("/userFeedback", { 
		templateUrl: "view/userFeedback.html",
		controller: "userFeedbackCtrl"
	});

	$routeProvider.otherwise({redirectTo: "/login"});
});