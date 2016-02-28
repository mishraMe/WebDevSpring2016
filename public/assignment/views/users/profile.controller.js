(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController)
    function profileController($scope, $location, UserService){
        $scope.currentUser= UserService.getCurrentUser();
        if(!$scope.currentUser){
            $location.url("/home");
        }

        $scope.update = update;
        function update(){
            var user = {

                firstname: $scope.firstname,
                lastname: $scope.lastname,
                username: $scope.username,
                password: $scope.password
            };
            $scope.currentUser = UserService.updateUser
            (user, function(){
                $location.url("/profile");
            });
        }
    }
})();