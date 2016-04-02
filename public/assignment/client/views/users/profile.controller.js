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

        function update(user){
            vm.error = null;
            vm.message = null;
            console.log("user in update function is");
            UserService
                .updateUser(user._id, user)
                .then(function (response){
                    console.log("response is ");
                    console.log(response);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    });
        }
    }
})();