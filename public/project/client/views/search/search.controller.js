(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";

    angular
        .module("WritersClubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, BookService) {

        $scope.search=search;
        $scope.title= $routeParams.title;
        $scope.$location = $location;

        if($scope.title){
            search($scope.title);
        }
        function init(){

        }
        init();

        function search(title) {
            console.log("entered search");
            var bookTitle = title;
            if(bookTitle) {
                fetchBooks(bookTitle);
                $location.url("/search/"+ $scope.title);
            }
        }

        function fetchBooks(bookTitle) {
            BookService.findBooksByTitle(bookTitle, renderBooks)
        }

        function renderBooks(response) {
            $scope.books = response.items;
        }
    }
})();