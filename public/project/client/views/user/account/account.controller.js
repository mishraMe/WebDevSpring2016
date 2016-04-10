(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("AccountController", accountController)
    function accountController($location, UserService, $routeParams){
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.listFollowing = listFollowing;
        vm.listFollowers = listFollowers;
        vm.currentUser= UserService.getCurrentUser();
        var userId = $routeParams.userId;
        var username = $routeParams.username;


        console.log("userId in account is "+ userId);

       function init(){
           UserService
               .findUserById(userId)
               .then(function(userFound){
                   console.log("userFound is " );
                   console.log(userFound);
                   vm.user = userFound.data;
               })

           UserService
               .findUserByUsername(username)
               .then(function(userFound){
                   console.log("userFound is " );
                   console.log(userFound);
                   vm.user = userFound.data;
               })
       }
        init();

        function listFollowing(user){
            $location.url("/following/" + user._id);
        }

        function listFollowers(user){
            $location.url("/followers/" + user._id);
        }
    }
})();