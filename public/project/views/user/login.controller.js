//login.controller.js no changes just comment
(function(){

    "use strict";
    angular
        .module("WritersClubApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $scope, $location){
        $scope.login= login;

        var callback=
            function(response) {
                if (response) {
                    console.log(response);
                    $rootScope.currentUser = response;
                    UserService.setCurrentUser(response);
                    $location.url("/account");
                }
            }

        function login(user){

            var user = UserService.findUserByCredentials
            (user.username, user.password, callback);
        }
    }
})();