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
        var currentUser = vm.currentUser;
        var username = $routeParams.username;

       function init(){
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
            $location.url("/following/" + user.username);
        }

        function listFollowers(user){
            $location.url("/followers/" + user.username);
        }

        function followUser(currentUser){
            UserService
                .addUserToFollowers(user)
                .then(function(userAddedToFollowing){
                    console.log("follower created successfully");
                });
        }
    }
})();