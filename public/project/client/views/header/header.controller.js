//header.controller.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("HeaderController", headerController);
    function headerController($scope,$rootScope, $location, UserService){
        console.log("header controller hey!");

        $scope.$location = $location;
        $scope.logout = logout;
        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();