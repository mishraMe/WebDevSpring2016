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
            var existingUser = UserService.findUserByCredentials(user.username, user.password,
                function (response) {
                    if (response != null) {
                        $scope.message = "User already exists";
                        return;
                    }
                });

            var newUser = UserService.createUser(user, function (response) {
                if (response) {
                    $rootScope.currentUser = response;
                    UserService.setCurrentUser(response);
                    $location.url("/profile/");
                    UserService.findAllUsers(function(response){
                        console.log("the all users list is :" + response);
                    });
                }
                return null;
            });
        }

    }
})();