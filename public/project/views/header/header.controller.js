(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("HeaderController", headerController);
    function headerController($scope, $location, UserService){
        console.log("header controller hey!");
        $scope.$location = $location;
        $scope.logout = logout;
        function logout(){
            console.log("logout fired");
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();