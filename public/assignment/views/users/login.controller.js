(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);
    function loginController(UserService, $rootScope, $scope, $location){
        $scope.login= login;

        function login(){
            console.log("login event fired!");
            var user = {
                username: $scope.username,
                password: $scope.password
            };
            UserService.findUserByCredentials
            (user.username, user.password,
                function(response){
                $rootScope.currentUser = response;
                $location.url("/profile");
            });
        }
    }
})();