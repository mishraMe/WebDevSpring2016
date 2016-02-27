(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);


    function registerController($scope, $location, $rootScope, UserService) {
        var user = this.user;
        $scope.register = register;

        function register() {
            console.log("register controller register event on click");
            this.$location.path('/profile');
        }
    }
})();