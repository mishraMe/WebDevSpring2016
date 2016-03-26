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

            vm.err = null;
            if (user == null) {
                vm.err = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.err = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                vm.err = "Please provide a password";
                return;
            }
            if (user.password != user.verifyPassword) {
                vm.err = "Passwords must match";
                return;
            }
            if (!user.email) {
                vm.err = "Please provide an email address"
            }

            UserService
                .findUserByUsername(user.username)
                .then(function (foundUser) {
                    if (foundUser.data == "") {
                        createUser(user);
                    } else {
                        vm.message = "User exists already"
                    }
                });

            function createUser(newUser){
                UserService
                    .createUser(newUser)
                    .then(function(createdUser){
                        UserService.setCurrentUser(createdUser.data);
                        $location.url("/profile");
                    })
            }
        }
    }
})();