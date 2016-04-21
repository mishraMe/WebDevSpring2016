(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){
        // console.log("entered Login Controller");
        var vm = this;
        vm.login = login;
        vm.message = null;
        vm.error = null;
        function init(){

        }
        init();

        function login(user) {
            if(!user) {
                vm.error = "Please provide the credentials"
                return;
            }
            if(!user.username){
                vm.error = "Please provide a username"
                return;
            }

            if(!user.password){
                vm.error = "Please provide a password"
                return;
            }
            UserService.login(user)
                .then(function(response){
                    if(response.data) {
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        console.log("setUCrrentUserIn loginUserservice is ");
                        console.log(response.data);
                        $location.url("/profile");
                    }
                }, function(err){
                    vm.error ="Please Check Your Credentials";
                });
        }
}
})();