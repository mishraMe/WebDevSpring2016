//header.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("HeaderController", headerController);
    function headerController($scope, $location, UserService){
        console.log("header controller hey!");
        var vm = this;
        vm.$location = $location;
        $scope.logout = logout;
        function logout(){
            console.log("logout fired");
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();