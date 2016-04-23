(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController)
    function profileController($location, UserService){
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.update = update;

        function init(){
            UserService
                .getCurrentUser()
                .then(function(resp){
                    vm.currentUser = resp.data;
                    if(!vm.currentUser){
                        $location.url("/home");
                    }
                })
        } init();

        function update(user){
            console.log("update in profile");
            console.log(user);
            vm.error = null;
            vm.message = null;
            var emails = user.emails.toString();
            emails = emails.split(",");
            user.emails=emails;
            UserService
                .updateUser(user._id, user)
                .then(function (response){
                    console.log("response is ");
                    console.log(response);
                    vm.message = "User updated successfully";
                        UserService.setCurrentUser(user);
                        $location.url("/profile");
                    });
        }

    }
})();