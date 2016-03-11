(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $scope, $location){
        $scope.login = login;
        $scope.message = null;

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


            UserService.findUserByCredentials
            (user.username, user.password, callback);

        }
    }
})();