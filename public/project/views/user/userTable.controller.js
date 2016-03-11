//userTable.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("UserTableController", userTableController);

    function userTableController($scope, $http, UserService){

        //variables :
        $scope.error=null;
        $scope.message= null;
        $scope.selectedUser= null;
        $scope.createUser= createUser;
        $scope.deleteUser = deleteUser;
        $scope.updateUser = updateUser;
        $scope.selectUser = selectUser;
        $scope.userTable= UserService.getAllUsers();

        // functions

        function createUser(user){
            function callback (response) {
                if (user === null) {
                    $scope.message = "Please enter a user name";
                } else {
                    $scope.userTable = UserService.getAllUsers();
                }
            }
            UserService.createUserInTable
            (user, callback);
            $scope.user = null;
        }

        function deleteUser($index){
            //function is responsible for deleting a user by the index value
            var UsersAfterDeletion=[];
            var callback=
                function(response){
                    UsersAfterDeletion= response;
                    $scope.userTable = UserService.getAllUsers();
                    $scope.error = null;
                };
            UserService.deleteUserInTable
            ($scope.userTable[$index]._id, callback);
        }

        function updateUser(newUser){

            //function is responsible for updating selected user to the new user's value
            if(!newUser){
                $scope.message = "Please enter updates";
            }
            var renewedUser = {
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                roles: newUser.roles,
                email: newUser.email
            };

            function callback (response){
                console.log(response);
                if($scope.user.username == null){
                    $scope.error = "Username name cannot be empty";
                }else {
                    $scope.userTable= UserService.getAllUsers();
                    $scope.error=null;
                }
            };
            UserService.updateUserInTable($scope.user._id, renewedUser,callback);
            $scope.user=null;
        }

        function selectUser($index){

            console.log("hello select user");
            //function is responsible for selecting a user to edit
            $scope.user= {
                _id: $scope.userTable[$index]._id,
                username: $scope.userTable[$index].username,
                password:$scope.userTable[$index].password,
                firstName: $scope.userTable[$index].firstName,
                lastName: $scope.userTable[$index].lastName,
                roles: $scope.userTable[$index].roles,
                email: $scope.userTable[$index].email
            };

        }
    }
})();
