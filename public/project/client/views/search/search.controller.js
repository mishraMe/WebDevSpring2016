(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";

    angular
        .module("WritersClubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, BookService) {

        $scope.search=search;
        $scope.$location = $location;

        function init(){

        }
        init();

        function search(title) {
            console.log("entered search");
            var bookTitle = title;
            if(bookTitle) {
                fetchBooks(bookTitle);
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