(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){
       // console.log("entered Login Controller");
        var vm = this;
        vm.login = login;
        vm.message = null;
        function init(){

        }
        init();

        function login(user){
          //  console.log("entered Login function in login controller");
            if(!user){
                return;
            }
            UserService
                .findUserByCredentials (user.username, user.password)
                .then(function(response){
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                       $location.url("/profile");
                    }
                });
        }
    }
})();