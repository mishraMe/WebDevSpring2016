//account.controller.js

(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("AccountController", accountController)
    function accountController($scope, $location, UserService){
        $scope.error = null;
        $scope.message = null;

        $scope.currentUser= UserService.getCurrentUser();
        if(!$scope.currentUser){
            $location.url("/home");
        }

        $scope.update = update;
        $scope.listFollowers=listFollowers;
        $scope.listFollowing=listFollowing;

        function update(user){
            $scope.error = null;
            $scope.message = null;
            var callback =
                function(response){
                    if(response){
                        $scope.message = "User updated successfully";
                        $scope.currentUser=response;
                        UserService.setCurrentUser($scope.currentUser);
                        $location.url("/account/");
                    }else{
                        $scope.message = "Unable to update User";
                    }
                }
            $scope.currentUser = UserService.updateUser(user._id, user,callback);

        }
        function listFollowers(user){
            console.log("lists those who follow the User");

        }
        function listFollowing(user){
            console.log("lists those whom the User follows");
        }
    }
})();