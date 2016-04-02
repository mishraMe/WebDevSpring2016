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

        //function update(user){
        //    vm.error = null;
        //    vm.message = null;
        //    UserService
        //        .updateUser(user._id, user)
        //        .then(
        //            function (response){
        //                UserService.setCurrentUser(response.data);
        //                vm.message = "User updated successfully";
        //                $location.url("/profile");
        //            });
        //}

    }
})();