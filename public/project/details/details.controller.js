(function(){

    angular
        .module("WritersClubApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $http, $routeParams, MovieService) {
        console.log("passed details controller");
    }

})();