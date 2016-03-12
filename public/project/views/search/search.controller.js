(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";

    angular
        .module("WritersClubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, BookService) {
        $scope.search=search;


        function search(title) {
            console.log("entered search");
            var bookTitle = title;
            if(bookTitle) {
                fetchBooks(bookTitle);
            }
        }

        function fetchBooks(bookTitle) {
            console.log("entered  fetch books");
            BookService.findBooksByTitle(bookTitle, renderBooks)
        }

        function renderBooks(response) {
            console.log(response);
            $scope.books = response.items;
            console.log("books are:");
           console.log($scope.books);
        }
    }
})();