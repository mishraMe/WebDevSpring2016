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

            vm.message = null;
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.verifyPassword) {
                vm.message = "Passwords must match";
                return;
            }
            if(user.email!= user.email){
                vm.message = "Email already exists";
            }

            //var existingUser = UserService.findUserByUsername(user.username);
            //if (existingUser) {
            //    vm.message = "User already exists";
            //    return;
            //}

                UserService
                    .createUser(user)
                    .then(function(response){
                        var data = response.data;
                      //  console.log("response.data is");
                      //  console.log(response.data);
                        if(data != null) {
                            UserService.setCurrentUser(user);
                            $location.url("/profile");
                        }
                    });
            }
        }
})();