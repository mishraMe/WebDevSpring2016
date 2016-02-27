(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);


    function registerController($scope, $location, $rootScope, UserService) {
        function register() {
            console.log("register controller register event on click");
            this.$location.path('/profile');
        }
    }
})();