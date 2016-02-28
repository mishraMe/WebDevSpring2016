(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $location, $rootScope, UserService) {
        var newId=0;
        $scope.register= register;

        function register() {
            newId= parseInt(newId)+1;
            var newUser = {
                _id:       newId,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                username: $scope.username,
                password: $scope.password,


            };
            $rootScope.currentUser = newUser;
            UserService.createUser
            (newUser, function(){
                $location.path('/profile');
            });
        }
    }
})();