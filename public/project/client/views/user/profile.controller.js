(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("ProfileController", profileController)
    function profileController($location, UserService){
        var vm = this;
        vm.error = null;
        vm.message = null;
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
    }
})();