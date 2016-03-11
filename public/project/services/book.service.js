(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";
    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";

    angular
        .module("WritersClubApp")
        .factory("BookService", bookService);

    function bookService($http) {

        var bookApi = {
            findBooksByTitle: findBooksByTitle,
            findBookByISBN: findBookByISBN
        };
        return bookApi;

        function findBooksByTitle(title, callback) {
            var url = SEARCH_URL.replace("TITLE", title);
            $http.get(url)
                .success(callback);
        }

        function findBookByISBN(ISBN, callback) {
            $http.get("http://www.omdbapi.com/?i="+ISBN)
                .success(callback);
        }

    }
})();