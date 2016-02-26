(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);


    function registerController($scope){
         $scope.register = register;
    }
    function register($location){
        console.log("register controller register event on click");
        this.$location.path('/profile');
    }
})();