(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $location, UserServices){

        $scope.register = register;

        function register($scope, $location, UserService){
            console.log("register function from register conotroller");
            $scope.register = "../views/users/profile.view.html";
        }

    }

})();