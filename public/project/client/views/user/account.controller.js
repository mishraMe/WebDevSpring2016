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
        var username = $routeParams.username;
        vm.currentUser= UserService.getCurrentUser();
        console.log("username is " + username);
        console.log("userId in account is "+ userId);

       function init(){
           UserService
               .findUserByUsername(username)
               .then(function(userFound){
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