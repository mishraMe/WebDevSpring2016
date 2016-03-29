(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("FollowController", followController)
    function followController($location, UserService) {

        console.log("entered the follow Controller on click");
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();
        vm.followers;
        vm.following;
        function init() {
                vm.error = null;
                vm.message = null;
                var followersForUser = [];
                var followingForUser = [];
                UserService
                    .findFollowInfoForUserById(vm.currentUser._id)
                    .then(function(resp){
                        console.log("entered the then part of findFOllowInfoFunction");
                        console.log("resp is ");
                        console.log(resp);
                        followersForUser = resp.data.followers;
                        vm.followers = followersForUser;
                        followingForUser = resp.data.following;
                        vm.following = followingForUser;
                    });
         }
        init();
    }
})();
