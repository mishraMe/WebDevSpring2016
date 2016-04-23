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
        //vm.update = update;
        //vm.add    = add;
        //vm.select = select;

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

            UserService.deleteUserById(user._id)

                .then(

                    function (response) {

                        init();
                    }
                );
        }

    }
})();