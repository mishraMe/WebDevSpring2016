(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $rootScope, $scope, $location){
        $scope.login= login;

        function login(user){
            console.log("login event fired!");
            var user = UserService.findUserByCredentials
            (user.username, user.password, function(response){
                if(response){
                    console.log(response);
                    $rootScope.currentUser = response;
                    UserService.setCurrentUser(response);
                    $location.url("/profile");
                }
            });
        }
    }
})();