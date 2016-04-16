(function(){
    angular
        .module("WritersClubApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, BookService) {


        var id = $routeParams.id;
        console.log(id);

        function init() {
            fetchMovie(id);
        }
        init();

        function fetchMovie(ID) {
            BookService.findBookByID(ID, renderDetails);
        }

        function renderDetails(response) {
            console.log("enter render details");
            $scope.details = response.items[0];
            console.log($scope.details);
        }
    }
})();