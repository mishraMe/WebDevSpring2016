(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("ProfileController", profileController)

    function profileController($location, UserService){
                var vm = this;
                vm.error = null;
                vm.message = null;
                vm.update = update;
                vm.listFollowing = listFollowing;
                vm.listFollowers = listFollowers;


                function init(){

                    UserService
                            .getCurrentUser()
                            .then(function(response){
                              vm.currentUser = response.data;
                    });
        }
        init();

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
            $location.url("/following/" + user.username);
        }

        function listFollowers(user){
            $location.url("/followers/" + user.username);
        }
    }
})();