(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);
    function headerController($scope, $location, UserService){

        $scope.logout = logout;

        function logout(){
            console.log("logout fired");

            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();