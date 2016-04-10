(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("FollowController", followController)
    function followController($location, UserService, $routeParams) {

        console.log("entered the follow Controller on click");
        var vm = this;
        vm.error = null;
        vm.message = null;
        var userId = $routeParams.userId;
        console.log("user Id is " + userId);
        function init() {
                vm.error = null;
                vm.message = null;
                var followersForUser = [];
                var followingForUser = [];
            UserService
                .findUserById(userId)
                .then(function(resp) {
                    vm.user = resp.data;
                    UserService
                        .findFollowInfoForUserById(vm.user._id)
                        .then(function (resp) {
                            followersForUser = resp.data.followers;
                            vm.followers = followersForUser;
                            followingForUser = resp.data.following;
                            vm.following = followingForUser;
                        });
                });
         }
        init();
    }
})();
