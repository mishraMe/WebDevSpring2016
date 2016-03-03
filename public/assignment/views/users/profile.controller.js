(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController)
    function profileController($scope, $location, UserService){
        $scope.error = null;
        $scope.message = null;

        $scope.currentUser= UserService.getCurrentUser();
        if(!$scope.currentUser){
            $location.url("/home");
        }

        $scope.update = update;

        function update(user){
            $scope.error = null;
            $scope.message = null;

         $scope.currentUser = UserService.updateUser
         (user._id, user, function(response){
              if(response){
                  $scope.message = "User updated successfully";
                  $scope.currentUser=response;
                  UserService.setCurrentUser($scope.currentUser);
                  $location.url("/profile/");
              }else{
                        $scope.message = "Unable to update user";
                    }
          });
        }
    }
})();