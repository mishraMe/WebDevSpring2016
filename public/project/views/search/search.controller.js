(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";

    angular
        .module("WritersClubApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, BookService) {
        $scope.search=search;

        function search(title) {
            var bookTitle = title;
            if(bookTitle) {
                fetchBooks(bookTitle);
            }
        }

        function fetchBooks(bookTitle) {
            BookService.findBooksByTitle(bookTitle, renderBooks)
        }

        function renderBooks(response) {
            console.log(response);
            $scope.books = response;
        }
    }
})();