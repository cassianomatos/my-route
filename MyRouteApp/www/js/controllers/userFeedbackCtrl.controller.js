app.controller("userFeedbackCtrl", function ($scope, messages, $cordovaToast, generalFuncs, mapSitAPI){
    $scope.appName = messages.appName;
    $scope.showSend = true;
    $scope.loggedUser = generalFuncs.getLoggedUser().login;
    
    var ctx         = $(".line-chart"),
        graph       = '',
        userAlready = false,
        userUpdate  = false;
    
    var montaGraph = function(){
        var ruim = 0,
            med  = 0,
            otm  = 0;
        
        mapSitAPI.getUserFeedbacks("all").then(function(res){
            $.each(res.data, function(i, userFeedback){
                // Verify User Feedback
                if (userFeedback.user_id == generalFuncs.getLoggedUser().id){
                    userAlready = true;
                }
                
                if(userFeedback.feedback === 0){
                    ruim++;
                }else if(userFeedback.feedback === 1){
                    med++;
                }else if(userFeedback.feedback === 2){
                    otm++;
                }
            });
            
            if(userAlready){
                $("#div_graph").css("display", "block");
                $("#div_user_feedback").css("display", "none");
                
                var graphJson = {
                    type: 'doughnut',
                    data: {
                        labels: ["Ruim","Média","Ótima"],
                        datasets: [{
                            data: [ruim, med, otm],
                            backgroundColor: ["#D81010","#D5DC10","#18BB3D"],
                        }]
                    },
                    options: {
                        animation: {
                            animateScale: true
                        }
                    }
                }

                graph = new Chart(ctx, graphJson);
                $scope.showSend = false;
            }else{
                $("#div_graph").css("display", "none");
            }
        }).catch(function(res){
            console.error(messages.errorMapSitAPI);
            console.error(res);
        });
    };
    
    $scope.doGraph = function(){
        var radValue   = $("input[name='rad_ops']:checked").val(),
            radChecked = $("input[name='rad_ops']:checked").length;

        if(radChecked == 0){
            console.log('User ID ' + generalFuncs.getLoggedUser().id);
            console.error("Selecione uma opção!");
            $cordovaToast.show("Selecione uma opção!", "long", "top");
        }else{ // Insert UserFeedback
            var jsonUserFeedback = {
                user_id: generalFuncs.getLoggedUser().id,
                feedback: radValue,
                description: $("#ta_desc").val()
            }

            if(!userUpdate){
                mapSitAPI.setUserFeedback(jsonUserFeedback).then(function(res){
                    console.log('UserFeedback cadastrado com sucesso!');
                    montaGraph();
                }).catch(function(res){
                    console.error(messages.errorMapSitAPI);
                    console.error(res);
                });      
            }else{
                mapSitAPI.updtUserFeedback(jsonUserFeedback).then(function(res){
                    console.log('UserFeedback alterado com sucesso!');
                    montaGraph();
                }).catch(function(res){
                    console.error(messages.errorMapSitAPI);
                    console.error(res);
                });
            }
        }
    };
    
    $scope.doAgain = function(){
        $scope.showSend = true;
        graph.destroy();
        
        $("#div_graph").css("display", "none");
        $("#div_user_feedback").css("display", "block");
        
        $("#ta_desc").val('');
        $("input[name='rad_ops']").prop('checked', false);
        
        userUpdate = true;
    }
    
    montaGraph();
    
    $("#ta_desc").val('');
    $("#ta_desc").css("font-weight", "normal");
});