(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $location, $rootScope, UserService) {

        $scope.register= register;

        function register(user) {

            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifyPassword) {
                $scope.message = "Passwords must match";
                return;
            }
            if(user.email!= user.email){
                $scope.message = "Email already exists";
            }
            var callback=
                function (response) {
                    if (response != null) {
                    $scope.message = "user already exists";
                    return;
                }
            };

            var existingUser = UserService.findUserByCredentials
            (user.username, user.password,callback);

            var callbackNewUser =
                function (response) {
                    if (response) {
                    $rootScope.currentUser = response;
                    UserService.setCurrentUser(response);
                    $location.url("/profile/");
                    }
                return null;
            };
            var newUser = UserService.createUser(user, callbackNewUser);
        }
    }
})();