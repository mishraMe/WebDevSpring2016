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

    //function login(user){
    //    //  console.log("entered Login function in login controller");
    //    if(!user){
    //        return;
    //    }
    //    UserService
    //        .findUserByCredentials (user.username, user.password)
    //        .then(function(response){
    //            if(response!= null && response.data){
    //                UserService.setCurrentUser(response.data);
    //                $location.url("/profile");
    //            }
    //            else{
    //                vm.error =" Please Check Your Credentials";
    //            }
    //        });
    //}


        function login(user) {
            if(!user) {
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
                    }else{
                        vm.message="Please Check Your Credentials";
                    }
                });
        }
}
})();