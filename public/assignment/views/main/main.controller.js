(function MainController(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);
    function MainController($scope, $location){
        $scope.$location=$location;
    }
}) ();