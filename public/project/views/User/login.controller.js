(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $scope, $location){
        $scope.login= login;

        function login(user){
            var callback=
                function(response) {
                    if (response) {
                        console.log(response);
                        $rootScope.currentUser = response;
                        UserService.setCurrentUser(response);
                        $location.url("/profile");
                    }
                }

            var user = UserService.findUserByCredentials
            (user.username, user.password, callback);
        }
    }
})();