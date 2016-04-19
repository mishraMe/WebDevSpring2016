//userTable.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("UserTableController", userTableController);

    function userTableController(UserService){

        var vm = this;
        //variables :
        vm.error=null;
        vm.message= null;
        vm.selectedUser= null;
        vm.createUser= createUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;

        // functions
        function init() {
            UserService
                .findAllUsers()
                .then(function(resp){
                    vm.userTable = resp.data;
                })
        }
        init();

        function createUser(user){
            UserService
                .createUser(user)
                .then(function(resp){
                    if (user == null) {
                        vm.message = "Please enter a user name";
                        init();
                    } else {
                        init();
                    }
                })
            vm.user = null;
        }

        function deleteUser(user){
            //function is responsible for deleting a user by the index value
            var UsersAfterDeletion=[];
            UserService
                .deleteUserById(user._id)
                .then(function(response){
                    console.log("user deleted sucessfully");
                    init();
                });
        }

        function updateUser(newUser){
            console.log("entered the update user and updated new user is ");
            console.log(newUser);

            //function is responsible for updating selected user to the new user's value
            if(!newUser){
                vm.message = "Please enter updates";
            }
            var renewedUser = {
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                roles: newUser.roles,
                email: newUser.email
            };

            UserService
                .updateUser(vm.user._id, renewedUser)
                .then(
                    function (response){
                        init();
                        vm.user = null;
                    });

        }

        function selectUser($index){

            console.log("hello select user");
            //function is responsible for selecting a user to edit
            vm.user= {
                _id: vm.userTable[$index]._id,
                username: vm.userTable[$index].username,
                password:vm.userTable[$index].password,
                firstName: vm.userTable[$index].firstName,
                lastName: vm.userTable[$index].lastName,
                roles: vm.userTable[$index].roles,
                email: vm.userTable[$index].email
            };

        }
    }
})();
