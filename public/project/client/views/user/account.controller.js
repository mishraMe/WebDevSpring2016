(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("AccountController", accountController)
    function accountController($location, UserService, $routeParams){
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.currentUser= UserService.getCurrentUser();
        var userId = $routeParams.userId;
        console.log("userId in account is "+ userId);

       function init(){
           UserService
               .findUserById(userId)
               .then(function(userFound){
                   console.log("userFound is " );
                   console.log(userFound);
                   vm.user = userFound.data;
               })
       }
        init();
    }
})();