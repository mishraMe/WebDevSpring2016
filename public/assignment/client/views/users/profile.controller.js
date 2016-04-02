(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController)
    function profileController($location, UserService){
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.currentUser= UserService.getCurrentUser();
        console.log("current user is ");
        console.log(vm.currentUser);
        if(!vm.currentUser){
            $location.url("/home");
        }
        vm.update = update;

        var emails = [];
        emails.push(vm.currentUser.emails);
        vm.currentUser.emails=emails;

        function update(user){
            vm.error = null;
            vm.message = null;
            UserService
                .updateUser(user._id, user)
                .then(
                    function (response){
                        UserService.setCurrentUser(vm.currentUser);
                        vm.message = "User updated successfully";
                        $location.url("/profile");
                    });
        }

    }
})();