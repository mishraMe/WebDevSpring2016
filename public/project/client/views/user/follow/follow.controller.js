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
        vm.$location = $location;
        var username = $routeParams.username;
        function init() {
                vm.error = null;
                vm.message = null;
                var followersForUser = [];
                var followingForUser = [];
            UserService
                .findUserByUsername(username)
                .then(function(resp) {
                    console.log(resp);
                    vm.user = resp.data;
                    vm.following = vm.user.following;
                    vm.followers = vm.user.followers;

                });
         }
        init();
    }
})();
