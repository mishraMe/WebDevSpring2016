(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
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
            }else {

                UserService
                    .createUser(user)
                    .then(
                    function(response) {
                        var user = response.config.data;
                        console.log(user);
                        if(user != null) {
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );

            }
        }
    }
})();