(function() {
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {

        var vm = this;
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {

            vm.error = null;
            if (user == null) {
                vm.err = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                vm.error = "Please provide a password";
                return;
            }
            if (user.password != user.verifyPassword) {
                vm.error = "Passwords must match";
                return;
            }
            if (!user.email) {
                vm.error = "Please provide an email address"
            }

            UserService
                .register(user)
                .then(function(createdUser){
                    if(createdUser.data) {
                        UserService.setCurrentUser(createdUser.data);
                        $location.url("/profile");
                    }
                });
        }
    }
    })();