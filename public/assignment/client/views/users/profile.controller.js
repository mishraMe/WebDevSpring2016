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

            var userId = user._id;
            delete user._id;
            console.log("user in update function is");

            UserService
                .updateUser(userId, user)
                .then(function (response){
                    console.log("response is ");
                    console.log(response);
                    vm.message = "User updated successfully"
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    });
        }

    }
})();