(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";
    var DETAILS_URL = "https://www.googleapis.com/books/v1/volumes?q=ID";
    angular
        .module("WritersClubApp")
        .factory("BookService", bookService);

    function bookService($http) {

        var bookApi = {
            findBooksByTitle: findBooksByTitle,
            findBookByID: findBookByID
        };
        return bookApi;

        function findBooksByTitle(title, callback) {
            var url = SEARCH_URL.replace("TITLE", title);
            $http.get(url)
                .success(callback);
        }

        function findBookByID(ID, callback) {
            var url = DETAILS_URL.replace("ID", ID)
            console.log("entered FindBook in book wc_services");
            $http.get(url).success(callback);
        }


    }
})();