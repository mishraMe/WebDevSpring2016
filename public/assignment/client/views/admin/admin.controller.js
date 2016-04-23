"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($location, UserService)
    {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        //vm.add    = add;
        vm.selectUser = selectUser;

        console.log("entered the admin controller");
        function init() {
            UserService
                .findAllUsers()
                .then(function(response){
                        for(var i in response.data) {
                            response.data[i].roles = response.data[i].roles.toString();
                        }
                        vm.users = response.data;
                });
        }
        init();



        function deleteUser(user) {

            UserService.deleteUser(user._id)
                .then(function (response) {
                        init();
                    }
                );
        }


        function selectUser(user) {
            vm.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            }
        }

        function updateUser(user) {

            UserService.updateUser(user._id, user)
                .then(function (response) {
                        if(response) {
                            init();
                            vm.user = null;
                        }
                    }
                );
        }
    }
})();