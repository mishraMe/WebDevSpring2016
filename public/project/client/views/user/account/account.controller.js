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
        vm.followUnfollowUser = followUnfollowUser;
        vm.currentUser= UserService.getCurrentUser();
        var currentUser = vm.currentUser;
        console.log("value of currentUser is ");
        console.log(currentUser);
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

        function followUnfollowUser(accountUser, currentUser){
            if (accountUser.follow == 'follow'){
                accountUser.follow = 'unfollow';
                followUser(currentUser);
            }
            else{
                accountUser.follow = 'follow';
                unFollowUser(currentUser);
            }
        }

        function followUser(currentUser){
            UserService
                .addUserToFollowers(username, currentUser)
                .then(function(userAddedToFollowing){
                    console.log("follow successfully");
                });
        }

        function unFollowUser(currentUser){
            UserService
                .removeUserFromFollowers(username, currentUser)
                .then(function(removedUserFromFollowers){
                    console.log("unfollowSuccessfully");
                });
        }
    }
})();