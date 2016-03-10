(function(){
    angular
        .module("WritersClubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, BookService) {
        $scope.search = search;
        $scope.title = $routeParams.title;

        if($scope.title) {
            search($scope.title);
        }

        function search(title) {
            $location.url("/search/"+$scope.title);
            console.log(title);
            BookService.findBookByTitle(
                title,
                function(response){
                    console.log(response);
                    $scope.data = response;
                });
        }
    }
})();