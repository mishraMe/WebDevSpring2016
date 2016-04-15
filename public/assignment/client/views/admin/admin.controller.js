"use strict";

(function()
{
    angular
        .module("PassportApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService)
    {
        var vm = this;
        vm.remove = remove;
        vm.update = update;
        vm.add    = add;
        vm.select = select;

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            UserService
                .deleteUser(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            vm.user = angular.copy(user);
        }

        function handleSuccess(response) {
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }
    }
})();