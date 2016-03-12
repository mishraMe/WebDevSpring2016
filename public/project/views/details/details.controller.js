(function(){
    angular
        .module("WritersClubApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, BookService) {
        $scope.id = $routeParams.id

        BookService.findBookByID(
            $scope.id,
            function(response) {
                $scope.book = response;
                console.log($scope.book);
            }
        )
    }
})();