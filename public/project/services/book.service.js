(function(){
    angular
        .module("WritersClubApp")
        .factory("BookService", bookService);

    function bookService($http) {

        var bookApi = {
            findBookByTitle: findBookByTitle,
            findBookByISBN: findBookByISBN
        };
        return bookApi;

        function findBookByTitle(title, callback) {
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }

        function findBookByISBN(ISBN, callback) {
            $http.get("http://www.omdbapi.com/?i="+ISBN)
                .success(callback);
        }

    }
})();