(function MainController(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("MainController", mainController);
    function mainController($scope, $location){

        $scope.$location = $location;
    }
})();