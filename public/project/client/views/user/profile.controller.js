(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("ProfileController", profileController)
    function profileController($location, UserService){
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.listFollowing = listFollowing;
        vm.listFollowers = listFollowers;
        vm.currentUser= UserService.getCurrentUser();
        if(!vm.currentUser){
            $location.url("/home");
        }
               vm.update = update;
        function update(user){
            vm.error = null;
            vm.message = null;
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(
                    function (response){
                        UserService.setCurrentUser(vm.currentUser);
                        vm.message = "User updated successfully";
                        $location.url("/profile");
                    });
        }

        function listFollowing(user){
            $location.url("/following/" + user._id);
        }

        function listFollowers(user){
            $location.url("/followers/" + user._id);
        }
    }
})();