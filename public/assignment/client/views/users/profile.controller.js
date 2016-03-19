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
        console.log("currentuser give below:");
        console.log(vm.currentUser);
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
                        console.log(response.data);
                        UserService.setCurrentUser(vm.currentUser);
                        $location.url("/profile");
                    });

        }
    }
})();